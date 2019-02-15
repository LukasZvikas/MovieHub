<template>
  <div data-test="user-movie-list-item">
    <div
      class="user-movie-list-item-title font-weight-bold"
      data-test="watchlist-list-item-title"
    >{{title}}</div>
    <user-score :vote_average="vote_average"/>
    <button class="btn btn-secondary" data-test="watchlist-list-item-button">Show more</button>
  </div>
</template>

<script>
import UserScore from "../reusable/UserScore";
export default {
  components: {
    UserScore
  },
  props: {
    title: String,
    vote_average: Number,
    release_date: String
  }
};
</script>

<style lang="scss">
.user-movie-list-item-title {
  font-size: 1.4rem;
  color: $white;
}
</style>
