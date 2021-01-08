export default {
  ssr: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Whatsapp-UI',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1 , maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href:
             "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;400;500;600&display=swap" },
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~/assets/css/normalize.css",
    "~/assets/css/transitions.css",
    "~/assets/css/index.scss",
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/filters" },
    { src: "~/plugins/mixins" },
    { src: "~/plugins/lazyload-vue" }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [__dirname +"/assets/css/_mixins.scss", __dirname +"/assets/css/_variables.scss"]
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
