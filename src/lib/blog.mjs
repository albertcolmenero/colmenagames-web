import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Shared blog rules. The webhook (src/lib/blog-publish.mjs) and the Next.js
// pages both import this file, so the on-disk format and the page list cannot
// drift apart.
//
// content/blog/*.md is the content store. Git is the database. There is no CMS.

export const CONTENT_DIR = "content/blog";
export const SITE_ORIGIN = "https://www.colmena-experience.com";

export const BLOG = {
  indexTitle: "Blog — Colmena Experience",
  description:
    "Ideas sobre equipos, dinámicas y experiencias de team building, del equipo de Colmena Experience.",
  heading: "Equipos, en la práctica",
  rssTitle: "Blog de Colmena Experience",
  language: "es",
  orgName: "Colmena Experience",
  articleBrand: "Blog de Colmena Experience",
};

// Real pages on this site. The blog build is the only sitemap writer.
export const SITEMAP_PATHS = ["/", "/ca", "/en", "/blog"];

export const LIMITS = {
  title: 300,
  slug: 120,
  metaDescription: 1000,
  bodyMarkdown: 200_000,
  bodyHtml: 400_000,
  imageUrl: 2000,
  imageAlt: 500,
};

// slug becomes a filename and a URL segment — strict kebab-case only, so path
// traversal ("../", "%2e") is structurally impossible.
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isStr(v) {
  return typeof v === "string";
}

// Validates a `blog_article.publish` webhook body and returns the normalized
// article data we persist, or a list of human-readable errors.
export function validateArticlePayload(body) {
  const errors = [];
  const article = body && typeof body.article === "object" && body.article !== null ? body.article : null;
  if (!article) return { errors: ['missing "article" object'] };

  const title = isStr(article.title) ? article.title.trim() : "";
  if (!title) errors.push("article.title is required");
  else if (title.length > LIMITS.title) errors.push(`article.title exceeds ${LIMITS.title} chars`);

  const slug = isStr(article.slug) ? article.slug.trim() : "";
  if (!slug) errors.push("article.slug is required");
  else if (slug.length > LIMITS.slug) errors.push(`article.slug exceeds ${LIMITS.slug} chars`);
  else if (!SLUG_RE.test(slug)) errors.push("article.slug must be kebab-case ([a-z0-9-])");

  const bodyMarkdown = isStr(article.bodyMarkdown) ? article.bodyMarkdown.trim() : "";
  const bodyHtml = isStr(article.bodyHtml) ? article.bodyHtml.trim() : "";
  if (!bodyMarkdown && !bodyHtml) errors.push("article.bodyMarkdown or article.bodyHtml is required");
  if (bodyMarkdown.length > LIMITS.bodyMarkdown) errors.push(`article.bodyMarkdown exceeds ${LIMITS.bodyMarkdown} chars`);
  if (bodyHtml.length > LIMITS.bodyHtml) errors.push(`article.bodyHtml exceeds ${LIMITS.bodyHtml} chars`);

  const metaDescription = isStr(article.metaDescription) ? article.metaDescription.trim() : "";
  if (metaDescription.length > LIMITS.metaDescription) errors.push(`article.metaDescription exceeds ${LIMITS.metaDescription} chars`);

  const rawDate = article.publishDate || body.scheduledAt;
  const parsedDate = rawDate ? new Date(rawDate) : null;
  if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
    errors.push("article.publishDate (or scheduledAt) must be a valid date");
  }

  let heroImage = null;
  if (article.heroImage && typeof article.heroImage === "object") {
    const url = isStr(article.heroImage.url) ? article.heroImage.url.trim() : "";
    const alt = isStr(article.heroImage.alt) ? article.heroImage.alt.trim() : "";
    if (url) {
      if (!/^https:\/\//.test(url)) errors.push("article.heroImage.url must be https://");
      else if (url.length > LIMITS.imageUrl) errors.push(`article.heroImage.url exceeds ${LIMITS.imageUrl} chars`);
      else heroImage = { url, alt: alt.slice(0, LIMITS.imageAlt) };
    }
  }

  if (errors.length) return { errors };

  const contentItem = body.contentItem && typeof body.contentItem === "object" ? body.contentItem : {};
  return {
    errors: [],
    data: {
      title,
      slug,
      metaDescription,
      publishDate: parsedDate.toISOString(),
      heroImage,
      bodyMarkdown,
      bodyHtml,
      sourceId: isStr(contentItem.sourceId) ? contentItem.sourceId : "",
      contentItemId: isStr(contentItem.id) ? contentItem.id : "",
    },
  };
}

