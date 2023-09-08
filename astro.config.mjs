import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import config from "./src/config/config.json";

import vue from "@astrojs/vue";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  integrations: [
    react(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    vue(),
    partytown({
      // Example: Add dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  markdown: {
    remarkPlugins: [],
    shikiConfig: {
      // material-theme-lighter
      // solarized-light
      theme: "material-theme-lighter",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  vite: {
    resolve: {
      alias: {
        "@rive-app/canvas": "./node_modules/@rive-app/canvas/rive.js",
      },
    },
  },
});
