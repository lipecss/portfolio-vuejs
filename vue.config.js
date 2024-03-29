const path = require('path')
const webpack = require('webpack')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  runtimeCompiler: true,
  chainWebpack: config => {
    config.module
    .rule("pdf")
    .test(/\.pdf$/)
    .use("file-loader")
    .loader("file-loader");
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src', 'components'),
        '@assets': path.resolve(__dirname, 'src', 'assets'),
        '@css': path.resolve(__dirname, 'src', 'assets', 'css'),
        '@fonts': path.resolve(__dirname, 'src', 'assets', 'fonts'),
        '@helpers': path.resolve(__dirname, 'src', 'helpers'),
        '@i18n': path.resolve(__dirname, 'src', 'i18n'),
        '@icons': path.resolve(__dirname, 'src', 'assets', 'icons'),
        '@img': path.resolve(__dirname, 'src', 'assets', 'img'),
        '@js': path.resolve(__dirname, 'src', 'assets', 'js'),
        '@router': path.resolve(__dirname, 'src', 'router'),
        '@utils': path.resolve(__dirname, 'src', 'utils'),
        '@views': path.resolve(__dirname, 'src', 'views'),
        '@lib': path.resolve(__dirname, 'src', 'lib')
      }
    },
    output: {
      crossOriginLoading: 'anonymous'
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new PrerenderSpaPlugin({
        // Absolute path to compiled SPA
        staticDir: path.resolve(__dirname, './dist'),
        // List of routes to prerender
        routes: [ '/', '/login', '/dashboard' ,'/404' ],
        // Options
        renderer: new Renderer ({
          renderAfterTime: 5000
        })
      }),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        /* other ImageMin configs */
      })
    ]
  },
  pwa: {
    name: 'Felipecss',
    themeColor: '#42b883',
    msTileColor: '#fff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /\.map$/,
        /manifest\.json$/,
        /_redirects$/
      ]
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/scss/main.scss";'
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'pt-BR',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
