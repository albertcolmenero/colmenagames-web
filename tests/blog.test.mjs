// Blog pipeline tests: payload validation, the file round-trip, which files
// become pages, and the webhook contract with GitHub's API mocked out.
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { marked } from "marked";
import {
  loadArticles,
  omitDuplicateTitleHeading,
  parseArticleFile,
  renderRss,
  serializeArticleFile,
  validateArticlePayload,
} from "../src/lib/blog.mjs";
import handler from "../src/lib/blog-publish.mjs";

const ORIGIN = "https://www.colmena-experience.com";

const samplePayload = () => ({
  event: "blog_article.publish",
  test: false,
  allocationId: "alloc_sample_0001",
  projectId: "cmid7ddbm0006nhidyfnec718",
  channel: "blog",
  contentType: "blog_post",
  idempotencyKey: "sample-idempotency-key-0001",
  contentItem: { id: "ci_sample_0001", sourceType: "seo_content_piece_blog", sourceId: "cp_sample_0001" },
  scheduledAt: "2026-06-10T09:00:00.000Z",
  article: {
    title: "How to Choose a GTM Motion for Your B2B SaaS",
    slug: "how-to-choose-a-gtm-motion-for-your-b2b-saas",
    bodyHtml: "<h2>Pick the motion that fits your buyer</h2>",
    bodyMarkdown: "## Pick the motion that fits your buyer\n\nBody text.\n",
    metaDescription: "A practical framework for picking the right go-to-market motion.",
    publishDate: "2026-06-10T09:00:00.000Z",
    heroImage: { url: "https://cdn.playgtm.example/articles/gtm-motion/hero.png", alt: "Decision framework" },
  },
});

