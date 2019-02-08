<template>
  <div data-test="favorites-list-item">
    <div
      class="favorites__list-item-title font-weight-bold"
      data-test="watchlist-list-item-title"
    >{{title}}</div>
    <div class="col-sm-auto col-md-auto d-flex align-items-center mr-1 mb-sm-0 user-score">
      <h6 class="font-weight-bold mr-1 text-white">
        <div>User</div>
        <div>Score</div>
      </h6>
      <percent-circle :vote_average="vote_average"/>
    </div>
    <button class="btn btn-secondary" data-test="watchlist-list-item-button">Show more</button>
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
    vote_average: Number,
    release_date: String
  }
};
</script>

<style lang="scss">
.favorites__list-item-title {
  font-size: 1.6rem;
  color: $white;
}
</style>
