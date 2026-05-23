import 'piccolore';
import { A as AstroError, d as InvalidComponentArgs, m as createRenderInstruction, y as renderElement, o as generateCspDigest, D as spreadAttributes, G as unescapeHTML, C as renderTemplate, v as removeBase, q as isRemotePath, U as UnknownContentCollectionError, g as RenderUndefinedEntryError, u as prependForwardSlash, l as createHeadAndContent, x as renderComponent, n as defineScriptVars, t as maybeRenderHead, j as addAttribute, B as renderSlot } from './prerender_WqreDBWI.mjs';
import 'clsx';
import { escape } from 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import * as z from 'zod/v4';
import * as devalue from 'devalue';

function validateArgs(args) {
  if (args.length !== 3) return false;
  if (!args[0] || typeof args[0] !== "object") return false;
  return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
  const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
  const fn = (...args) => {
    if (!validateArgs(args)) {
      throw new AstroError({
        ...InvalidComponentArgs,
        message: InvalidComponentArgs.message(name)
      });
    }
    return cb(...args);
  };
  Object.defineProperty(fn, "name", { value: name, writable: false });
  fn.isAstroComponentFactory = true;
  fn.moduleId = moduleId;
  fn.propagation = propagation;
  return fn;
}
function createComponentWithOptions(opts) {
  const cb = baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
  return cb;
}
function createComponent(arg1, moduleId, propagation) {
  if (typeof arg1 === "function") {
    return baseCreateComponent(arg1, moduleId, propagation);
  } else {
    return createComponentWithOptions(arg1);
  }
}

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

function renderScriptElement({ props, children }) {
  return renderElement("script", {
    props,
    children
  });
}
function renderUniqueStylesheet(result, sheet) {
  if (sheet.type === "external") {
    if (Array.from(result.styles).some((s) => s.props.href === sheet.src)) return "";
    return renderElement("link", { props: { rel: "stylesheet", href: sheet.src }, children: "" });
  }
  if (sheet.type === "inline") {
    if (Array.from(result.styles).some((s) => s.children.includes(sheet.content))) return "";
    return renderElement("style", { props: {}, children: sheet.content });
  }
}

function createSvgComponent({ meta, attributes, children, styles }) {
  const hasStyles = styles.length > 0;
  const Component = createComponent({
    async factory(result, props) {
      const normalizedProps = normalizeProps(attributes, props);
      if (hasStyles && result.cspDestination) {
        for (const style of styles) {
          const hash = await generateCspDigest(style, result.cspAlgorithm);
          result._metadata.extraStyleHashes.push(hash);
        }
      }
      return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
    },
    propagation: hasStyles ? "self" : "none"
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position",
  "background"
];

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_Dkd32Zo3.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

z.object({
  tags: z.array(z.string()).optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_KQrJzJZS.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('./content-assets_KQrJzJZS.mjs');
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('./_virtual_astro_get-image_BGW2cCJE.mjs').then(n => n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute,
      // This attribute is used by the toolbar audit
      ...{}
    }).filter(([, value]) => value != null).map(([key, value]) => value === "" ? `${key}=""` : `${key}="${escape(String(value))}"`).join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  const copy = structuredClone(data);
  new Traverse(copy).forEach(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        if (imported.__svgData) {
          const { __svgData: svgData, ...meta } = imported;
          ctx.update(createSvgComponent({ meta, ...svgData }));
        } else {
          ctx.update(imported);
        }
      } else {
        ctx.update(src);
      }
    }
  });
  return copy;
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('./content-modules_Dz-S_Wwv.mjs');
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: isRemotePath(link) ? link : prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const liveCollections = {};

const getCollection = createGetCollection({
	liveCollections,
});

