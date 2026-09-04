import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Turya — Blog",
  description: "Notes from the Turya ecosystem — writing on building, learning, and making things together.",
};

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="partner-hero">
          <Reveal>
            <p className="eyebrow">Words & notes</p>
            <h1>
              Notes from
              <br />
              the builders.
            </h1>
            <p className="partner-lede">
              Writing from the studio and the community — build logs, lessons, and small ideas worth
              sharing. New posts appear here as we write them.
            </p>
          </Reveal>
        </section>

        <section className="partner-details section-panel">
          <Reveal>
            <p className="eyebrow">Articles</p>
            {posts.length === 0 ? (
              <div className="empty-state">
                <p className="empty-state-title">No articles yet — writing is in progress.</p>
                <p className="empty-state-copy">
                  We’re not publishing placeholders. When the first post is ready, it will appear here.
                  To add one, drop a Markdown file in <code>content/blog/</code> — see the README in
                  that folder for the simple frontmatter format Kartik can use without touching code.
                </p>
              </div>
            ) : (
              <div className="blog-list">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-row">
                    <div className="blog-row-meta">
                      <span className="blog-row-date">{formatDate(post.date)}</span>
                    </div>
                    <div className="blog-row-main">
                      <h3 className="blog-row-title">{post.title}</h3>
                      <p className="blog-row-excerpt">{post.excerpt}</p>
                    </div>
                    <span className="blog-row-cta">
                      Read <Arrow />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="partner-contact">
              <p className="eyebrow">Want to write with us?</p>
              <a href="mailto:hello@turya.in" className="contact-email">
                hello@turya.in <Arrow />
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer">
        <Link href="/">← Back to Turya</Link>
        <span>© Turya 2026</span>
        <span>Blog</span>
      </footer>
    </div>
  );
}
