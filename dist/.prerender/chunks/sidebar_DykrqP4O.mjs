import { d as createComponent, e as renderScript, g as getCollection } from './ThemeProvider_Q1utISA5.mjs';
import 'piccolore';
import { t as maybeRenderHead, j as addAttribute, C as renderTemplate } from './prerender_WqreDBWI.mjs';
import 'clsx';

const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Sidebar;
  const { tags = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<aside class="hidden lg:block w-48 flex-shrink-0"> <div class="sticky top-15 space-y-4 max-h-[calc(100vh-5rem)] overflow-hidden flex flex-col"> <!-- Back to Top Button --> <button id="backToTop" class="flex items-center gap-2 text-sm font-medium transition-all w-full px-3 py-2 rounded-md hover:shadow-md flex-shrink-0" style="background-color: var(--accent-light); color: var(--text-primary);"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path> </svg>
Back to Top
</button> <!-- Tags Section (only show if tags exist) --> ${tags && tags.length > 0 && renderTemplate`<div class="flex-shrink-0"> <button id="sidebarToggle" class="flex items-center gap-2 text-sm font-semibold mb-3 transition-colors w-full" style="color: var(--accent-color);"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path> </svg> <span id="sidebarToggleText">Tags (${tags.length})</span> <svg id="sidebarChevron" class="w-4 h-4 ml-auto transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </button> <div id="sidebarTags" class="flex flex-col gap-2"> ${tags.map((tag) => renderTemplate`<a${addAttribute(`/cyberportfolio/search?q=${encodeURIComponent(tag)}`, "href")} class="tag-link px-3 py-1.5 text-sm rounded-md transition-all text-center" style="background-color: var(--accent-light); color: var(--text-primary);"> ${tag} </a>`)} </div> </div>`} <!-- Table of Contents Toggle (Desktop) --> <button id="tocToggle" class="flex items-center gap-2 text-sm font-semibold mb-3 transition-colors w-full flex-shrink-0" style="color: var(--accent-color);"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> <span id="tocToggleText">Contents</span> <svg id="tocChevron" class="w-4 h-4 ml-auto transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </button> <div id="sidebarTOC" class="flex flex-col gap-2 overflow-y-auto pr-2 flex-1 min-h-0"></div> </div> </aside>`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/Sidebar.astro", void 0);

