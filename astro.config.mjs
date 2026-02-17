// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
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

export default defineConfig({
  site: "https://maejikal.github.io/cyberportfolio/",
  base: '/cyberportfolio/',

  markdown: {
    remarkPlugins: [remarkCallouts],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()]
})