// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://maejikal.github.io",
  base: '/cyberportfolio',
  vite: {
    plugins: [tailwindcss()],
  },
})