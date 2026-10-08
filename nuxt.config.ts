// https://nuxt.com/docs/api/configuration/nuxt-config
import getSiteMeta from "./app/utils/getSiteMeta";

const meta = getSiteMeta();

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  future: { compatibilityVersion: 4 },
  app: {
    head: {
      htmlAttrs: {
        lang: "pt-BR",
      },
      title: "Portifolio felipecss",
      meta: [
        ...meta,
        { charset: "utf-8" },
        {
          name: "keywords",
          content:
            "felipecss, felipe, vuejs, vue, javascript, developer, development, desenvolvedor",
        },
        { property: "og:image:width", content: "540" },
        { property: "og:image:height", content: "570" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ],
    },
  },
  css: [
    "@fontsource/jetbrains-mono/400.css",
    "@fontsource/jetbrains-mono/600.css",
    "@fontsource/jetbrains-mono/700.css",
    "@fontsource/jetbrains-mono/800.css",
    "~/assets/css/main.scss",
    "~/assets/css/arcade.css",
    "~/assets/fonts/roobert.css",
  ],
  imports: {
    dirs: ["stores"],
  },
  plugins: [
    { src: "~/plugins/vue3-toastify.js", mode: "client" },
    { src: "~/plugins/vercel.js", mode: "client" },
  ],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxt/image",
    "@nuxtjs/supabase",
    "@pinia-plugin-persistedstate/nuxt",
    "@pinia/nuxt",
  ],
  site: {
    url: "https://felipecss.com",
    name: "felipecss",
  },
  robots: {
    allow: ["/img"],
    disallow: ["/404", "/login", "/dashboard"],
  },
  sitemap: {
    exclude: ["/login", "/dashboard/**"],
    // slugs de posts e projetos vêm do Mongo
    sources: ["/api/__sitemap__/urls"],
  },
  // o redirecionamento de login é feito pelos middlewares auth/guest
  supabase: {
    redirect: false,
    types: false,
  },
  nitro: {
    plugins: ["~~/server/index.js"],
  },
  runtimeConfig: {
    connectionString: process.env.CONNECTION_STRING,
    public: {
      // usado em og:url e canonical; em produção o padrão é o domínio real
      baseUrl:
        process.env.NUXT_PUBLIC_BASE_URL ||
        (process.env.NODE_ENV === "production"
          ? "https://felipecss.com"
          : "http://localhost:3000"),
      contactEmail:
        process.env.NUXT_PUBLIC_CONTACT_EMAIL || "felipecssdev@gmail.com",
      // chave e cluster do Pusher são públicos por definição (o secret fica só no servidor)
      pusherKey: process.env.PUSHER_APP_KEY,
      pusherCluster: process.env.PUSHER_APP_CLUSTER || "sa1",
    },
  },
});