const themes = {
  cyberpunk: {
    name: "cyberpunk",
    label: "Cyberpunk (Magenta)",
    colors: {
      accent: "#e275db",
      accentLight: "rgba(226, 117, 219, 0.1)",
      accentDark: "rgba(24, 128, 255, 1)",
      accentLink: "#fb3fdbff",
      accentNumber: "#f651aeff",
      background: {
        primary: "#ffffff",
        secondary: "#f9f9f9",
        code: "#fcc0eaff",
        codeBorder: "rgba(255, 0, 238, 0.2)"
      },
      text: {
        primary: "#1a1a1a",
        secondary: "#666666",
        code: "#030a16ff"
      },
      borders: {
        primary: "#e275db",
        code: "#e275db"
      }
    }
  },
  dark: {
    name: "dark",
    label: "Dark Mode",
    colors: {
      accent: "#60a5fa",
      accentLight: "rgba(193, 219, 251, 0.1)",
      accentDark: "rgba(251, 121, 117, 1)",
      accentLink: "#bbff7cff",
      accentNumber: "#ffc36aff",
      background: {
        primary: "#0a0a0a",
        secondary: "#1a1a1a",
        code: "#000000",
        codeBorder: "rgba(96, 165, 250, 0.2)"
      },
      text: {
        primary: "#e5e5e5",
        secondary: "#a3a3a3",
        code: "#d4d4d4"
      },
      borders: {
        primary: "#60a5fa",
        code: "#60a5fa"
      }
    }
  },
  ocean: {
    name: "ocean",
    label: "Ocean (Blue)",
    colors: {
      accent: "#0ea5e9",
      accentLight: "rgba(14, 165, 233, 0.1)",
      accentDark: "rgba(14, 164, 233, 1)",
      background: {
        primary: "#d9effdff",
        secondary: "#e0f2fe",
        code: "#082f49",
        codeBorder: "rgba(14, 165, 233, 0.2)"
      },
      text: {
        primary: "#0c4a6e",
        secondary: "#0369a1",
        code: "#e0f2fe"
      },
      borders: {
        primary: "#0ea5e9",
        code: "#0ea5e9"
      }
    }
  },
  forest: {
    name: "forest",
    label: "Forest (Green)",
    colors: {
      accent: "#10b981",
      accentLight: "rgba(16, 185, 129, 0.1)",
      accentDark: "rgba(16, 185, 129, 0.2)",
      background: {
        primary: "#f0fdf4",
        secondary: "#dcfce7",
        code: "#052e16",
        codeBorder: "rgba(16, 185, 129, 0.2)"
      },
      text: {
        primary: "#14532d",
        secondary: "#15803d",
        code: "#dcfce7"
      },
      borders: {
        primary: "#10b981",
        code: "#10b981"
      }
    }
  },
  minimal: {
    name: "minimal",
    label: "Minimal (B&W)",
    colors: {
      accent: "#000000",
      accentLight: "rgba(0, 0, 0, 0.05)",
      accentDark: "rgba(0, 0, 0, 0.1)",
      background: {
        primary: "#ffffff",
        secondary: "#f5f5f5",
        code: "#1a1a1a",
        codeBorder: "rgba(0, 0, 0, 0.1)"
      },
      text: {
        primary: "#000000",
        secondary: "#525252",
        code: "#e5e5e5"
      },
      borders: {
        primary: "#e5e5e5",
        code: "#404040"
      }
    }
  }
};

