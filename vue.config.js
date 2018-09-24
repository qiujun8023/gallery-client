module.exports = {
  assetsDir: 'static',
  devServer: {
    allowedHosts: [
      'develop.lc',
      'localhost'
    ],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000'
      }
    }
  }
}