describe("validateArticlePayload", () => {
  it("accepts the documented sample payload", () => {
    const { errors, data } = validateArticlePayload(samplePayload());
    assert.deepEqual(errors, []);
    assert.equal(data.slug, "how-to-choose-a-gtm-motion-for-your-b2b-saas");
    assert.equal(data.publishDate, "2026-06-10T09:00:00.000Z");
    assert.match(data.heroImage.url, /^https:\/\//);
    assert.equal(data.sourceId, "cp_sample_0001");
  });

  it("rejects slugs that could escape the content directory", () => {
    for (const slug of ["../evil", "a/b", "UPPER", "trailing-", "dot.md", ""]) {
      const p = samplePayload();
      p.article.slug = slug;
      assert.ok(validateArticlePayload(p).errors.length > 0, `slug "${slug}"`);
    }
  });

  it("requires a body and a parseable date, falling back to scheduledAt", () => {
    const noBody = samplePayload();
    noBody.article.bodyMarkdown = "";
    noBody.article.bodyHtml = "";
    assert.ok(validateArticlePayload(noBody).errors.length > 0);

    const noDate = samplePayload();
    delete noDate.article.publishDate;
    assert.deepEqual(validateArticlePayload(noDate).errors, []);
    assert.equal(validateArticlePayload(noDate).data.publishDate, "2026-06-10T09:00:00.000Z");

    const badDate = samplePayload();
    badDate.article.publishDate = "not-a-date";
    assert.ok(validateArticlePayload(badDate).errors.length > 0);
  });

  it("enforces size caps", () => {
    const p = samplePayload();
    p.article.bodyMarkdown = "x".repeat(200_001);
    assert.ok(validateArticlePayload(p).errors.length > 0);
  });
});

describe("article file format", () => {
  it("round-trips titles with quotes, colons, and unicode", () => {
    const { data } = validateArticlePayload(samplePayload());
    data.title = 'GTM: the "5x" playbook — für alle';
    data.metaDescription = 'Line one: with a colon and "quotes".';
    const file = serializeArticleFile(data);
    const { meta, body } = parseArticleFile(file);
    assert.equal(meta.title, data.title);
    assert.equal(meta.metaDescription, data.metaDescription);
    assert.equal(meta.publishDate, data.publishDate);
    assert.equal(meta.heroImage, data.heroImage.url);
    assert.equal(body, data.bodyMarkdown.trim());
  });

  it("stores bodyHtml as the body when no markdown is sent", () => {
    const p = samplePayload();
    p.article.bodyMarkdown = "";
    const { data } = validateArticlePayload(p);
    const { body } = parseArticleFile(serializeArticleFile(data));
    assert.equal(body, "<h2>Pick the motion that fits your buyer</h2>");
  });

  it("omits empty optional fields", () => {
    const p = samplePayload();
    p.article.metaDescription = "";
    p.article.heroImage = { url: "", alt: "unused" };
    p.contentItem = {};
    const { data } = validateArticlePayload(p);
    const file = serializeArticleFile(data);
    assert.equal(file.includes("metaDescription"), false);
    assert.equal(file.includes("heroImage"), false);
    assert.equal(file.includes("sourceId"), false);
    assert.equal(file.endsWith("\n"), true);
  });
});

describe("omitDuplicateTitleHeading", () => {
  const title = "Founder-Led Sales: When It Works and When to Stop";

  it("drops a leading markdown h1 that repeats the page title", () => {
    const md = `# ${title}\n\nFounder-led sales is the stage-specific motion.\n\n## What exactly is founder-led sales?\n`;
    const html = omitDuplicateTitleHeading(marked.parse(md, { async: false }), title);
    assert.equal(/<h1/i.test(html), false);
    assert.match(html, /Founder-led sales is the stage-specific motion/);
    assert.match(html, /<h2>What exactly is founder-led sales\?<\/h2>/);
  });

  it("drops a leading HTML h1, including a second copy and encoded text", () => {
    const html = omitDuplicateTitleHeading("<h1>A &amp; B</h1>\n<h1>A &amp; B</h1>\n<p>Body.</p>", "A & B");
    assert.equal(html, "<p>Body.</p>");
  });

  it("keeps a leading heading that is not the page title", () => {
    const html = "<h1>A different heading</h1>\n<p>Body.</p>";
    assert.equal(omitDuplicateTitleHeading(html, title), html);
  });

  it("keeps the same words when they are not the leading h1", () => {
    const html = `<p>Intro.</p>\n<h1>${title}</h1>\n<p>Body.</p>`;
    assert.equal(omitDuplicateTitleHeading(html, title), html);
    const h2 = `<h2>${title}</h2>\n<p>Body.</p>`;
    assert.equal(omitDuplicateTitleHeading(h2, title), h2);
  });

  it("is a no-op when run again", () => {
    const once = omitDuplicateTitleHeading(`<h1>${title}</h1>\n<p>Body.</p>`, title);
    assert.equal(omitDuplicateTitleHeading(once, title), once);
  });
});

describe("loadArticles", () => {
  let dir;
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "colmena-blog-"));
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  const write = (name, body) => writeFileSync(join(dir, name), body);

  it("skips README, drafts, underscore files, and bad names, and sorts newest first", () => {
    write(
      "older.md",
      '---\ntitle: "Older"\npublishDate: "2026-01-01T00:00:00.000Z"\n---\n\nOlder body\n',
    );
    write(
      "newer.md",
      '---\ntitle: "Newer"\npublishDate: "2026-06-01T00:00:00.000Z"\nmetaDescription: "A note"\n---\n\nNewer body\n',
    );
    write(
      "hidden.md",
      '---\ntitle: "Hidden"\npublishDate: "2026-07-01T00:00:00.000Z"\ndraft: true\n---\n\nHidden\n',
    );
    write(
      "string-draft.md",
      '---\ntitle: "String draft"\npublishDate: "2026-05-01T00:00:00.000Z"\ndraft: "true"\n---\n\nStill visible\n',
    );
    write("README.md", '---\ntitle: "Readme"\npublishDate: "2026-08-01T00:00:00.000Z"\n---\n\nNo\n');
    write("_scratch.md", '---\ntitle: "Scratch"\npublishDate: "2026-08-01T00:00:00.000Z"\n---\n\nNo\n');
    write("Not A Slug.md", '---\ntitle: "Bad"\npublishDate: "2026-08-01T00:00:00.000Z"\n---\n\nNo\n');
    write("broken.md", "---\ntitle: \"No date\"\n---\n\nNo\n");

    const articles = loadArticles(dir);
    assert.deepEqual(
      articles.map((a) => a.slug),
      ["newer", "string-draft", "older"],
    );
    assert.equal(articles[0].metaDescription, "A note");
  });
});

