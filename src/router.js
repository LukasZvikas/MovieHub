import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "./components/dashboard/";
import MovieSearch from "./components/movieSearch";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import store from "./store";

Vue.use(VueRouter);

function requireAuth(to, from, next) {
  if (!store.getters.isLoggedIn) {
    next({ path: "/login" });
    return;
  }
  next();
}

export const routes = [
  {
    path: "/",
    component: Dashboard
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/signup",
    component: SignUp
  },
  {
    path: "/search",
    component: MovieSearch
  },
  {
    path: "/watchlist",
    component: () => import("./components/watchList"),
    beforeEnter: requireAuth
  },
  {
    path: "/favorites",
    component: () => import("./components/favorites"),
    beforeEnter: requireAuth
  },
  {
    path: "/movie/:id",
    component: () => import("./components/movieDetails")
  },
  {
    path: "/profile",
    component: () => import("./components/profile"),
    beforeEnter: requireAuth
  },
  { path: "*", component: Dashboard },
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
