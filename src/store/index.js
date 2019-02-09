import Vue from "vue";
import Vuex from "vuex";

import AuthModule from "./modules/auth";
import MovieModule from "./modules/movies";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AuthModule,
    MovieModule
  }
});
