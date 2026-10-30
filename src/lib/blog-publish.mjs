// Webhook: PlayGTM-style platform → content/blog/<slug>.md on GitHub.
// The push to main triggers the normal Vercel build. This route does not call
// Vercel. Publish latency is one commit plus one deploy.
//
// Idempotency: the write is content-addressed. The existing file is fetched
// first and the commit is skipped when the serialized bytes match. A retry of
// the same article is a no-op. A changed article updates the file. The
// idempotency key is logged and not stored.
//
// The response waits for the GitHub write. The platform uses that body:
// 400 and 401 are terminal, 502 asks for a retry, 200 with created / updated /
// unchanged / ignored / skipped is terminal. Do not answer 200 before the write.
//
// Env (Vercel project settings; see .env.example):
//   BLOG_WEBHOOK_TOKEN  shared secret the platform sends as Authorization: Bearer
//   BLOG_GITHUB_TOKEN   fine-grained PAT, Contents read/write on THIS repo only,
//                       created by the GitHub account connected to Vercel so the
//                       commit triggers a production deploy
//   BLOG_GITHUB_REPO    owner/name (default albertcolmenero/colmenagames-web)
//   BLOG_GITHUB_BRANCH  default main

import { createHash } from "node:crypto";
import { validateArticlePayload, serializeArticleFile, CONTENT_DIR, SITE_ORIGIN } from "./blog.mjs";

const GH_API = "https://api.github.com";

function tokenMatches(header, expected) {
  if (typeof header !== "string" || !header.startsWith("Bearer ")) return false;
  const presented = header.slice("Bearer ".length).trim();
  // trim the env var too: pasting a secret into the Vercel dashboard often adds a
  // trailing newline, which would silently break an otherwise-correct match
  const a = createHash("sha256").update(presented).digest();
  const b = createHash("sha256").update(String(expected).trim()).digest();
  return a.equals(b);
}

function ghHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "colmenagames-web-blog-publish",
  };
}

async function getExistingFile(repo, branch, path, token) {
  const r = await fetch(`${GH_API}/repos/${repo}/contents/${path}?ref=${branch}`, { headers: ghHeaders(token) });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`GitHub GET ${path} → ${r.status}`);
  const json = await r.json();
  return { sha: json.sha, text: Buffer.from(json.content || "", "base64").toString("utf8") };
}

async function putFile(repo, branch, path, token, { text, sha, message }) {
  const r = await fetch(`${GH_API}/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { ...ghHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      branch,
      content: Buffer.from(text, "utf8").toString("base64"),
      ...(sha ? { sha } : {}),
    }),
  });
  return r;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const webhookToken = process.env.BLOG_WEBHOOK_TOKEN;
  // trim: a trailing newline pasted into the dashboard would make GitHub reject the
  // token (or throw on an invalid header value), surfacing as a generic 502
  const ghToken = (process.env.BLOG_GITHUB_TOKEN || "").trim();
  const repo = process.env.BLOG_GITHUB_REPO || "albertcolmenero/colmenagames-web";
  const branch = process.env.BLOG_GITHUB_BRANCH || "main";
  if (!webhookToken || !ghToken) {
    console.error("blog-publish: BLOG_WEBHOOK_TOKEN / BLOG_GITHUB_TOKEN not set");
    return res.status(500).json({ ok: false, error: "Server not configured." });
  }

  // fail closed: a missing or wrong token is a 401 per the platform contract
  if (!tokenMatches(req.headers && req.headers.authorization, webhookToken)) {
    return res.status(401).json({ ok: false, error: "Invalid token" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  const idempotencyKey = (req.headers && req.headers["x-idempotency-key"]) || body.idempotencyKey || "";
  const log = (status, extra) =>
    console.log(
      JSON.stringify({
        evt: "blog-publish",
        status,
        idempotencyKey,
        event: body.event,
        slug: body.article && body.article.slug,
        contentItemId: body.contentItem && body.contentItem.id,
        mdLen: body.article && body.article.bodyMarkdown ? body.article.bodyMarkdown.length : 0,
        ...extra,
      }),
    );

  // test sends: acknowledge so the platform's "Send test payload" succeeds,
  // but never commit test content. This runs before validation.
  if (body.test === true || String(idempotencyKey).startsWith("test-")) {
    log("test-skipped");
    return res.status(200).json({ ok: true, test: true, skipped: true });
  }

  if (body.event !== "blog_article.publish") {
    log("ignored-event");
    return res.status(200).json({ ok: true, ignored: true, reason: `unhandled event "${body.event}"` });
  }

  const { errors, data } = validateArticlePayload(body);
  if (errors.length) {
    log("invalid", { errors });
    return res.status(400).json({ ok: false, errors });
  }

  const path = `${CONTENT_DIR}/${data.slug}.md`;
  const fileText = serializeArticleFile(data);

  try {
    const existing = await getExistingFile(repo, branch, path, ghToken);

    if (existing && existing.text === fileText) {
      log("duplicate");
      return res.status(200).json({ ok: true, action: "unchanged", url: `${SITE_ORIGIN}/blog/${data.slug}` });
    }

    const action = existing ? "updated" : "created";
    const message = `blog: ${existing ? "update" : "publish"} "${data.title}" (${data.slug})`;
    let r = await putFile(repo, branch, path, ghToken, { text: fileText, sha: existing && existing.sha, message });

    // sha race (concurrent write landed between our GET and PUT) → refetch once
    if (r.status === 409 || r.status === 422) {
      const fresh = await getExistingFile(repo, branch, path, ghToken);
      if (fresh && fresh.text === fileText) {
        log("duplicate", { raced: true });
        return res.status(200).json({ ok: true, action: "unchanged", url: `${SITE_ORIGIN}/blog/${data.slug}` });
      }
      r = await putFile(repo, branch, path, ghToken, { text: fileText, sha: fresh && fresh.sha, message });
    }

    if (!r.ok) throw new Error(`GitHub PUT ${path} → ${r.status}: ${(await r.text()).slice(0, 300)}`);

    log("processed", { action });
    return res.status(200).json({ ok: true, action, path, url: `${SITE_ORIGIN}/blog/${data.slug}` });
  } catch (e) {
    console.error("blog-publish delivery failed:", e && e.message);
    log("error", { error: e && e.message });
    // non-2xx → the platform retries with exponential backoff
    return res.status(502).json({ ok: false, error: "Failed to persist article." });
  }
}
