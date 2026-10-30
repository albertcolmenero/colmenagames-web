interface BlogArticle {
  slug: string;
  title: string;
  metaDescription: string;
  publishDate: string;
  heroImage: string;
  heroImageAlt: string;
  body: string;
}

declare module "@/lib/blog.mjs" {
  export const CONTENT_DIR: string;
  export const SITE_ORIGIN: string;
  export const SITEMAP_PATHS: string[];
  export const BLOG: {
    indexTitle: string;
    description: string;
    heading: string;
    rssTitle: string;
    language: string;
    orgName: string;
    articleBrand: string;
  };
  export function loadArticles(contentDir?: string): BlogArticle[];
  export function formatArticleDate(iso: string): string;
  export function absoluteHeroUrl(heroImage: string): string;
  export function renderRss(articles: BlogArticle[]): string;
  export function escapeHtml(s: string): string;
}

declare module "@/lib/blog-render.mjs" {
  export function renderArticleHtml(body: string, title: string): string;
}

declare module "@/lib/blog-publish.mjs" {
  type NodeRes = {
    status(code: number): NodeRes;
    setHeader(key: string, value: string): void;
    json(payload: unknown): NodeRes;
  };
  export default function handler(
    req: { method?: string; headers?: Record<string, string | undefined>; body?: unknown },
    res: NodeRes,
  ): Promise<NodeRes | undefined>;
}
