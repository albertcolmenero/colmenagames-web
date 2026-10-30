import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BLOG,
  SITE_ORIGIN,
  absoluteHeroUrl,
  formatArticleDate,
  loadArticles,
} from "@/lib/blog.mjs";
import { renderArticleHtml } from "@/lib/blog-render.mjs";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return loadArticles().map((article) => ({ slug: article.slug }));
}

function findArticle(slug: string) {
  return loadArticles().find((article) => article.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};

  const description = article.metaDescription || article.title;
  const url = `${SITE_ORIGIN}/blog/${article.slug}`;
  const hero = absoluteHeroUrl(article.heroImage);

  return {
    title: `${article.title} — ${BLOG.articleBrand}`,
    description,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": `${SITE_ORIGIN}/blog/rss.xml` },
    },
    openGraph: {
      type: "article",
      siteName: BLOG.orgName,
      title: article.title,
      description,
      url,
      publishedTime: article.publishDate,
      ...(hero ? { images: [{ url: hero }] } : {}),
    },
    twitter: {
      card: hero ? "summary_large_image" : "summary",
      title: article.title,
      description,
      ...(hero ? { images: [hero] } : {}),
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const description = article.metaDescription || article.title;
  const url = `${SITE_ORIGIN}/blog/${article.slug}`;
  const hero = absoluteHeroUrl(article.heroImage);
  // First-party body from the authenticated webhook. Rendered as-is.
  const html = renderArticleHtml(article.body, article.title);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description,
    datePublished: article.publishDate,
    ...(hero ? { image: hero } : {}),
    mainEntityOfPage: url,
    author: { "@type": "Organization", "@id": `${SITE_ORIGIN}/#org`, name: BLOG.orgName },
    publisher: { "@type": "Organization", "@id": `${SITE_ORIGIN}/#org`, name: BLOG.orgName },
  };

  return (
    <main className="bg-bone px-5 pb-24 pt-32 sm:px-8">
      <article className="mx-auto w-full max-w-[760px]">
        <a href="/blog" className="text-sm text-ink/55 transition-colors hover:text-ember">
          ← Todos los artículos
        </a>
        <p className="mt-8">
          <time dateTime={article.publishDate} className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite">
            {formatArticleDate(article.publishDate)}
          </time>
        </p>
        <h1 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
          {article.title}
        </h1>
        {article.heroImage ? (
          <figure className="mt-8">
            {/* Remote hero. The build does not download it. src stays the stored value. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              className="w-full rounded-2xl border border-ink/10"
            />
          </figure>
        ) : null}
        <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
        <p className="mt-12 border-t border-ink/10 pt-6">
          <a href="/blog" className="text-sm text-ink/55 transition-colors hover:text-ember">
            ← Todos los artículos
          </a>
        </p>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </article>
    </main>
  );
}
