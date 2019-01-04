import Vue from "vue";
import VueRouter from "vue-router";
import Movies from "./components/mainPage/Wrapper";
import Videos from "./components/videos/Wrapper";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/videos",
    component: Videos
  },
  {
    path: "/movies",
    component: Movies
  }
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
