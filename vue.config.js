module.exports = {
  devServer: {
    prot: 8080,
    open: true,
    proxy: {
      // 当我们的本地的请求 有/api的时候，就会代理我们的请求地址向另外一个服务器发出请求
      '/api': {
        changeOrigin: true, // 服务器 有验证，看看是不是有人通过代理访问，一定要设置true，要不然如果服务器有开启验证，就访问失败
        target: 'http://ihrm.itheima.net/' // 跨域请求的地址
        // 只有这个值为true的情况下 才表示开启跨域
      }
    }
  }
}
