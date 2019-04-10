import pkg from "./package";

export default {
  mode: "spa",
  head: {
    title: 'Einthoven',
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }, {
      rel: "stylesheet",
      type: "text/css",
      href: "//at.alicdn.com/t/font_1121520_9y7l3nhqdgj.css"
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#87CCC2"
  },
  css: ["@/assets/global.scss", "normalize.css", "animate.css"],
  plugins: ["@/plugins/element-ui", '@/plugins/anime', {
    src: '@/plugins/pixi',
    ssr: false
  }, "@/plugins/i18n"],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa"
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
