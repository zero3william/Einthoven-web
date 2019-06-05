const webpack = require('webpack')
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
      href: "//at.alicdn.com/t/font_1121520_ub6gdletrmk.css"
    }, {
      rel: "stylesheet",
      type: "text/css",
      href: "https://fonts.googleapis.com/css?family=Italianno"
    }]
  },
  loading: {
    color: "#87CCC2"
  },
  css: ["@/assets/global.scss", "normalize.css", "animate.css"],
  plugins: ["@/plugins/element-ui", '@/plugins/anime', {
    src: '@/plugins/pixi',
    ssr: false
  }, "@/plugins/i18n", "@/plugins/axios", "@/plugins/croppa"],
  modules: [
    "@nuxtjs/axios"
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  build: {
    transpile: [/^element-ui/],
    plugins: [
      new webpack.ProvidePlugin({
        'EXIF': 'exif-js'
      })
    ],
    extend(config, ctx) {}
  }
};