const siteConfig = {
  name: "maejikal",
  title: "cybersecurity enthusiast, certified nerd. welcome to my cozy corner.",
  description: "i write about things that interest me",
  theme: "dark",
  get accentColor() {
    return themes[this.theme].colors.accent;
  },
  social: {
    // email: "your-email@example.com",
    linkedin: "linkedin.com/in/meyling-taing-bab5ab139",
    // twitter: "https://x.com/rfitzio",
    github: "https://github.com/maejikal"
  },
  aboutMe: "just starting out in the cybersecurity world.\n aspiring red teamer.",
  skills: ["python", "SQL", "mongoDB", "linux", "cybersecurity", "webdev"],
  // projects: [
  //   {
  //     name: "Coming Soon...",
  // description:
  // "One concise email. Five minutes. Every Tuesday. Essential AI news & trends, production-ready libraries, powerful AI tools, and real-world code examples",
  // link: "https://aidevroundup.com/?ref=devportfolio"
  //   skills: ["React", "Node.js", "Flask", "MongoDB"],
  // },
  // {
  //   name: "Chrome Extension Mastery: Build Full-Stack Extensions with React & Node.js",
  //   description:
  //     "Master the art of building production-ready, full-stack Chrome Extensions using modern web technologies and best practices",
  //   link: "https://fullstackextensions.com/?ref=devportfolio",
  //   skills: ["React", "Node.js", "AWS"],
  // },
  // {
  //   name: "ExtensionKit",
  //   description:
  //     "Kit to jump-start your Chrome extension projects with a variety of battle-tested starter templates & examples",
  //   link: "https://extensionkit.io/?ref=devportfolio",
  //   skills: ["React", "Node.js", "AWS"],
  // },
  // ],
  experience: [
    {
      company: "Team Cryptonite",
      title: "niteCTF 2025",
      dateRange: "Dec 2025",
      bullets: [
        "https://play.nitectf25.live"
        //   "Reduced API response times by 40% through optimization",
        //   "Mentored team of 5 junior developers",
      ]
    }
    //   {
    //     company: "Startup Inc",
    //     title: "Full Stack Developer",
    //     dateRange: "Jun 2020 - Dec 2021",
    //     bullets: [
    //       "Built and launched MVP product from scratch using React and Node.js",
    //       "Implemented CI/CD pipeline reducing deployment time by 60%",
    //       "Collaborated with product team to define technical requirements",
    //     ],
    //   },
    //   {
    //     company: "Digital Agency",
    //     title: "Frontend Developer",
    //     dateRange: "Aug 2018 - May 2020",
    //     bullets: [
    //       "Developed responsive web applications for 20+ clients",
    //       "Improved site performance scores by 35% on average",
    //       "Introduced modern JavaScript frameworks to legacy codebases",
    //     ],
    //   },
  ],
  education: [
    // {
    //     school: "University Name",
    //     degree: "Bachelor of Science in Computer Science",
    //     dateRange: "2014 - 2018",
    //     achievements: [
    //       "Graduated Magna Cum Laude with 3.8 GPA",
    //       "Dean's List all semesters",
    //       "President of Computer Science Club",
    //     ],
    //   },
    //   {
    //     school: "Online Platform",
    //     degree: "Full Stack Development Certificate",
    //     dateRange: "2019",
    //     achievements: [
    //       "Completed 500+ hours of coursework",
    //       "Built 10+ portfolio projects",
    //       "Specialized in React and Node.js",
    //     ],
    // },
  ]
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$GlobalSearch = createComponent(async ($$result, $$props, $$slots) => {
  const posts = (await getCollection("posts")).filter((p) => !p.data.draft);
  const writeups = (await getCollection("writeups")).filter((w) => !w.data.draft);
  const reviews = (await getCollection("reviews")).filter((r) => !r.data.draft);
  const getSlug = (id) => id.replace(/\.md$/, "");
  const searchIndex = [
    ...posts.map((post) => ({
      type: "post",
      title: post.data.title,
      description: post.data.description || "",
      tags: post.data.tags || [],
      url: `/cyberportfolio/blog/${getSlug(post.id)}/`,
      date: post.data.pubDate
    })),
    ...writeups.map((writeup) => ({
      type: "writeup",
      title: writeup.data.title,
      description: writeup.data.description || "",
      tags: writeup.data.tags || [writeup.data.ctfName],
      url: `/cyberportfolio/ctf-writeups/${getSlug(writeup.id)}/`,
      date: writeup.data.pubDate
    })),
    ...reviews.map((review) => ({
      type: "review",
      title: review.data.title,
      description: review.data.description || "",
      tags: review.data.tags || [],
      category: review.data.category,
      moduleCode: review.data.moduleCode || "",
      url: `/cyberportfolio/reviews/${getSlug(review.id)}/`,
      date: review.data.pubDate
    }))
  ];
  return renderTemplate(_a || (_a = __template(["", '<div class="mb-8 relative"> <form id="searchForm" class="w-full"> <input type="text" id="globalSearch" name="q" placeholder="Search posts, writeups, reviews, tags..." class="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2" style="border: 1px solid var(--border-primary); background-color: var(--bg-secondary-translucent); color: var(--text-primary); backdrop-filter: blur(8px);"> </form> <div id="searchResults" class="mt-2 hidden absolute rounded-lg shadow-lg w-full z-50 max-h-96 overflow-y-auto" style="background-color: var(--bg-secondary); border: 1px solid var(--border-primary);"></div> </div> <script>(function(){', "\n  const searchInput = document.getElementById('globalSearch');\n  const searchForm = document.getElementById('searchForm');\n  const resultsContainer = document.getElementById('searchResults');\n\n  // HTML escape function to prevent XSS\n  function escapeHtml(text) {\n    const div = document.createElement('div');\n    div.textContent = text;\n    return div.innerHTML;\n  }\n\n  // Handle form submission (Enter key)\n  searchForm.addEventListener('submit', (e) => {\n    e.preventDefault();\n    const query = searchInput.value.trim();\n    if (query) {\n      window.location.href = `/cyberportfolio/search?q=${encodeURIComponent(query)}`;\n    }\n  });\n\n  searchInput.addEventListener('input', (e) => {\n    const query = e.target.value.toLowerCase().trim();\n\n    if (query.length === 0) {\n      resultsContainer.classList.add('hidden');\n      return;\n    }\n\n    const results = searchIndex.filter(item => {\n      const titleMatch = item.title.toLowerCase().includes(query);\n      const descriptionMatch = item.description.toLowerCase().includes(query);\n      const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(query));\n\n      return titleMatch || descriptionMatch || tagsMatch;\n    });\n\n    if (results.length === 0) {\n      resultsContainer.textContent = 'No results found. Press Enter to see all results.';\n      resultsContainer.className = 'mt-2 absolute rounded-lg shadow-lg w-full z-50 max-h-96 overflow-y-auto p-4';\n      resultsContainer.style.cssText = 'background-color: var(--bg-secondary); border: 1px solid var(--border-primary); color: var(--text-secondary);';\n      return;\n    }\n\n    // Clear and build results using DOM methods instead of innerHTML\n    resultsContainer.innerHTML = '';\n    resultsContainer.className = 'mt-2 absolute rounded-lg shadow-lg w-full z-50 max-h-96 overflow-y-auto';\n    resultsContainer.style.cssText = 'background-color: var(--bg-secondary); border: 1px solid var(--border-primary);';\n\n    results.slice(0, 8).forEach(item => {\n      const link = document.createElement('a');\n      link.href = item.url;\n      link.className = 'block p-4 transition-colors';\n      link.style.cssText = 'border-bottom: 1px solid var(--border-primary);';\n      link.onmouseover = () => link.style.backgroundColor = 'var(--accent-light)';\n      link.onmouseout = () => link.style.backgroundColor = 'transparent';\n\n      const header = document.createElement('div');\n      header.className = 'flex items-center justify-between';\n      \n      const typeSpan = document.createElement('span');\n      typeSpan.className = 'text-xs font-semibold uppercase';\n      typeSpan.style.cssText = 'color: var(--accent-color);';\n      typeSpan.textContent = item.type;\n      header.appendChild(typeSpan);\n\n      if (item.date) {\n        const dateSpan = document.createElement('span');\n        dateSpan.className = 'text-xs';\n        dateSpan.style.cssText = 'color: var(--text-secondary);';\n        dateSpan.textContent = new Date(item.date).toLocaleDateString();\n        header.appendChild(dateSpan);\n      }\n\n      const title = document.createElement('h3');\n      title.className = 'font-semibold mt-1';\n      title.style.cssText = 'color: var(--text-primary);';\n      title.textContent = item.title;\n\n      link.appendChild(header);\n      link.appendChild(title);\n\n      if (item.description) {\n        const desc = document.createElement('p');\n        desc.className = 'text-sm mt-1';\n        desc.style.cssText = 'color: var(--text-secondary);';\n        desc.textContent = item.description.substring(0, 100) + '...';\n        link.appendChild(desc);\n      }\n\n      if (item.tags.length > 0) {\n        const tagsDiv = document.createElement('div');\n        tagsDiv.className = 'flex gap-2 mt-2 flex-wrap';\n        item.tags.slice(0, 3).forEach(tag => {\n          const tagSpan = document.createElement('span');\n          tagSpan.className = 'text-xs px-2 py-1 rounded';\n          tagSpan.style.cssText = 'background-color: var(--accent-light); color: var(--text-primary);';\n          tagSpan.textContent = tag;\n          tagsDiv.appendChild(tagSpan);\n        });\n        link.appendChild(tagsDiv);\n      }\n\n      resultsContainer.appendChild(link);\n    });\n\n    // Add footer\n    const footer = document.createElement('div');\n    footer.className = 'p-2 text-center text-xs';\n    footer.style.cssText = 'color: var(--text-secondary); border-top: 1px solid var(--border-primary);';\n    footer.textContent = 'Press Enter to see all results';\n    resultsContainer.appendChild(footer);\n\n    resultsContainer.classList.remove('hidden');\n  });\n\n  // Close results when clicking outside\n  document.addEventListener('click', (e) => {\n    if (!e.target.closest('#globalSearch') && !e.target.closest('#searchResults')) {\n      resultsContainer.classList.add('hidden');\n    }\n  });\n})();<\/script>"], ["", '<div class="mb-8 relative"> <form id="searchForm" class="w-full"> <input type="text" id="globalSearch" name="q" placeholder="Search posts, writeups, reviews, tags..." class="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2" style="border: 1px solid var(--border-primary); background-color: var(--bg-secondary-translucent); color: var(--text-primary); backdrop-filter: blur(8px);"> </form> <div id="searchResults" class="mt-2 hidden absolute rounded-lg shadow-lg w-full z-50 max-h-96 overflow-y-auto" style="background-color: var(--bg-secondary); border: 1px solid var(--border-primary);"></div> </div> <script>(function(){', "\n  const searchInput = document.getElementById('globalSearch');\n  const searchForm = document.getElementById('searchForm');\n  const resultsContainer = document.getElementById('searchResults');\n\n  // HTML escape function to prevent XSS\n  function escapeHtml(text) {\n    const div = document.createElement('div');\n    div.textContent = text;\n    return div.innerHTML;\n  }\n\n  // Handle form submission (Enter key)\n  searchForm.addEventListener('submit', (e) => {\n    e.preventDefault();\n    const query = searchInput.value.trim();\n    if (query) {\n      window.location.href = \\`/cyberportfolio/search?q=\\${encodeURIComponent(query)}\\`;\n    }\n  });\n\n  searchInput.addEventListener('input', (e) => {\n    const query = e.target.value.toLowerCase().trim();\n\n    if (query.length === 0) {\n      resultsContainer.classList.add('hidden');\n      return;\n    }\n\n    const results = searchIndex.filter(item => {\n      const titleMatch = item.title.toLowerCase().includes(query);\n      const descriptionMatch = item.description.toLowerCase().includes(query);\n      const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(query));\n\n      return titleMatch || descriptionMatch || tagsMatch;\n    });\n\n    if (results.length === 0) {\n      resultsContainer.textContent = 'No results found. Press Enter to see all results.';\n      resultsContainer.className = 'mt-2 absolute rounded-lg shadow-lg w-full z-50 max-h-96 overflow-y-auto p-4';\n      resultsContainer.style.cssText = 'background-color: var(--bg-secondary); border: 1px solid var(--border-primary); color: var(--text-secondary);';\n      return;\n    }\n\n    // Clear and build results using DOM methods instead of innerHTML\n    resultsContainer.innerHTML = '';\n    resultsContainer.className = 'mt-2 absolute rounded-lg shadow-lg w-full z-50 max-h-96 overflow-y-auto';\n    resultsContainer.style.cssText = 'background-color: var(--bg-secondary); border: 1px solid var(--border-primary);';\n\n    results.slice(0, 8).forEach(item => {\n      const link = document.createElement('a');\n      link.href = item.url;\n      link.className = 'block p-4 transition-colors';\n      link.style.cssText = 'border-bottom: 1px solid var(--border-primary);';\n      link.onmouseover = () => link.style.backgroundColor = 'var(--accent-light)';\n      link.onmouseout = () => link.style.backgroundColor = 'transparent';\n\n      const header = document.createElement('div');\n      header.className = 'flex items-center justify-between';\n      \n      const typeSpan = document.createElement('span');\n      typeSpan.className = 'text-xs font-semibold uppercase';\n      typeSpan.style.cssText = 'color: var(--accent-color);';\n      typeSpan.textContent = item.type;\n      header.appendChild(typeSpan);\n\n      if (item.date) {\n        const dateSpan = document.createElement('span');\n        dateSpan.className = 'text-xs';\n        dateSpan.style.cssText = 'color: var(--text-secondary);';\n        dateSpan.textContent = new Date(item.date).toLocaleDateString();\n        header.appendChild(dateSpan);\n      }\n\n      const title = document.createElement('h3');\n      title.className = 'font-semibold mt-1';\n      title.style.cssText = 'color: var(--text-primary);';\n      title.textContent = item.title;\n\n      link.appendChild(header);\n      link.appendChild(title);\n\n      if (item.description) {\n        const desc = document.createElement('p');\n        desc.className = 'text-sm mt-1';\n        desc.style.cssText = 'color: var(--text-secondary);';\n        desc.textContent = item.description.substring(0, 100) + '...';\n        link.appendChild(desc);\n      }\n\n      if (item.tags.length > 0) {\n        const tagsDiv = document.createElement('div');\n        tagsDiv.className = 'flex gap-2 mt-2 flex-wrap';\n        item.tags.slice(0, 3).forEach(tag => {\n          const tagSpan = document.createElement('span');\n          tagSpan.className = 'text-xs px-2 py-1 rounded';\n          tagSpan.style.cssText = 'background-color: var(--accent-light); color: var(--text-primary);';\n          tagSpan.textContent = tag;\n          tagsDiv.appendChild(tagSpan);\n        });\n        link.appendChild(tagsDiv);\n      }\n\n      resultsContainer.appendChild(link);\n    });\n\n    // Add footer\n    const footer = document.createElement('div');\n    footer.className = 'p-2 text-center text-xs';\n    footer.style.cssText = 'color: var(--text-secondary); border-top: 1px solid var(--border-primary);';\n    footer.textContent = 'Press Enter to see all results';\n    resultsContainer.appendChild(footer);\n\n    resultsContainer.classList.remove('hidden');\n  });\n\n  // Close results when clicking outside\n  document.addEventListener('click', (e) => {\n    if (!e.target.closest('#globalSearch') && !e.target.closest('#searchResults')) {\n      resultsContainer.classList.add('hidden');\n    }\n  });\n})();<\/script>"])), maybeRenderHead(), defineScriptVars({ searchIndex }));
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/GlobalSearch.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const hasProjects = siteConfig.projects && siteConfig.projects.length > 0;
  const hasExperience = siteConfig.experience && siteConfig.experience.length > 0;
  const hasEducation = siteConfig.education && siteConfig.education.length > 0;
  return renderTemplate`${maybeRenderHead()}<header id="header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm" style="background-color: var(--bg-secondary-translucent)" data-astro-cid-3ef6ksr2> <nav class="max-w-7xl mx-auto px-4 py-3 md:px-6 md:py-4" data-astro-cid-3ef6ksr2> <ul class="flex items-center gap-3 md:gap-8 justify-center text-xs md:text-base flex-wrap" data-astro-cid-3ef6ksr2> <li data-astro-cid-3ef6ksr2><a href="/cyberportfolio" class="font-medium text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors" data-astro-cid-3ef6ksr2>Home</a></li> ${hasExperience && renderTemplate`<li data-astro-cid-3ef6ksr2><a href="/cyberportfolio/ctf-writeups" class="font-medium text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors" data-astro-cid-3ef6ksr2>CTFs</a></li>`} <li data-astro-cid-3ef6ksr2><a href="/cyberportfolio/blog" class="font-medium text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors" data-astro-cid-3ef6ksr2>Blog</a></li> ${hasProjects && renderTemplate`<li data-astro-cid-3ef6ksr2><a href="/cyberportfolio/#projects" class="font-medium text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors" data-astro-cid-3ef6ksr2>Projects</a></li>`} <li data-astro-cid-3ef6ksr2><a href="/cyberportfolio/#about" class="font-medium text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors" data-astro-cid-3ef6ksr2>About</a></li> ${hasEducation && renderTemplate`<li data-astro-cid-3ef6ksr2><a href="/cyberportfolio/#education" class="font-medium text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors" data-astro-cid-3ef6ksr2>Education</a></li>`} <li data-astro-cid-3ef6ksr2><a href="/cyberportfolio/reviews" class="font-medium text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors" data-astro-cid-3ef6ksr2>Reviews</a></li> </ul> </nav> <section class="max-w-4xl mx-auto px-4 py-1 md:py-3" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "GlobalSearch", $$GlobalSearch, { "data-astro-cid-3ef6ksr2": true })} </section> </header> ${renderScript($$result, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const hasProjects = siteConfig.projects && siteConfig.projects.length > 0;
  const hasExperience = siteConfig.experience && siteConfig.experience.length > 0;
  siteConfig.education && siteConfig.education.length > 0;
  return renderTemplate`${maybeRenderHead()}<footer class="relative border-t" style="background-color: var(--bg-secondary); border-color: var(--border-primary)"> <div class="mx-auto max-w-6xl px-6 py-12 lg:px-8"> <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-8"> <div class="flex flex-col gap-4"> <h3 class="text-2xl font-bold text-[var(--text-primary)]"> ${siteConfig.name} </h3> <p class="text-base text-[var(--text-secondary)]"> ${siteConfig.title} </p> <div class="flex gap-x-6"> <a${addAttribute(`mailto:${siteConfig.social.email}`, "href")} aria-label="Email" class="transition-colors duration-300 text-[var(--text-secondary)] hover:text-[var(--accent-color)]"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path> <path d="M3 7l9 6l9 -6"></path> </svg> </a> <a${addAttribute(siteConfig.social.linkedin, "href")} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="transition-colors duration-300 text-[var(--text-secondary)] hover:text-[var(--accent-color)]"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M8 11v5"></path><path d="M8 8v.01"></path><path d="M12 16v-5"></path> <path d="M16 16v-3a2 2 0 1 0 -4 0"></path> <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"></path> </svg> </a> <a${addAttribute(siteConfig.social.twitter, "href")} target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="transition-colors duration-300 text-[var(--text-secondary)] hover:text-[var(--accent-color)]"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path> <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path> </svg> </a> <a${addAttribute(siteConfig.social.github, "href")} target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="transition-colors duration-300 text-[var(--text-secondary)] hover:text-[var(--accent-color)]"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path> </svg> </a> </div> </div> <div class="hidden md:block flex flex-col md:items-end gap-4"> <nav class="flex gap-x-8"> <a href="/cyberportfolio/#about" class="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">About</a> <a href="/cyberportfolio/blog" class="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Blog</a> ${hasExperience && renderTemplate`<a href="/cyberportfolio/ctf-writeups" class="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">CTFs</a>`} ${hasProjects && renderTemplate`<a href="/cyberportfolio/#projects" class="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Projects</a>`} <a href="/cyberportfolio/reviews" class="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Reviews</a> </nav> <p class="text-sm text-[var(--text-secondary)]">
© ${(/* @__PURE__ */ new Date()).getFullYear()} ${siteConfig.name}. All rights reserved.
</p> </div> </div> </div> <div class="absolute inset-0 -z-10 overflow-hidden text-[var(--border-primary)] opacity-20"> <svg aria-hidden="true" class="absolute bottom-0 left-0 w-full h-24"> <pattern id="footer-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"> <path d="M0 50 Q 25 40, 50 50 T 100 50" stroke="currentColor" stroke-width="0.5" fill="none"></path> </pattern> <rect width="100%" height="100%" fill="url(#footer-pattern)"></rect> </svg> </div> </footer>`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/Footer.astro", void 0);

const $$ThemeProvider = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ThemeProvider;
  const { themeName = "cyberpunk" } = Astro2.props;
  const theme = themes[themeName] ?? themes.cyberpunk;
  const { colors } = theme;
  const hex = colors.background.secondary.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const bgSecondaryTranslucent = `rgba(${r}, ${g}, ${b}, 0.75)`;
  const cssVariables = `
  :root {
    --accent-color: ${colors.accent};
    --accent-light: ${colors.accentLight};
    --accent-dark: ${colors.accentDark};
    --accent-link: ${colors.accentLink};
    --accent-number: ${colors.accentNumber};
    --bg-primary: ${colors.background.primary};
    --bg-secondary: ${colors.background.secondary};
    --bg-secondary-translucent: ${bgSecondaryTranslucent};
    --bg-code: ${colors.background.code};
    --bg-code-border: ${colors.background.codeBorder};
    --text-primary: ${colors.text.primary};
    --text-secondary: ${colors.text.secondary};
    --text-code: ${colors.text.code};
    --border-primary: ${colors.borders.primary};
    --border-code: ${colors.borders.code};
  }
`;
  return renderTemplate`<style is:global>${unescapeHTML(cssVariables)}</style>${renderSlot($$result, $$slots["default"])}`;
}, "/Users/maejikal/Documents/GitHub/cyberportfolio/src/components/ThemeProvider.astro", void 0);

export { $$Footer as $, DEFAULT_HASH_PROPS as D, VALID_SUPPORTED_FORMATS as V, $$Header as a, $$ThemeProvider as b, DEFAULT_OUTPUT_FORMAT as c, createComponent as d, renderScript as e, getCollection as g, renderEntry as r, siteConfig as s };
