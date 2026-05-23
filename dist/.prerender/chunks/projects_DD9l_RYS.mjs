import { d as createComponent, g as getCollection, b as $$ThemeProvider, a as $$Header, $ as $$Footer, s as siteConfig } from './ThemeProvider_Q1utISA5.mjs';
import 'piccolore';
import { x as renderComponent, t as maybeRenderHead, C as renderTemplate, j as addAttribute } from './prerender_WqreDBWI.mjs';

const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const projects = (await getCollection("projects")).filter((proj) => !proj.data.draft);
  return renderTemplate`${renderComponent($$result, "ThemeProvider", $$ThemeProvider, { "themeName": siteConfig.theme, "lang": "en" }, { "default": async ($$result2) => renderTemplate` <meta charset="utf-8"> <meta name="viewport" content="width=device-width,initial-scale=1"> <title>Projects</title> ` })} ${renderComponent($$result, "Header", $$Header, {})} ${maybeRenderHead()}<main class="max-w-4xl mx-auto px-4 py-10"> <h1 class="text-4xl font-bold mb-8">Projects</h1> <div class="grid gap-6"> ${projects.map((project) => renderTemplate`<article class="border rounded-lg p-6 hover:shadow-lg transition"> <h2 class="text-2xl font-semibold mb-2">${project.data.title}</h2> ${project.data.description && renderTemplate`<p class="text-gray-700 mb-4">${project.data.description}</p>`} ${project.data.link && renderTemplate`<a${addAttribute(project.data.link, "href")} class="text-blue-600 hover:underline mb-4 block">
View Project →
</a>`} ${project.data.skills && renderTemplate`<p class="text-sm text-gray-600"> <strong>Skills:</strong> ${project.data.skills.join(", ")} </p>`} </article>`)} </div> </main> ${renderComponent($$result, "Footer", $$Footer, {})} `;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/projects.astro", void 0);

const $$file = "/Users/maejikal/Documents/GitHub/cyberportfolio/src/pages/projects.astro";
const $$url = "/cyberportfolio/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
