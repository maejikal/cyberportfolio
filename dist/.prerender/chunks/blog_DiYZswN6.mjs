import { d as createComponent, e as renderScript, g as getCollection, b as $$ThemeProvider, a as $$Header, $ as $$Footer, s as siteConfig } from './ThemeProvider_Q1utISA5.mjs';
import 'piccolore';
import { t as maybeRenderHead, C as renderTemplate, x as renderComponent, z as renderHead, j as addAttribute } from './prerender_WqreDBWI.mjs';
import 'clsx';
/* empty css                 */

const $$BlogSearch = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mb-8"> <input type="text" id="blogSearch" placeholder="Search blog posts, tags..." class="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2" style="border: 1px solid var(--border-primary); background-color: var(--bg-secondary); color: var(--text-primary);"> </div> ${renderScript($$result, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/BlogSearch.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/BlogSearch.astro", void 0);

const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const getSlug = (id) => id.replace(/\.md$/, "");
  const allPosts = (await getCollection("posts")).filter((post) => !post.data.draft).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
  const pinnedPost = allPosts.find((post) => getSlug(post.id) === "2025-12-10-welcome");
  const otherPosts = allPosts.filter((post) => getSlug(post.id) !== "2025-12-10-welcome");
  const posts = pinnedPost ? [pinnedPost, ...otherPosts] : allPosts;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "ThemeProvider", $$ThemeProvider, { "themeName": siteConfig.theme })}<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/x-icon" href="/cyberportfolio/favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"><title>Blog</title>${renderHead()}</head> <body class="flex flex-col min-h-screen"> ${renderComponent($$result, "Header", $$Header, {})} <br> <br> <main class="flex-1 max-w-4xl mx-auto px-4 py-10 w-full mt-20"> <h1 class="text-4xl font-bold mb-8 text-[var(--text-primary)]">Blog</h1> ${renderComponent($$result, "BlogSearch", $$BlogSearch, {})} <div class="space-y-6"> ${posts.map((post, index) => renderTemplate`<a${addAttribute(`/cyberportfolio/blog/${getSlug(post.id)}/`, "href")} class="block hover:shadow-lg transition-shadow p-4 rounded-lg"> <article${addAttribute(`blog-article border-b pb-6 ${index === 0 && pinnedPost ? "p-4 rounded-lg border-l-4" : ""}`, "class")}${addAttribute(index === 0 && pinnedPost ? `background-color: var(--accent-light); border-left-color: var(--accent-color); border-bottom-color: var(--border-primary)` : "border-color: var(--border-primary)", "style")}${addAttribute(post.data.tags ? post.data.tags.join(",") : "", "data-tags")}> ${index === 0 && pinnedPost && renderTemplate`<span class="text-sm font-semibold mb-2 block" style="color: var(--accent-color)">📌 Pinned</span>`} <h2 class="blog-title text-2xl font-semibold mb-2 hover:text-[var(--accent-color)] text-[var(--text-primary)]"> ${post.data.title} </h2> <div class="text-sm text-[var(--text-secondary)] mb-3"> <p>
Published: ${post.data.pubDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </p> ${post.data.lastUpdated && renderTemplate`<p class="mt-1">
Last Updated: ${post.data.lastUpdated.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </p>`} </div> ${post.data.tags && post.data.tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mb-3"> ${post.data.tags.map((tag) => renderTemplate`<span class="px-2 py-1 text-xs rounded-full" style="background-color: var(--accent-light); color: var(--text-primary)"> ${tag} </span>`)} </div>`} ${post.data.description && renderTemplate`<p class="blog-description text-[var(--text-secondary)]">${post.data.description}</p>`} </article> </a>`)} </div> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/blog.astro", void 0);

const $$file = "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/blog.astro";
const $$url = "/cyberportfolio/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
