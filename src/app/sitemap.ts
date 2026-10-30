import type { MetadataRoute } from "next";
import { SITE_ORIGIN, SITEMAP_PATHS, loadArticles } from "@/lib/blog.mjs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = loadArticles();
  return [
    ...SITEMAP_PATHS.map((path) => ({
      url: `${SITE_ORIGIN}${path === "/" ? "/" : path}`,
    })),
    ...articles.map((article) => ({
      url: `${SITE_ORIGIN}/blog/${article.slug}`,
      lastModified: article.publishDate.slice(0, 10),
    })),
  ];
}
