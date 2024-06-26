// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  css: [
    "~/assets/scss/main.scss",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: [
          ["defineStore", "definePiniaStore"], // import { defineStore as definePin
        ],
      },
    ],
  ],
  components: {
    global: true,
    dirs: ["~/components"],
  },
  imports: {
    dirs: [
      // Scan top-level modules
      "composables",
    ],
  },
});
