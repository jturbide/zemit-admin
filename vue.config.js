const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    https: true,
    host: 'localhost',
    port: 8080,
    proxy: {
      '^/api': {
        target: 'https://zemit.local.nuagerie.com/',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
      },
    }
  },
})
