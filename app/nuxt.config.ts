export default defineNuxtConfig({
    build: {
        transpile: [
            "graphql",
            "@apollo/client/core",
            "@vue/apollo-composable"
        ],
    },
    modules: [
        "@nuxtjs/apollo",
        "@pinia/nuxt",
    ],
    plugins: [
        '~/plugins/persistedstate.ts'
    ],
    runtimeConfig: {
        graphqlApiEndpoint: "/graphql"
    },
    vite: {
        // Set up vite to hit the WPGraphQL endpoint using a proxy, to avoid CORS issues
        server: {
            proxy: {
                "/graphql": "http://tutorialwp.l0cal",
            }
        }
    },
    // Note: Apollo Configuration is not yet set up to extend NuxtConfig
    // @ts-ignore
    apollo: {
        autoImports: true,
        authType: "Bearer",
        authHeader: "Authorization",
        tokenStorage: "cookie",
        proxyCookies: true,
        clients: {
            default: {
                httpEndpoint: "/graphql",
                httpLinkOptions: {
                    httpOnly: false
                }
            },
        },
        cookieAttributes: {
            maxAge: 60 * 60 * 24
        },
    },
})
