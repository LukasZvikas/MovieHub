module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/auth/*": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/main.scss";
        `
      }
    }
  }
};
