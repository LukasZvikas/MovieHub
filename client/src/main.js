import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import style from "./styles/main.scss";

new Vue({
  el: "#app",
  router,
  store,
  render: function(h) {
    return h(App);
  }
});
