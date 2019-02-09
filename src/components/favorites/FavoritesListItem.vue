<template>
  <div data-test="favorites-list-item">
    <div
      class="user-movie-list-item-title font-weight-bold text-white"
      data-test="favorites-list-item-title"
    >{{title}}</div>
    <div class="col-sm-auto col-md-auto d-flex align-items-center mr-1 mb-4 mb-sm-0">
      <h6 class="font-weight-bold mr-1 text-white user-score">
        <div>User</div>
        <div>Score</div>
      </h6>
      <percent-circle :vote_average="vote_average"/>
    </div>
  </div>
</template>

<script>
import PercentCircle from "../svg/PercentCircle";
export default {
  components: {
    PercentCircle
  },
  props: {
    title: String,
    vote_average: Number
  }
};
</script>

<style lang="scss">
.user-movie-list-item-title {
  font-size: 1.6rem;
}
</style>
