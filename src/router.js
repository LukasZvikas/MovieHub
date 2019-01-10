import Vue from "vue";
import VueRouter from "vue-router";
import Movies from "./components/mainPage/Wrapper";
import Videos from "./components/videos/Wrapper";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/videos",
    component: Videos
  },
  {
    path: "/movies",
    component: Movies
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/signup",
    component: SignUp
  }
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