describe("renderRss", () => {
  it("keeps the newest 50 items and escapes the title", () => {
    const articles = Array.from({ length: 51 }, (_, i) => ({
      slug: `post-${String(i).padStart(2, "0")}`,
      title: i === 50 ? "A & B" : `Post ${i}`,
      metaDescription: "",
      publishDate: new Date(Date.UTC(2026, 0, i + 1)).toISOString(),
      heroImage: "",
      heroImageAlt: "",
      body: "",
    })).reverse();
    const xml = renderRss(articles);
    assert.equal(xml.includes("post-00"), false);
    assert.equal(xml.includes("post-50"), true);
    assert.equal(xml.includes("A &amp; B"), true);
    assert.match(xml, /<language>es<\/language>/);
    assert.match(xml, new RegExp(`<link>${ORIGIN}/blog</link>`));
  });
});

describe("api/blog-publish handler", () => {
  const ENV_KEYS = ["BLOG_WEBHOOK_TOKEN", "BLOG_GITHUB_TOKEN", "BLOG_GITHUB_REPO", "BLOG_GITHUB_BRANCH"];
  let saved;
  const originalFetch = globalThis.fetch;
  const originalLog = console.log;
  const originalError = console.error;

  const mockRes = () => ({
    statusCode: 0,
    headers: {},
    body: null,
    status(c) {
      this.statusCode = c;
      return this;
    },
    setHeader(k, v) {
      this.headers[k] = v;
    },
    json(o) {
      this.body = o;
      return this;
    },
  });
  const req = (body, headers = {}) => ({
    method: "POST",
    body,
    headers: { authorization: "Bearer test-secret", ...headers },
  });

  beforeEach(() => {
    saved = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
    process.env.BLOG_WEBHOOK_TOKEN = "test-secret";
    process.env.BLOG_GITHUB_TOKEN = "gh-token";
    process.env.BLOG_GITHUB_REPO = "albertcolmenero/colmenagames-web";
    process.env.BLOG_GITHUB_BRANCH = "main";
    console.log = () => {};
    console.error = () => {};
  });
  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
    globalThis.fetch = originalFetch;
    console.log = originalLog;
    console.error = originalError;
  });

  it("rejects non-POST and bad tokens per the contract", async () => {
    let res = mockRes();
    await handler({ method: "GET", headers: {} }, res);
    assert.equal(res.statusCode, 405);
    assert.equal(res.headers.Allow, "POST");
    assert.deepEqual(res.body, { ok: false, error: "Method not allowed" });

    res = mockRes();
    await handler(req(samplePayload(), { authorization: "Bearer wrong" }), res);
    assert.equal(res.statusCode, 401);

    res = mockRes();
    await handler({ method: "POST", headers: {}, body: samplePayload() }, res);
    assert.equal(res.statusCode, 401);
    assert.deepEqual(res.body, { ok: false, error: "Invalid token" });
  });

  it("returns 500 before auth when the server is not configured, and 405 still wins", async () => {
    delete process.env.BLOG_WEBHOOK_TOKEN;
    delete process.env.BLOG_GITHUB_TOKEN;
    let res = mockRes();
    await handler({ method: "GET", headers: {} }, res);
    assert.equal(res.statusCode, 405);

    res = mockRes();
    await handler(req(samplePayload()), res);
    assert.equal(res.statusCode, 500);
    assert.deepEqual(res.body, { ok: false, error: "Server not configured." });
  });

  it("acknowledges test sends without touching GitHub, even with a bad slug", async () => {
    const calls = [];
    globalThis.fetch = async (...args) => {
      calls.push(args);
      throw new Error("GitHub should not be called");
    };
    const p = samplePayload();
    p.test = true;
    p.article.slug = "../evil";
    const res = mockRes();
    await handler(req(p), res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.skipped, true);
    assert.equal(calls.length, 0);

    const res2 = mockRes();
    await handler(req(samplePayload(), { "x-idempotency-key": "test-abc" }), res2);
    assert.equal(res2.body.skipped, true);
    assert.equal(calls.length, 0);
  });

  it("ignores an unhandled event", async () => {
    const calls = [];
    globalThis.fetch = async () => {
      calls.push(1);
      throw new Error("no");
    };
    const res = mockRes();
    await handler(req({ event: "blog_article.delete" }), res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.ignored, true);
    assert.match(res.body.reason, /blog_article.delete/);
    assert.equal(calls.length, 0);
  });

  it("accepts a JSON string body the same way the Next route sends it", async () => {
    const calls = [];
    globalThis.fetch = async (url, init) => {
      calls.push({ url, init });
      if (calls.length === 1) return { status: 404, ok: false };
      return { status: 201, ok: true, text: async () => "" };
    };
    const res = mockRes();
    await handler(req(JSON.stringify(samplePayload())), res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.action, "created");
  });

  it("creates the file on first publish (GET 404 → PUT without sha)", async () => {
    const calls = [];
    globalThis.fetch = async (url, init) => {
      calls.push({ url, init });
      if (calls.length === 1) return { status: 404, ok: false };
      return { status: 201, ok: true, text: async () => "" };
    };

    const res = mockRes();
    await handler(req(samplePayload()), res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.action, "created");
    assert.equal(res.body.url, `${ORIGIN}/blog/how-to-choose-a-gtm-motion-for-your-b2b-saas`);

    const putCall = calls[1];
    assert.match(putCall.url, /\/contents\/content\/blog\/how-to-choose-a-gtm-motion-for-your-b2b-saas\.md$/);
    const putBody = JSON.parse(putCall.init.body);
    assert.equal(putBody.branch, "main");
    assert.equal(putBody.sha, undefined);
    assert.match(putBody.message, /^blog: publish "/);
    const committed = Buffer.from(putBody.content, "base64").toString("utf8");
    assert.match(committed, /title: "How to Choose a GTM Motion for Your B2B SaaS"/);
    assert.equal(putCall.init.headers["User-Agent"], "colmenagames-web-blog-publish");
  });

  it("is idempotent: identical re-push (retry) commits nothing", async () => {
    const { data } = validateArticlePayload(samplePayload());
    const existing = Buffer.from(serializeArticleFile(data), "utf8").toString("base64");
    let calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      return { status: 200, ok: true, json: async () => ({ sha: "abc123", content: existing }) };
    };

    const res = mockRes();
    await handler(req(samplePayload()), res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.action, "unchanged");
    assert.equal(calls, 1);
  });

  it("updates with the existing sha when content changed", async () => {
    const calls = [];
    globalThis.fetch = async (url, init) => {
      calls.push({ url, init });
      if (calls.length === 1) {
        return {
          status: 200,
          ok: true,
          json: async () => ({ sha: "abc123", content: Buffer.from("old", "utf8").toString("base64") }),
        };
      }
      return { status: 200, ok: true, text: async () => "" };
    };

    const res = mockRes();
    await handler(req(samplePayload()), res);
    assert.equal(res.body.action, "updated");
    assert.equal(JSON.parse(calls[1].init.body).sha, "abc123");
    assert.match(JSON.parse(calls[1].init.body).message, /^blog: update "/);
  });

  it("treats a 409 race that landed the same bytes as unchanged", async () => {
    const { data } = validateArticlePayload(samplePayload());
    const fileText = serializeArticleFile(data);
    const calls = [];
    globalThis.fetch = async (url, init) => {
      calls.push({ url, init });
      if (calls.length === 1) {
        return {
          status: 200,
          ok: true,
          json: async () => ({ sha: "oldsha", content: Buffer.from("old", "utf8").toString("base64") }),
        };
      }
      if (calls.length === 2) return { status: 409, ok: false, text: async () => "conflict" };
      return {
        status: 200,
        ok: true,
        json: async () => ({ sha: "newsha", content: Buffer.from(fileText, "utf8").toString("base64") }),
      };
    };

    const res = mockRes();
    await handler(req(samplePayload()), res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.action, "unchanged");
    assert.equal(calls.length, 3);
  });

  it("returns 400 on invalid payloads and 502 on GitHub failures (retryable)", async () => {
    const bad = samplePayload();
    bad.article.slug = "../evil";
    let res = mockRes();
    await handler(req(bad), res);
    assert.equal(res.statusCode, 400);

    globalThis.fetch = async () => {
      throw new Error("boom");
    };
    res = mockRes();
    await handler(req(samplePayload()), res);
    assert.equal(res.statusCode, 502);
    assert.deepEqual(res.body, { ok: false, error: "Failed to persist article." });
  });
});
