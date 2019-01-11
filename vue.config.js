module.exports = {
  devServer: {
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_base.scss";`
      }
    }
  }
};
