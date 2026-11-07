// Every Markdown file under content/ is bundled as a raw string. To add a
// page: create content/<slug>.md and add an entry to `meta` below.
const modules = import.meta.glob<string>("../content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

interface PageMeta {
  slug: string;
  title: string;
  section: string;
}

export interface Page extends PageMeta {
  body: string;
}

const meta: PageMeta[] = [
  { slug: "getting-started", title: "Getting started", section: "Introduction" },
  { slug: "guides/connect-a-wallet", title: "Connect a wallet", section: "Guides" },
  { slug: "guides/call-a-contract", title: "Call a contract", section: "Guides" },
];

export const pages: Page[] = meta.map((m) => {
  const body = modules[`../content/${m.slug}.md`];
  if (body === undefined) {
    throw new Error(`Missing content file for page "${m.slug}"`);
  }
  return { ...m, body };
});

export const sections: string[] = [...new Set(pages.map((p) => p.section))];
