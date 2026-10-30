# Blog content

Articles in this directory are written by the platform via the
`/api/blog-publish` webhook (one commit per publish or update). Each push to
`main` redeploys the site. The Next.js build reads these files into `/blog`
and `/blog/<slug>`, plus `/blog/rss.xml`, `/sitemap.xml`, and `/robots.txt`.

## File format

One article per file, `<slug>.md`. Frontmatter values are JSON-encoded
(quotes and colons in titles round-trip safely):

```markdown
---
title: "How to Choose a GTM Motion for Your B2B SaaS"
slug: "how-to-choose-a-gtm-motion-for-your-b2b-saas"
metaDescription: "A practical framework for picking the right GTM motion."
publishDate: "2026-06-10T09:00:00.000Z"
heroImage: "https://cdn.example.com/hero.png"
heroImageAlt: "Decision framework diagram"
sourceId: "cp_0001"
contentItemId: "ci_0001"
---

## Markdown body starts here
```

The page already renders `title` as the article's only heading. If the body
opens with that same heading (`# …` or `<h1>`), the build omits it.

## Manual operations (all take effect on the next push)

- **Edit an article**: edit the file body or frontmatter, commit, push.
  A platform re-push of the same slug overwrites manual edits.
- **Unpublish**: delete the file, or add `draft: true` to the frontmatter.
  The string `"true"` does not hide the page. The webhook never writes `draft`.
- **Skip a file entirely**: prefix the filename with `_`.

Files named `README.md`, or with a filename that is not kebab-case, are
ignored by the build. The URL is the filename. The `slug` field in the
frontmatter is not read at build time.

There is no draft API and no unpublish API.
