import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import { getAuthToken } from "./utilities/localStorage";

Vue.use(VueRouter);

function requireAuth(to, from, next) {
  if (!store.getters.isLoggedIn && !getAuthToken()) {
    next({ path: "/login" });
    return;
  }
  next();
}

export const routes = [
  {
    path: "/",
    component: () => import("./pages/dashboard")
  },
  {
    path: "/login",
    component: () => import("./pages/authentication/Login")
  },
  {
    path: "/signup",
    component: () => import("./pages/authentication/SignUp")
  },
  {
    path: "/search",
    component: () => import("./pages/movieSearch")
  },
  {
    path: "/watchlist",
    component: () => import("./pages/watchList"),
    beforeEnter: requireAuth
  },
  {
    path: "/favorites",
    component: () => import("./pages/favorites"),
    beforeEnter: requireAuth
  },
  {
    path: "/movie/:id",
    component: () => import("./pages/movieDetails")
  },
  {
    path: "/profile",
    component: () => import("./pages/profile"),
    beforeEnter: requireAuth
  },
  { path: "*", component: () => import("./pages/dashboard") }
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
