import fs from "fs";
import path from "path";

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  content: string; // raw markdown body
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(fileContent: string): { data: Record<string, string>; body: string } {
  const match = fileContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { data: {}, body: fileContent };
  const [, raw, body] = match;
  const data: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf(":");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    // strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: body.trim() };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .sort();
  const posts: Post[] = [];
  for (const file of files) {
    const fullPath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, body } = parseFrontmatter(raw);
    const slug = file.replace(/\.md$/, "");
    // require title/date/excerpt — skip incomplete files
    if (!data.title || !data.date || !data.excerpt) continue;
    posts.push({
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content: body,
    });
  }
  // newest first
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
