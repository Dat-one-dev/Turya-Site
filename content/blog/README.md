# How to add a blog post

Add a new Markdown file to `content/blog/` — one file per post.

Filename becomes the URL slug: `my-first-post.md` → `/blog/my-first-post`

Each file must start with YAML frontmatter between `---` lines:

```md
---
title: "My First Post"
date: "2026-03-14"
excerpt: "Short one-sentence summary shown on the listing page."
---

Your Markdown content goes here. You can use **bold**, *italic*,
lists, headings, links, and paragraphs. Keep it simple.
```

Fields:
- `title` — post title
- `date` — `YYYY-MM-DD` (shown on listing and post page)
- `excerpt` — short description for the listing page

No code changes needed — adding the file is enough. It will appear on `/blog` at the next build.
No fake posts are included by design; an empty `content/blog/` renders a clean empty state.
