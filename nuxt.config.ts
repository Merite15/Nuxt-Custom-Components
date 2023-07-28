// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    imports: {
        dirs: ["stores", "constants", "utils/**"],
    },
    modules: [
        'nuxt-icon',
        [
            "@nuxtjs/tailwindcss",
            {
                cssPath: "~/assets/css/tailwind.css",
                configPath: "tailwind.config",
                exposeConfig: true,
                injectPosition: 0,
                viewer: true,
            },
        ],
        [
            "@pinia/nuxt",
            {
                autoImports: [
                    "defineStore",
                    ["defineStore", "definePiniaStore"],
                ],
            },
        ],
    ],
})
