/* eslint-disable */
// v-bind:videos="videos" also valid

<template>
  <div>
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  components: {
    Header
  }
};
</script>


