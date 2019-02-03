import Vue from "vue";
import Vuex from "vuex";

import AuthModule from "./modules/auth";
import FavoritesModule from "./modules/favorites";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AuthModule,
    FavoritesModule
  }
});
