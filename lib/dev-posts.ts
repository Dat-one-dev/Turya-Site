export type DevPost = {
  title: string;
  url: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
};

export const DEV_PROFILE_URL = "https://dev.to/kartik_patel";

// Curated from the DEV profile, ordered by reactions and comments.
export const devPosts: DevPost[] = [
  {
    title: "Godot Launches Official Assets Store",
    url: "https://dev.to/kartik_patel/godot-launches-official-assets-store-3135",
    date: "2025-06-24",
    excerpt:
      "Godot's official Asset Store is here — what it means for the engine, and why it finally feels like a real ecosystem.",
  },
  {
    title: "Godot 4.4 Is Game Changer",
    url: "https://dev.to/kartik_patel/godot-44-is-game-changer-1oe2",
    date: "2025-03-04",
    excerpt:
      "A look at what landed in Godot 4.4 and the features that make it a genuine step change for game developers.",
  },
  {
    title: "Keyboard Input In Miniscript",
    url: "https://dev.to/kartik_patel/keyboard-input-in-miniscript-3cjm",
    date: "2025-05-10",
    excerpt:
      "A practical walkthrough of keyboard input in MiniScript, from detecting keys to moving something on screen.",
  },
  {
    title: "Zero To Game Dev — Understanding Mini Micro",
    url: "https://dev.to/kartik_patel/zero-to-game-dev-understanding-mini-micro-k8p",
    date: "2026-03-06",
    excerpt:
      "Chapter 5 of Zero to Game Dev — getting comfortable with Mini Micro before you write a single game.",
  },
  {
    title: "Zero to Game Dev — Thinking Like a Coder",
    url: "https://dev.to/kartik_patel/zero-to-game-dev-thinking-like-coder-before-writing-code-1be0",
    date: "2026-02-09",
    excerpt:
      "Chapter 4 of Zero to Game Dev — the thinking habits that matter before you touch a keyboard.",
  },
  {
    title: "I Accidentally Built an AI That Makes You Question Reality",
    url: "https://dev.to/kartik_patel/i-accidentally-built-an-ai-that-makes-you-question-reality-55d0",
    date: "2025-12-17",
    excerpt:
      "A small experiment that turned into an AI which asks uncomfortable questions — and what building it taught me.",
  },
];
