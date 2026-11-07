import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { pages, sections } from "./pages";

/** Pages are addressed by hash (#/getting-started) so the site can be hosted statically. */
function slugFromHash(): string {
  const slug = window.location.hash.replace(/^#\/?/, "");
  return pages.some((p) => p.slug === slug) ? slug : pages[0].slug;
}

export default function App() {
  const [slug, setSlug] = useState(slugFromHash);

  useEffect(() => {
    const onHashChange = () => {
      setSlug(slugFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const index = pages.findIndex((p) => p.slug === slug);
  const page = pages[index];
  const prev = pages[index - 1];
  const next = pages[index + 1];

  useEffect(() => {
    document.title = `${page.title} · Sorokit docs`;
  }, [page.title]);

  return (
    <div className="layout">
      <aside className="sidebar">
        <a className="brand" href="#/">
          Sorokit <span>docs</span>
        </a>
        <nav aria-label="Documentation">
          {sections.map((section) => (
            <div key={section} className="nav-section">
              <h2>{section}</h2>
              <ul>
                {pages
                  .filter((p) => p.section === section)
                  .map((p) => (
                    <li key={p.slug}>
                      <a
                        href={`#/${p.slug}`}
                        aria-current={p.slug === slug ? "page" : undefined}
                      >
                        {p.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="sidebar-links">
          <a href="https://github.com/sorokit-dev/sorokit-core">sorokit-core</a>
          <a href="https://github.com/sorokit-dev/sorokit-ui">sorokit-ui</a>
        </div>
      </aside>
      <main className="content">
        <article className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.body}</ReactMarkdown>
        </article>
        <nav className="pager" aria-label="Pagination">
          {prev ? <a href={`#/${prev.slug}`}>← {prev.title}</a> : <span />}
          {next ? <a href={`#/${next.slug}`}>{next.title} →</a> : <span />}
        </nav>
      </main>
    </div>
  );
}