// On-disk format: frontmatter with JSON-encoded values (round-trip safe for
// titles containing quotes/colons), then the markdown body. When the platform
// sends only bodyHtml, the raw HTML is stored as the body — marked passes
// block-level HTML through untouched at render time.
export function serializeArticleFile(data) {
  const fm = [];
  const put = (key, value) => {
    if (value !== "" && value != null) fm.push(`${key}: ${JSON.stringify(value)}`);
  };
  put("title", data.title);
  put("slug", data.slug);
  put("metaDescription", data.metaDescription);
  put("publishDate", data.publishDate);
  if (data.heroImage) {
    put("heroImage", data.heroImage.url);
    put("heroImageAlt", data.heroImage.alt);
  }
  put("sourceId", data.sourceId);
  put("contentItemId", data.contentItemId);
  const body = (data.bodyMarkdown || data.bodyHtml || "").trim();
  return `---\n${fm.join("\n")}\n---\n\n${body}\n`;
}

// Parses an article file back into { meta, body }. Values are JSON.parse'd
// when possible and kept as raw strings otherwise (tolerates hand edits).
export function parseArticleFile(text) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!m) return { meta: {}, body: text.trim() };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx < 1) continue;
    const key = line.slice(0, idx).trim();
    const raw = line.slice(idx + 1).trim();
    try {
      meta[key] = JSON.parse(raw);
    } catch {
      meta[key] = raw;
    }
  }
  return { meta, body: text.slice(m[0].length).trim() };
}

export function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Visible text of a heading, so a rendered <h1> can be compared to the
// frontmatter title (entities decoded, tags removed, whitespace collapsed).
function headingText(s) {
  const decoded = String(s)
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (full, n) => {
      const cp = Number(n);
      return cp > 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : full;
    })
    .replace(/&#x([0-9a-f]+);/gi, (full, n) => {
      const cp = parseInt(n, 16);
      return cp > 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : full;
    })
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&");
  return decoded.replace(/\s+/g, " ").trim();
}

// The article page already prints `title` as its only <h1>. Platform markdown
// often repeats that title as the body's first heading. Drop those leading
// copies from rendered HTML. The stored file is left alone, so a webhook
// retry still sees identical content and skips the commit.
export function omitDuplicateTitleHeading(html, title) {
  let src = String(html ?? "");
  const expected = headingText(title);
  if (!expected) return src;
  const leadingH1 = /^[ \t\r\n]*<h1\b[^>]*>([\s\S]*?)<\/h1>[ \t\r\n]*/i;
  for (let i = 0; i < 3; i++) {
    const m = leadingH1.exec(src);
    if (!m || headingText(m[1]) !== expected) break;
    src = src.slice(m[0].length);
  }
  return src;
}

export function formatArticleDate(iso) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

// Absolute URL for crawlers. The <img src> keeps the stored value.
export function absoluteHeroUrl(heroImage) {
  if (!heroImage) return "";
  if (/^https?:\/\//.test(heroImage)) return heroImage;
  return SITE_ORIGIN + heroImage;
}

// Which files become pages. The URL slug is the filename. The frontmatter
// slug is not read here. Newest publishDate first. Equal dates keep directory
// order (sort is stable).
export function loadArticles(contentDir = join(process.cwd(), CONTENT_DIR)) {
  const articles = [];
  if (!existsSync(contentDir)) return articles;
  for (const file of readdirSync(contentDir)) {
    if (!file.endsWith(".md") || file === "README.md" || file.startsWith("_")) continue;
    const slug = file.slice(0, -3);
    if (!SLUG_RE.test(slug)) {
      console.warn(`blog: skipping "${file}" (filename is not a valid slug)`);
      continue;
    }
    const { meta, body } = parseArticleFile(readFileSync(join(contentDir, file), "utf8"));
    if (meta.draft === true) continue;
    if (!meta.title || !meta.publishDate || Number.isNaN(Date.parse(meta.publishDate))) {
      console.warn(`blog: skipping "${file}" (missing title or valid publishDate)`);
      continue;
    }
    articles.push({
      slug,
      title: meta.title,
      metaDescription: meta.metaDescription || "",
      publishDate: String(meta.publishDate),
      heroImage: meta.heroImage || "",
      heroImageAlt: meta.heroImageAlt || "",
      body,
    });
  }
  articles.sort((a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate));
  return articles;
}

export function renderRss(articles) {
  const items = articles.slice(0, 50).map((a) => `  <item>
    <title>${escapeHtml(a.title)}</title>
    <link>${SITE_ORIGIN}/blog/${a.slug}</link>
    <guid isPermaLink="true">${SITE_ORIGIN}/blog/${a.slug}</guid>
    <pubDate>${new Date(a.publishDate).toUTCString()}</pubDate>
    <description>${escapeHtml(a.metaDescription || a.title)}</description>
  </item>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeHtml(BLOG.rssTitle)}</title>
  <link>${SITE_ORIGIN}/blog</link>
  <description>${escapeHtml(BLOG.description)}</description>
  <language>${BLOG.language}</language>
  <atom:link href="${SITE_ORIGIN}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>
`;
}
