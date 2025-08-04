// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxt/content", "@unocss/nuxt"],

	css: ["assets/css/main.css"],

	compatibilityDate: "2024-08-17",
});
