// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync, copyFileSync } from 'fs';
import remarkCallouts from './src/lib/remarkCallouts.js';

import sitemap from '@astrojs/sitemap';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Workaround for Astro 5.12.3 content-assets.mjs issue
const astroDir = join(__dirname, 'node_modules/astro/dist/content/.astro');
const contentAssetsPath = join(astroDir, 'content-assets.mjs');

// Create the directory if it doesn't exist
if (!existsSync(astroDir)) {
  mkdirSync(astroDir, { recursive: true });
}

// Create a stub content-assets.mjs if it doesn't exist
if (!existsSync(contentAssetsPath)) {
  writeFileSync(contentAssetsPath, 'export const getAsset = (id) => id;\nexport default getAsset;');
}

// Workaround for Astro 6 routing bug where `typeof route.prerender === void 0` prevents prerendering static routes
for (const relPath of [
  'node_modules/astro/dist/core/routing/prerender.js',
  'node_modules/astro/dist/core/routing/manifest/prerender.js',
]) {
  const filePath = join(__dirname, relPath);
  if (existsSync(filePath)) {
    const code = readFileSync(filePath, 'utf8');
    if (code.includes('typeof route.prerender === void 0')) {
      writeFileSync(filePath, code.replaceAll('typeof route.prerender === void 0', 'route.prerender === void 0'), 'utf8');
    }
  }
}

// Workaround for Astro 6 + Vite 7 static-build buildApp orchestration
const staticBuildPath = join(__dirname, 'node_modules/astro/dist/core/build/static-build.js');
if (existsSync(staticBuildPath)) {
  const code = readFileSync(staticBuildPath, 'utf8');
  const target = 'internals.extractedChunks = [...ssrChunks, ...prerenderChunks];';
  if (code.includes(target) && !code.includes('await generatePages(opts, internals, prerenderOutputDir);')) {
    const injection = `${target}
        await runManifestInjection(
          opts,
          internals,
          internals.extractedChunks ?? [],
          buildPostHooks
        );
        const prerenderOutputDir = getPrerenderOutputDirectory(settings);
        if (settings.buildOutput === "static") {
          settings.timer.start("Static generate");
          await ssrMoveAssets(opts, internals, prerenderOutputDir);
          await generatePages(opts, internals, prerenderOutputDir);
          await fs.promises.rm(prerenderOutputDir, { recursive: true, force: true });
          settings.timer.end("Static generate");
        } else if (settings.buildOutput === "server") {
          settings.timer.start("Server generate");
          await generatePages(opts, internals, prerenderOutputDir);
          await ssrMoveAssets(opts, internals, prerenderOutputDir);
          await fs.promises.rm(prerenderOutputDir, { recursive: true, force: true });
          settings.timer.end("Server generate");
        }`;
    writeFileSync(staticBuildPath, code.replace(target, injection), 'utf8');
  }
}

// Integration to copy non-markdown post and writeup attachments during static build
function copyAttachments() {
  return {
    name: 'copy-attachments',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const copyNonMd = (srcDir, targetSubdir) => {
          if (!existsSync(srcDir)) return;
          const entries = readdirSync(srcDir, { withFileTypes: true });
          for (const entry of entries) {
            if (entry.isDirectory()) {
              const slug = entry.name;
              const subDir = join(srcDir, slug);
              const files = readdirSync(subDir, { withFileTypes: true });
              for (const f of files) {
                if (!f.isDirectory() && !f.name.endsWith('.md') && !f.name.endsWith('.mdx')) {
                  const targetDir = join(fileURLToPath(dir), targetSubdir, slug);
                  mkdirSync(targetDir, { recursive: true });
                  copyFileSync(join(subDir, f.name), join(targetDir, f.name));
                }
              }
            }
          }
        };
        copyNonMd(join(__dirname, 'src/content/writeups'), 'ctf-writeups');
        copyNonMd(join(__dirname, 'src/content/posts'), 'blog');
      }
    }
  };
}

// Vite plugin to serve co-located attachments in astro dev
function serveAttachmentsDev() {
  return {
    name: 'serve-attachments-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        const writeupMatch = url.match(/^\/cyberportfolio\/ctf-writeups\/([^/]+)\/(.+)$/);
        const postMatch = url.match(/^\/cyberportfolio\/blog\/([^/]+)\/(.+)$/);
        const match = writeupMatch || postMatch;
        if (match) {
          const type = writeupMatch ? 'writeups' : 'posts';
          const [, slug, file] = match;
          const decodedFile = decodeURIComponent(file.split('?')[0]);
          if (!decodedFile.endsWith('.html') && !decodedFile.endsWith('/') && decodedFile.includes('.')) {
            const filePath = join(__dirname, 'src/content', type, slug, decodedFile);
            if (existsSync(filePath)) {
              return res.end(readFileSync(filePath));
            }
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  site: "https://maejikal.github.io/cyberportfolio",
  base: '/cyberportfolio/',

  markdown: {
    remarkPlugins: [remarkCallouts, remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  vite: {
    plugins: [tailwindcss(), serveAttachmentsDev()],
  },

  integrations: [sitemap(), copyAttachments()]
})