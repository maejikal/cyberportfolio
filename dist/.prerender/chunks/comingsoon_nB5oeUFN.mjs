import { d as createComponent, b as $$ThemeProvider, a as $$Header, $ as $$Footer, s as siteConfig } from './ThemeProvider_Q1utISA5.mjs';
import 'piccolore';
import { x as renderComponent, z as renderHead, C as renderTemplate } from './prerender_WqreDBWI.mjs';
/* empty css                 */

const $$Comingsoon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "ThemeProvider", $$ThemeProvider, { "themeName": siteConfig.theme })}<meta charset="utf-8"><link rel="icon" type="image/x-icon" href="/cyberportfolio/favicon.ico"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"><title>Others</title>${renderHead()}</head> <body class="flex flex-col min-h-screen"> ${renderComponent($$result, "Header", $$Header, {})} <br> <br> <main class="flex-1 max-w-4xl mx-auto px-4 py-10 w-full mt-20"> <h1 class="text-4xl font-bold mb-8 text-[var(--text-primary)]">Others</h1> <p class="text-lg text-[var(--text-secondary)]">Coming soon...</p> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/comingsoon.astro", void 0);

const $$file = "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/comingsoon.astro";
const $$url = "/cyberportfolio/comingsoon";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Comingsoon,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
