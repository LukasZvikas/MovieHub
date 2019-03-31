const path = require("path");
process.env.VUE_APP_TMDB_API_KEY = require("../../../config/keys");
module.exports = {
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .tap(options => {
        options.configFile = path.resolve(__dirname, ".eslintrc.js");
        return options;
      });
  },
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
