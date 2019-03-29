<template>
  <div class="col-sm-auto col-md-auto d-flex align-items-center mr-1 mb-sm-0 user-score">
    <h6 class="font-weight-bold mr-1 text-white">
      <div>User</div>
      <div>Score</div>
    </h6>
    <percent-circle :vote_average="vote_average"/>
  </div>
</template>

<script>
import PercentCircle from "./svg/PercentCircle";
export default {
  components: {
    PercentCircle
  },
  props: {
    vote_average: Number
  }
};
</script>

<style>
</style>
