// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      "router-auth",
      "loading-defaults",
      "addressbar-color",
      "notify-defaults"
    ],

    css: ["app.styl"],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v3',
      // "fontawesome-v5", // disable after removing from Github
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      "roboto-font", // optional, you are not bound to it
      "material-icons" // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      // lang: 'de', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        "QLayout",
        "QHeader",
        "QFooter",
        "QDrawer",
        "QPageContainer",
        "QPage",
        "QToolbar",
        "QToolbarTitle",
        "QBtn",
        "QIcon",
        "QList",
        "QExpansionItem",
        "QItem",
        "QItemSection",
        "QItemLabel",
        "QSpace",
        "QSeparator",

        "QTabs",
        "QTab",
        "QRouteTab",

        "QTabPanels",
        "QTabPanel",

        "QInput",
        "QSelect",
        "QCheckbox",
        "QToggle",
        "QRadio",
        "QForm",
        "QSlider",
        "QDate",
        "QOptionGroup",
        "QBtnToggle",

        "QImg",

        "QTable",
        "QTh",
        "QTr",
        "QTd",
        "QMarkupTable",

        "QSpinnerFacebook",
        "QSpinnerDots",
        "QSpinner",

        "QStepper",
        "QStep",
        "QStepperNavigation",

        "QInnerLoading",

        "QCard",
        "QCardSection",
        "QCardActions",

        "QPopupProxy",
        "QPopupEdit",

        "QAvatar",

        "QTree",

        "QBanner",

        "QPageSticky",
        "QDialog",
        "QMenu",
        "QBadge",

        "QScrollArea",

        "QUploader",
        "QRating",
        "QSlideTransition"
      ],

      directives: ["Ripple", "ClosePopup"],

      // Quasar plugins
      plugins: [
        "Notify",
        "Dialog",
        "Loading",

        "AddressbarColor",
        "LocalStorage"
      ]
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      gzip: true,
      // analyze: true, // analyze after build
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /node_modules/,
          options: {
            formatter: require("eslint").CLIEngine.getFormatter("stylish")
          }
        });
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: ["zoomIn", "zoomOut"],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      workboxOptions: { skipWaiting: true }, // only for NON InjectManifest
      manifest: {
        name: "Investment Programming and Monitoring System",
        short_name: "iPMS",
        description: "A Quasar Framework App for iPMS",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#095437",
        icons: [
          {
            src: "statics/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "statics/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "statics/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "statics/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "statics/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'q-pipol'
      }
    }
  };
};
