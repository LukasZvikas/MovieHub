/* eslint-disable */
// v-bind:videos="videos" also valid

<template>
  <div style="background: #001226; height: 100%; overflow: auto;">
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


