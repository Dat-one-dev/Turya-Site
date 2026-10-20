import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { DEV_PROFILE_URL, devPosts } from "@/lib/dev-posts";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Turya — Blog",
  description:
    "Notes from the Turya ecosystem — build logs, lessons, and popular writing from Kartik Patel on DEV.",
};

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric", timeZone: "Asia/Kolkata" });
  } catch {
    return iso;
  }
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content">
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
              sharing. Most of it lives on DEV; the posts people come back to most are collected here.
            </p>
          </Reveal>
        </section>

        <section className="partner-details section-panel">
          {posts.length > 0 && (
            <Reveal>
              <p className="eyebrow">From the Turya blog</p>
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
            </Reveal>
          )}

          <Reveal delay={posts.length > 0 ? 0.1 : 0}>
            <p className="eyebrow">Popular on DEV</p>
            <p className="blog-intro">
              Longer write-ups live on DEV. These are the ones people keep coming back to.
            </p>
            <div className="blog-list">
              {devPosts.map((post) => (
                <a
                  key={post.url}
                  href={post.url}
                  className="blog-row"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="blog-row-meta">
                    <span className="blog-row-date">{formatDate(post.date)}</span>
                  </div>
                  <div className="blog-row-main">
                    <h3 className="blog-row-title">{post.title}</h3>
                    <p className="blog-row-excerpt">{post.excerpt}</p>
                  </div>
                  <span className="blog-row-cta">
                    Read on DEV <Arrow />
                  </span>
                </a>
              ))}
            </div>
            <a
              className="text-link blog-all-link"
              href={DEV_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              All posts on DEV <Arrow />
            </a>
          </Reveal>

          <Reveal delay={posts.length > 0 ? 0.2 : 0.1}>
            <div className="partner-contact">
              <p className="eyebrow">Want to write with us?</p>
              <a href="mailto:turya.sunya@gmail.com" className="contact-email">
                turya.sunya@gmail.com <Arrow />
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
