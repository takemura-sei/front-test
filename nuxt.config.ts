// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/test-utils/module"
  ],
  runtimeConfig: {
    yumemibaseUrl: process.env.NUXT_YUMEMI_URL,
    yumemiApiKey: process.env.NUXT_YUMEMI_API_KEY,
  }
});
