<template>
  <ul class="nav space-around">
    <div>
      <li class="nav-link title">MovieHub</li>
    </div>
    <div class="nav-link-wrapper">
      <li class="nav-link">Movies</li>
      <li class="nav-link">Login</li>
    </div>
  </ul>
</template>

<script>
import { keys } from "../keys";
import batman from "./batman.png";
export default {
  created() {
    this.getRandomImage();
  },
  data() {
    return {
      poster: ""
    };
  }
};
</script>

<style>
.title {
  font-size: 1.6rem;
}
.nav-link-wrapper {
  display: flex;
}
.space-around {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: white;
  box-shadow: 0px 1px #1db954;
}
</style>
