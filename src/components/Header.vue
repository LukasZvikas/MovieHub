<template>
  <ul class="nav space-around fixed-top">
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
  data() {
    return {
      poster: ""
    };
  }
};
</script>

<style lang="scss">
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
  box-shadow: 0px 1px #585858;
  z-index: 1;
  background: #001226;
  height: 10%;
  border-bottom: 1px solid #ffc815;
}
.fixed-top {
  top: 1rem;
  right: 1rem;
  left: 1rem;
}
</style>
