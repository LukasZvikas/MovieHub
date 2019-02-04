import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "./components/dashboard/";
import MovieSearch from "./components/movieSearch";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import store from "./store";

Vue.use(VueRouter);

function ifAuthenticated(to, from, next) {
  if (!store.getters.isLoggedIn) {
    next({ path: "/" });
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
    path: "/coming_soon",
    component: () => import("./components/watchList")
  },
  {
    path: "/favorites",
    component: () => import("./components/favorites")
  },
  {
    path: "/movie/:id",
    component: () => import("./components/movieDetails")
  }
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
