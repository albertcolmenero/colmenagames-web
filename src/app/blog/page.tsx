import type { Metadata } from "next";
import { Eyebrow } from "@/components/primitives";
import { BLOG, SITE_ORIGIN, formatArticleDate, loadArticles } from "@/lib/blog.mjs";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: BLOG.indexTitle,
  description: BLOG.description,
  alternates: {
    canonical: `${SITE_ORIGIN}/blog`,
    types: { "application/rss+xml": `${SITE_ORIGIN}/blog/rss.xml` },
  },
  openGraph: {
    type: "website",
    siteName: BLOG.orgName,
    title: BLOG.indexTitle,
    description: BLOG.description,
    url: `${SITE_ORIGIN}/blog`,
  },
  twitter: { card: "summary" },
};

export default function BlogIndexPage() {
  const articles = loadArticles();

  return (
    <main className="bg-bone px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto w-full max-w-[760px]">
        <Eyebrow>Blog</Eyebrow>
        <h1 className="mt-4 font-display text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
          {BLOG.heading}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">{BLOG.description}</p>

        {articles.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-ink/15 px-6 py-8 text-sm leading-relaxed text-ink/60">
            Los primeros artículos están en camino. Suscríbete al{" "}
            <a href="/blog/rss.xml" className="text-ember underline underline-offset-4">
              feed RSS
            </a>{" "}
            para leerlos en cuanto se publiquen.
          </p>
        ) : (
          <ul className="mt-12 flex flex-col gap-4">
            {articles.map((article) => (
              <li key={article.slug}>
                <a
                  href={`/blog/${article.slug}`}
                  className="block rounded-2xl border border-ink/10 bg-white px-6 py-6 transition-colors hover:border-ember"
                >
                  <time dateTime={article.publishDate} className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite">
                    {formatArticleDate(article.publishDate)}
                  </time>
                  <h2 className="mt-2 font-display text-2xl font-black leading-snug tracking-tight text-ink">
                    {article.title}
                  </h2>
                  {article.metaDescription ? (
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{article.metaDescription}</p>
                  ) : null}
                  <span className="mt-4 inline-block text-sm font-semibold text-ember">Leer artículo →</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
