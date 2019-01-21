import Vue from "vue";
import VueRouter from "vue-router";
import Movies from "./components/mainPage/Wrapper";
import MovieSearch from "./components/movieSearch/Wrapper";
import Videos from "./components/videos/Wrapper";
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
    path: "/videos",
    component: Videos
  },
  {
    path: "/",
    component: Movies
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
  }
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
