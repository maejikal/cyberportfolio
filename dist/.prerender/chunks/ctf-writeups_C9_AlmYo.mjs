import { d as createComponent, e as renderScript, g as getCollection, b as $$ThemeProvider, a as $$Header, $ as $$Footer, s as siteConfig } from './ThemeProvider_Q1utISA5.mjs';
import 'piccolore';
import { t as maybeRenderHead, C as renderTemplate, x as renderComponent, z as renderHead, j as addAttribute } from './prerender_WqreDBWI.mjs';
import 'clsx';
/* empty css                 */

const $$WriteupSearch = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mb-8"> <input type="text" id="writeupSearch" placeholder="Search CTF writeups, tags..." class="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2" style="border: 1px solid var(--border-primary); background-color: var(--bg-secondary); color: var(--text-primary);"> </div> ${renderScript($$result, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/WriteupSearch.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/WriteupSearch.astro", void 0);

const $$CtfWriteups = createComponent(async ($$result, $$props, $$slots) => {
  const getSlug = (id) => id.replace(/\.md$/, "");
  const allWriteups = (await getCollection("writeups")).filter((writeup) => !writeup.data.draft).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
  const pinnedWriteup = allWriteups.find((writeup) => writeup.data.title === "CTF Collection");
  const otherWriteups = allWriteups.filter((writeup) => writeup.data.title !== "CTF Collection");
  const writeups = pinnedWriteup ? [pinnedWriteup, ...otherWriteups] : allWriteups;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "ThemeProvider", $$ThemeProvider, { "themeName": siteConfig.theme })}<meta charset="utf-8"><link rel="icon" type="image/x-icon" href="/cyberportfolio/favicon.ico"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"><title>CTF Writeups</title>${renderHead()}</head> <body class="flex flex-col min-h-screen"> ${renderComponent($$result, "Header", $$Header, {})} <br> <br> <main class="flex-1 max-w-4xl mx-auto px-4 py-10 w-full mt-20"> <h1 class="text-4xl font-bold mb-8 text-[var(--text-primary)]">CTF Writeups</h1> ${renderComponent($$result, "WriteupSearch", $$WriteupSearch, {})} ${writeups.length === 0 ? renderTemplate`<p class="text-lg text-[var(--text-secondary)]">Coming soon...</p>` : renderTemplate`<div class="space-y-6"> ${writeups.map((writeup, index) => renderTemplate`<a${addAttribute(`/cyberportfolio/ctf-writeups/${getSlug(writeup.id)}/`, "href")} class="block hover:shadow-lg transition-shadow p-4 rounded-lg"> <article${addAttribute(`writeup-article pb-6 ${index === 0 && pinnedWriteup ? "p-4 rounded-lg border-l-4" : "border-b"}`, "class")}${addAttribute(index === 0 && pinnedWriteup ? "background-color: var(--accent-light); border-left-color: var(--accent-color); border-bottom-color: var(--border-primary);" : "border-bottom-color: var(--border-primary);", "style")}${addAttribute(writeup.data.tags ? writeup.data.tags.join(",") : "", "data-tags")}> ${index === 0 && pinnedWriteup && renderTemplate`<span class="text-sm font-semibold mb-2 block" style="color: var(--accent-color);">📌 Pinned</span>`} <h2 class="writeup-title text-2xl font-semibold mb-2 text-[var(--text-primary)] hover:text-[var(--accent-color)]"> ${writeup.data.title} </h2> ${writeup.data.ctfName && renderTemplate`<p class="writeup-ctf text-sm font-medium mb-2 text-[var(--accent-color)]">${writeup.data.ctfName}</p>`} <div class="text-sm mb-3 text-[var(--text-secondary)]"> <p>
Published: ${writeup.data.pubDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </p> ${writeup.data.lastUpdated && renderTemplate`<p class="mt-1">
Last Updated: ${writeup.data.lastUpdated.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </p>`} </div> ${writeup.data.tags && writeup.data.tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mb-3"> ${writeup.data.tags.map((tag) => renderTemplate`<span class="px-2 py-1 text-xs rounded-full text-[var(--text-primary)]" style="background-color: var(--accent-light);"> ${tag} </span>`)} </div>`} ${writeup.data.description && renderTemplate`<p class="writeup-description text-[var(--text-secondary)]">${writeup.data.description}</p>`} </article> </a>`)} </div>`} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/ctf-writeups.astro", void 0);

const $$file = "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/ctf-writeups.astro";
const $$url = "/cyberportfolio/ctf-writeups";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CtfWriteups,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
