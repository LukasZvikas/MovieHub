import Vue from "vue";
import App from "./App";
import router from "./router";
import style from "../styles/main.scss";

new Vue({
  el: "#app",
  router,
  render: function(h) {
    return h(App);
  }
});


