//Nuxt config page: https://v3.nuxtjs.org/api/configuration/nuxt.config
import fetch from "node-fetch";

export default defineNuxtConfig({
  // App configuration: https://v3.nuxtjs.org/api/configuration/nuxt.config#app
  app: {
    // Global page headers: https://v3.nuxtjs.org/api/configuration/nuxt.config#head
    head: {
      title: "nuxtjs-v3-ssr-minimal",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // Passing .env configuration: https://v3.nuxtjs.org/api/configuration/nuxt.config#publicruntimeconfig
  runtimeConfig: {
    public: {
      MGNL_HOST: process.env.MGNL_HOST,
      MGNL_API_PAGES: process.env.MGNL_API_PAGES,
      MGNL_API_TEMPLATES: process.env.MGNL_API_TEMPLATES,
      NUXT_APP_MGNL_SITE_PATH: process.env.NUXT_APP_MGNL_SITE_PATH,
      NUXT_APP_MGNL_LANGUAGES: process.env.NUXT_APP_MGNL_LANGUAGES,
    },
  },

  // Global CSS: https://v3.nuxtjs.org/api/configuration/nuxt.config#css
  css: ["~/assets/css/main.css"],

  // Transpiling libraries: https://v3.nuxtjs.org/guide/going-further/esm#transpiling-libraries
  build: {
    transpile: ["@magnolia/vue-editor", "@magnolia/template-annotations"],
  },

  alias: {
    "@magnolia/vue-editor": "@magnolia/vue-editor/src/main.js",
    "@magnolia/template-annotations":
      "@magnolia/template-annotations/src/index.js",
  },

  // Set nuxt to generate static files
  target: "static",

  // Fetch all paths and generate pages (needed for SSG option: npm run generate)
  hooks: {
    async "nitro:config"(nitroConfig) {
      if (nitroConfig.dev) {
        return;
      }
      const results = await fetch(process.env.MGNL_API_PAGES)
        .then((res) => res.json())
        .then((res) => {
          return res?.results.map((node) => {
            if (node["mgnl:template"].startsWith("nuxtjs-v3-ssr-minimal-lm")) {
              return node["@path"];
            }
          });
        })
        .then((path) => path.filter((element) => element !== undefined));
      results.forEach((element) => nitroConfig.prerender.routes.push(element));
    },
  },
});
