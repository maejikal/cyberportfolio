import { d as createComponent, g as getCollection, b as $$ThemeProvider, a as $$Header, $ as $$Footer, e as renderScript, s as siteConfig } from './ThemeProvider_Q1utISA5.mjs';
import 'piccolore';
import { x as renderComponent, z as renderHead, C as renderTemplate, j as addAttribute } from './prerender_WqreDBWI.mjs';
/* empty css                 */

const $$Reviews = createComponent(async ($$result, $$props, $$slots) => {
  const getSlug = (id) => id.replace(/\.md$/, "");
  const allReviews = (await getCollection("reviews")).filter((review) => !review.data.draft).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "ThemeProvider", $$ThemeProvider, { "themeName": siteConfig.theme })}<meta charset="utf-8"><link rel="icon" type="image/x-icon" href="/cyberportfolio/favicon.ico"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"><title>Reviews & Notes</title>${renderHead()}</head> <body class="flex flex-col min-h-screen"> ${renderComponent($$result, "Header", $$Header, {})} <br> <br> <main class="flex-1 max-w-4xl mx-auto px-4 py-10 w-full mt-20"> <h1 class="text-4xl font-bold mb-8 text-[var(--text-primary)]">Reviews & Notes</h1> <!-- Filter buttons --> <div class="mb-8 flex flex-wrap gap-2"> <button class="filter-btn active px-4 py-2 rounded-lg font-medium transition-colors" data-category="all" style="background-color: var(--accent-color); color: white;">
All
</button> <button class="filter-btn px-4 py-2 rounded-lg font-medium transition-colors" data-category="module" style="background-color: var(--accent-light); color: var(--text-primary);">
Modules
</button> <button class="filter-btn px-4 py-2 rounded-lg font-medium transition-colors" data-category="book" style="background-color: var(--accent-light); color: var(--text-primary);">
Books
</button> <button class="filter-btn px-4 py-2 rounded-lg font-medium transition-colors" data-category="tool" style="background-color: var(--accent-light); color: var(--text-primary);">
Tools
</button> <button class="filter-btn px-4 py-2 rounded-lg font-medium transition-colors" data-category="resource" style="background-color: var(--accent-light); color: var(--text-primary);">
Resources
</button> <button class="filter-btn px-4 py-2 rounded-lg font-medium transition-colors" data-category="other" style="background-color: var(--accent-light); color: var(--text-primary);">
Other
</button> </div> ${allReviews.length === 0 ? renderTemplate`<p class="text-lg text-[var(--text-secondary)]">Coming soon...</p>` : renderTemplate`<div class="space-y-6" id="reviews-container"> ${allReviews.map((review) => renderTemplate`<a${addAttribute(`/cyberportfolio/reviews/${getSlug(review.id)}/`, "href")} class="block hover:shadow-lg transition-shadow p-4 rounded-lg review-item"${addAttribute(review.data.category, "data-category")}> <article class="pb-6 border-b" style="border-bottom-color: var(--border-primary);"> <div class="flex items-start justify-between mb-2"> <h2 class="text-2xl font-semibold text-[var(--text-primary)] hover:text-[var(--accent-color)]"> ${review.data.title} </h2> ${review.data.rating && renderTemplate`<div class="flex items-center gap-1 text-yellow-500"> ${Array.from({ length: review.data.rating }).map(() => renderTemplate`<span>★</span>`)} ${Array.from({ length: 5 - review.data.rating }).map(() => renderTemplate`<span class="text-gray-300">★</span>`)} </div>`} </div> <div class="flex items-center gap-3 mb-3"> <span class="px-3 py-1 text-xs rounded-full font-medium" style="background-color: var(--accent-light); color: var(--accent-color);"> ${review.data.category} </span> ${review.data.moduleCode && renderTemplate`<span class="text-sm font-medium text-[var(--accent-color)]"> ${review.data.moduleCode} </span>`} ${review.data.semester && renderTemplate`<span class="text-sm text-[var(--text-secondary)]"> ${review.data.semester} </span>`} </div> <div class="text-sm mb-3 text-[var(--text-secondary)]"> <p>
Published: ${review.data.pubDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </p> ${review.data.lastUpdated && renderTemplate`<p class="mt-1">
Last Updated: ${review.data.lastUpdated.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </p>`} </div> ${review.data.tags && review.data.tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mb-3"> ${review.data.tags.map((tag) => renderTemplate`<span class="px-2 py-1 text-xs rounded-full text-[var(--text-primary)]" style="background-color: var(--accent-light);"> ${tag} </span>`)} </div>`} ${review.data.description && renderTemplate`<p class="text-[var(--text-secondary)]">${review.data.description}</p>`} </article> </a>`)} </div>`} </main> ${renderComponent($$result, "Footer", $$Footer, {})} ${renderScript($$result, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/reviews.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/reviews.astro", void 0);

const $$file = "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/reviews.astro";
const $$url = "/cyberportfolio/reviews";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reviews,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
