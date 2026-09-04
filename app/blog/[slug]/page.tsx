import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { getPostBySlug, getPosts } from "@/lib/posts";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Turya — Blog" };
  return {
    title: `${post.title} — Turya Blog`,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
}

// Minimal markdown renderer: handles headings, bold, italic, links, paragraphs, lists.
// Keeps dependencies at zero for the non-technical workflow.
function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const html: string[] = [];
  let inList = false;

  const inline = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      continue;
    }
    if (line.startsWith("# ")) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<h2>${inline(line.slice(2).trim())}</h2>`);
    } else if (line.startsWith("## ")) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<h3>${inline(line.slice(3).trim())}</h3>`);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inline(line.slice(2).trim())}</li>`);
    } else {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<p>${inline(line)}</p>`);
    }
  }
  if (inList) html.push("</ul>");
  return html.join("\n");
}

export default function BlogPostPage({ params }: Params) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);

  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="partner-hero blog-post-hero">
          <Reveal>
            <p className="eyebrow">
              <Link href="/blog" className="quiet-link" style={{ color: "var(--fog)" }}>
                ← Back to Blog
              </Link>
            </p>
            <h1>{post.title}</h1>
            <p className="partner-lede" style={{ color: "var(--fog)", marginTop: "18px" }}>
              {formatDate(post.date)}
            </p>
          </Reveal>
        </section>

        <section className="partner-details section-panel blog-post-body">
          <Reveal>
            <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="partner-contact">
              <p className="eyebrow">Enjoyed this?</p>
              <Link href="/blog" className="contact-email" style={{ fontSize: "20px" }}>
                ← More articles
              </Link>
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