const $$MobileTOC = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Mobile TOC Toggle (always available on small screens) -->${maybeRenderHead()}<div class="mb-6 lg:hidden"> <button id="mobileTOCToggle" class="flex items-center gap-2 text-sm font-medium transition-colors mb-3" style="color: var(--accent-color);"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> <span id="mobileTOCToggleText">Show Contents</span> </button> <div id="mobileTOC" class="hidden mt-3 flex flex-col gap-2"></div> </div>`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/MobileTOC.astro", void 0);

const $$Disclaimer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Disclaimer;
  const { type = "post", customDisclaimer } = Astro2.props;
  const titleMap = {
    post: "Side Note",
    writeup: "Side Note"
  };
  return renderTemplate`${customDisclaimer && renderTemplate`${maybeRenderHead()}<div class="disclaimer-box" data-astro-cid-cukr4w5s><div class="disclaimer-icon" data-astro-cid-cukr4w5s><div class="disclaimer-icon-mark" aria-hidden="true" data-astro-cid-cukr4w5s>!</div></div><div class="disclaimer-content" data-astro-cid-cukr4w5s><h3 class="disclaimer-title" data-astro-cid-cukr4w5s>${titleMap[type]}</h3><p class="disclaimer-text" data-astro-cid-cukr4w5s>${customDisclaimer}</p></div></div>`}`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/Disclaimer.astro", void 0);

const $$ArticleStats = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ArticleStats;
  const { pubDate, lastUpdated } = Astro2.props;
  const formattedPubDate = pubDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const formattedLastUpdated = lastUpdated?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return renderTemplate`${maybeRenderHead()}<aside class="hidden lg:block w-full"> <div class="rounded-lg p-4 border border-[var(--accent-light)]" style="background-color: rgba(var(--accent-rgb, 59, 130, 246), 0.05);"> <h3 class="text-lg font-bold mb-4 text-[var(--text-primary)]">Article Stats</h3> <div class="space-y-4" id="articleStats">  <div class="flex items-start gap-3" id="readingTimeContainer" style="display: none;"> <svg class="w-5 h-5 mt-0.5 flex-shrink-0" style="color: var(--accent-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <div> <p class="text-sm text-[var(--text-secondary)]">Reading Time</p> <p class="font-semibold text-[var(--text-primary)]" id="readingTimeValue">- min read</p> </div> </div>  <div class="flex items-start gap-3" id="wordCountContainer" style="display: none;"> <svg class="w-5 h-5 mt-0.5 flex-shrink-0" style="color: var(--accent-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> </svg> <div> <p class="text-sm text-[var(--text-secondary)]">Word Count</p> <p class="font-semibold text-[var(--text-primary)]" id="wordCountValue">0</p> </div> </div>  <div class="flex items-start gap-3"> <svg class="w-5 h-5 mt-0.5 flex-shrink-0" style="color: var(--accent-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> <div> <p class="text-sm text-[var(--text-secondary)]">Published</p> <p class="font-semibold text-[var(--text-primary)]">${formattedPubDate}</p> </div> </div>  ${lastUpdated && renderTemplate`<div class="flex items-start gap-3 pt-2 border-t border-[var(--accent-light)]"> <svg class="w-5 h-5 mt-0.5 flex-shrink-0" style="color: var(--accent-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path> </svg> <div> <p class="text-sm text-[var(--text-secondary)]">Last Updated</p> <p class="font-semibold text-[var(--text-primary)]">${formattedLastUpdated}</p> </div> </div>`} </div> </div> </aside> ${renderScript($$result, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/ArticleStats.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/ArticleStats.astro", void 0);

const $$RelatedPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$RelatedPosts;
  const { currentSlug, tags = [], type } = Astro2.props;
  const collection = type === "writeup" ? await getCollection("writeups") : type === "review" ? await getCollection("reviews") : await getCollection("posts");
  let relatedItems = collection.filter((item) => {
    const itemSlug = item.id.replace(/\.md$/, "");
    if (itemSlug === currentSlug) return false;
    if (item.data.draft) return false;
    if (!item.data.tags) return false;
    const itemTags = item.data.tags.map((t) => t.toLowerCase());
    const currentTags = tags.map((t) => t.toLowerCase());
    const commonTags = itemTags.filter((tag) => currentTags.includes(tag));
    return commonTags.length > 0;
  });
  relatedItems = relatedItems.sort((a, b) => {
    const aCommon = (a.data.tags || []).filter(
      (tag) => tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    ).length;
    const bCommon = (b.data.tags || []).filter(
      (tag) => tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    ).length;
    if (bCommon !== aCommon) return bCommon - aCommon;
    return b.data.pubDate.getTime() - a.data.pubDate.getTime();
  }).slice(0, 4);
  const baseUrl = type === "writeup" ? "/cyberportfolio/ctf-writeups" : type === "review" ? "/cyberportfolio/reviews" : "/cyberportfolio/blog";
  return renderTemplate`${maybeRenderHead()}<aside class="hidden lg:block w-full"> <div class="rounded-lg p-4 border border-[var(--accent-light)]" style="background-color: rgba(var(--accent-rgb, 59, 130, 246), 0.05);"> <h3 class="text-lg font-bold mb-4 text-[var(--text-primary)]">Related ${type === "writeup" ? "Writeups" : "Posts"}</h3> ${relatedItems.length > 0 ? renderTemplate`<div class="space-y-3"> ${relatedItems.map((item) => renderTemplate`<a${addAttribute(`${baseUrl}/${item.id.replace(/\.md$/, "")}`, "href")} class="group block p-3 rounded-lg transition-all duration-200" style="background-color: rgba(var(--accent-rgb, 59, 130, 246), 0.08);"> <p class="font-medium text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors line-clamp-2"> ${item.data.title} </p> <p class="text-xs text-[var(--text-secondary)] mt-1"> ${item.data.pubDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit"
  })} </p> ${item.data.tags && item.data.tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-1 mt-2"> ${item.data.tags.slice(0, 2).map((tag) => renderTemplate`<span class="text-xs px-2 py-0.5 rounded-full" style="background-color: var(--accent-light); color: var(--text-primary);"> ${tag} </span>`)} ${item.data.tags.length > 2 && renderTemplate`<span class="text-xs px-2 py-0.5 rounded-full" style="background-color: var(--accent-light); color: var(--text-secondary);">
+${item.data.tags.length - 2} </span>`} </div>`} </a>`)} </div>` : renderTemplate`<p class="text-sm text-[var(--text-secondary)]">No related ${type === "writeup" ? "writeups" : "posts"} found.</p>`} </div> </aside>`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/RelatedPosts.astro", void 0);

export { $$ArticleStats as $, $$Disclaimer as a, $$MobileTOC as b, $$RelatedPosts as c, $$Sidebar as d };
