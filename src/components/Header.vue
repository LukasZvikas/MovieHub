<template>
  <ul class="nav">
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
</style>
