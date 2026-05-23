import { d as createComponent, g as getCollection, r as renderEntry, b as $$ThemeProvider, e as renderScript, a as $$Header, $ as $$Footer, s as siteConfig } from './ThemeProvider_Q1utISA5.mjs';
import 'piccolore';
import { x as renderComponent, j as addAttribute, z as renderHead, C as renderTemplate } from './prerender_WqreDBWI.mjs';
import { d as $$Sidebar, b as $$MobileTOC, a as $$Disclaimer, $ as $$ArticleStats, c as $$RelatedPosts } from './sidebar_DykrqP4O.mjs';
/* empty css                 */

async function getStaticPaths() {
  const writeups = await getCollection("writeups");
  return writeups.map((writeup) => ({
    params: { slug: writeup.id.replace(/\.md$/, "") },
    props: { writeup }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { writeup } = Astro2.props;
  const { Content } = await renderEntry(writeup);
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "ThemeProvider", $$ThemeProvider, { "themeName": siteConfig.theme })}${renderScript($$result, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/ctf-writeups/[slug].astro?astro&type=script&index=0&lang.ts")}${renderScript($$result, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/ctf-writeups/[slug].astro?astro&type=script&index=1&lang.ts")}${renderScript($$result, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/ctf-writeups/[slug].astro?astro&type=script&index=2&lang.ts")}${renderScript($$result, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/ctf-writeups/[slug].astro?astro&type=script&index=3&lang.ts")}<meta charset="utf-8"><link rel="icon" type="image/x-icon" href="/cyberportfolio/favicon.ico"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"><title>${writeup.data.title}</title>${renderHead()}</head> <body class="flex flex-col min-h-screen"> ${renderComponent($$result, "Header", $$Header, {})} <main class="flex-1 w-full px-4 py-10 pt-40"> <div class="max-w-7xl mx-auto"> <a href="/cyberportfolio/ctf-writeups" class="inline-flex items-center mb-6 text-[var(--accent-color)] hover:text-[var(--accent-dark)]"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>
Back to Writeups
</a> <div class="flex gap-8 lg:gap-12 relative"> <!-- Sticky Sidebar (Desktop) --> ${renderComponent($$result, "Sidebar", $$Sidebar, { "tags": writeup.data.tags })} <!-- Main Article Content + Right Sidebar --> <div class="article-and-sidebar"> <!-- Article --> <article class="flex-1 min-w-0 max-w-4xl"> <h1 class="text-4xl font-bold mb-2 text-[var(--text-primary)]">${writeup.data.title}</h1> ${writeup.data.ctfName && renderTemplate`<p class="text-lg font-medium mb-4 text-[var(--accent-color)]">${writeup.data.ctfName}</p>`} <div class="text-sm mb-4 text-[var(--text-secondary)]"> <p>
Published: ${writeup.data.pubDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </p> ${writeup.data.lastUpdated && renderTemplate`<p class="mt-1">
Last Updated: ${writeup.data.lastUpdated.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </p>`} </div>  ${writeup.data.tags && writeup.data.tags.length > 0 && renderTemplate`<div class="mb-6 lg:hidden"> <button id="mobileToggle" class="flex items-center gap-2 text-sm font-medium transition-colors" style="color: var(--accent-color);"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path> </svg> <span id="mobileToggleText">Show Tags (${writeup.data.tags.length})</span> </button> <div id="mobileTags" class="hidden mt-3 flex flex-wrap gap-2"> ${writeup.data.tags.map((tag) => renderTemplate`<a${addAttribute(`/cyberportfolio/search?q=${encodeURIComponent(tag)}`, "href")} class="tag-link px-3 py-1.5 text-sm rounded-full transition-all hover:shadow-md" style="background-color: var(--accent-light); color: var(--text-primary);"> ${tag} </a>`)} </div> </div>`} ${renderComponent($$result, "MobileTOC", $$MobileTOC, {})} ${writeup.data.downloads && writeup.data.downloads.length > 0 && renderTemplate`<div class="mb-8 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"> <h3 class="text-lg font-bold mb-3 text-[var(--text-primary)] flex items-center gap-2"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
Downloads
</h3> <div class="flex flex-wrap gap-3"> ${writeup.data.downloads.map((download) => {
    const downloadUrl = download.url.startsWith("/") ? `/cyberportfolio${download.url}` : download.url;
    return renderTemplate`<a${addAttribute(downloadUrl, "href")} download class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-[var(--accent-color)] text-white hover:bg-[var(--accent-dark)] transition-colors"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg> ${download.name} </a>`;
  })} </div> </div>`} <div class="prose max-w-none"> ${renderComponent($$result, "Content", Content, {})} </div> </article> <!-- Right Sidebar: Stacked Stats and Related Posts with Toggle --> <div class="hidden lg:flex flex-col gap-6 relative"> <button id="rightSidebarToggle" aria-label="Toggle article info sidebar" title="Toggle article info" class="self-end"> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path> </svg> </button> <div id="rightSidebar" class="flex flex-col gap-6 w-80"> ${renderComponent($$result, "Disclaimer", $$Disclaimer, { "type": "writeup", "customDisclaimer": writeup.data.disclaimer })} ${renderComponent($$result, "ArticleStats", $$ArticleStats, { "pubDate": writeup.data.pubDate, "lastUpdated": writeup.data.lastUpdated })} ${renderComponent($$result, "RelatedPosts", $$RelatedPosts, { "currentSlug": writeup.id.replace(/\.md$/, ""), "tags": writeup.data.tags, "type": "writeup" })} </div> </div> </div> </div> </div> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/ctf-writeups/[slug].astro", void 0);

const $$file = "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/ctf-writeups/[slug].astro";
const $$url = "/cyberportfolio/ctf-writeups/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
