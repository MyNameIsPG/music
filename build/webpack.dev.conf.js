'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const axios = require('axios')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before(app) {
      app.get('/api/getDiscList', function (req, res) {
        const url = 'https://music.163.com/weapi/v3/playlist/detail'
        const headers = {
          'content-type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
          'Referer': 'https://music.163.com',
          'X-Real-IP': '118.88.88.88',
          'Cookie': '_ntes_nnid=e6b01b6fc3dbf05042d899f59160a804,1542001388105; _ntes_nuid=e6b01b6fc3dbf05042d899f59160a804; JSESSIONID-WYYY=fAz6fxI98N7kN2QrHZgJwnhGqVB6Ygz%5C4U5NwCDrgH2%2FCga%2FGmfhNr%2B3c7WzmRk%2Fy%5C%5C8mdF9Q4vqFvxK%2FY6M4cOQUfnYo7VsrzBY0MOTbSGxAJcpiYSxTCpGidR2rGo4MSquT%5CqD12BSrf3EHoY6gBmAuGzlHGBij2UfY3%2ByTJtYDmvt%3A1555555732576; _iuqxldmzr_=32; WM_NI=7P%2F1P4Y2XqsyYKhn%2BX0VBaDwMVTt9jccsVlNVp90MY5WofmWZfJZELKFAAtpSTa7fNwcanSvOIqIIWlhCDyS4J1vkTwvN5i99ko7XA1IbesnpOGe8Wj9C9F%2B6JAvVpMWVnM%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb7c64fb4bebfa9f565aa8e8ea3d84e868f8fabb83987eebcafcf54f8ec97b8cc2af0fea7c3b92af590e1d2d3409bee9892f2739b95a88faa54f48a8e82c77d8f8a9c95bc62a1bdbdb7ef4696b0f7d1d053f789a187f05d9aba86bbc848899a8fa2f77c918cafd8e546b5bdaf8fd27e8d97bfaacc5db0b88da5fc59f896ff97ea60b5aa82d6ec33fbb5a1d8db4bf397ae86f266b4918986bb5daae78ddac521f6968f97d57c8f899a8fd037e2a3; WM_TID=KYa%2F7oz%2BLdVBAUBVRRY4gZBKr6RwBKIw; P_INFO=m18588773304@163.com|1551680963|1|study|00&99|hun&1548402587&cloudmusic#hun&430100#10#0#0|185304&1||18588773304@163.com; NTES_SESS=u3gwXbcNxJMFyPtOaGY2td9DEKbFM804FwmIEXClCs1YsHBnse9N0vWQf4M8118VsSFnPUBqW7OVXAgPv8paLRAd.1VcndVJj4CvFLDjr4f6NRpQ.hbNFqoZ1.hYF.xcMhrQ3_m0pIolRYYiDV55lrICoL5kuzaZXOOXamZqN8g6X17gNNdBa5vHTdsZnxVITHPiGiJg74by8i7ubdNtRSWqi; S_INFO=1551680963|0|3&80##|m18588773304; playerid=11291172; MUSIC_U=80d0cee7d5becd1451eacd70d7aaa199d8bd495a42524c94ee4c5ae30cb0d4e99625857b82918f1874094d7288b41b73af9e62a8590fd08a; __remember_me=true; __csrf=b41bb20703d27394b373cdd5653cb88b'
        }
        axios.post(url, {
          headers: headers,
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
