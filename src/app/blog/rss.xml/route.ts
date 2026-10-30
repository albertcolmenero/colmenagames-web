import { loadArticles, renderRss } from "@/lib/blog.mjs";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderRss(loadArticles()), {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
