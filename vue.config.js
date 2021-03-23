const path = require('path')
const webpack = require('webpack')

const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src', 'components'),
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
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new PrerenderSpaPlugin({
        // Absolute path to compiled SPA
        staticDir: path.resolve(__dirname, './dist'),
        // List of routes to prerender
        routes: [ '/', '/blog', '/project' ],
        // Options
        renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
          renderAfterTime: 5000
        })
      }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            minSize: 10000,
            maxSize: 200000,
          }
        }
      }
    },
  },
  pwa: {
    name: 'My App',
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
