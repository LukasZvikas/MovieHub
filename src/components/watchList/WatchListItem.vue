<template>
  <div data-test="favorites-list-item">
    <div
      class="favorites__list-item-title font-weight-bold"
      data-test="favorites-list-item-title"
    >{{title}}</div>
    <div class="col-sm-auto col-md-auto d-flex align-items-center mr-1 mb-4 mb-sm-0 score">
      <h6 class="font-weight-bold mr-1 text-white">
        <div>User</div>
        <div>Score</div>
      </h6>
      <percent-circle :vote_average="vote_average"/>
    </div>
    <div class="release-date">
      <div style="font-size: 1.2rem; font-weight: bold">Release Date</div>
      <div>{{determineIfReleased}}</div>
    </div>
  </div>
</template>

<script>
import PercentCircle from "../svg/PercentCircle";
import { months } from "../../utilities/months";
export default {
  components: {
    PercentCircle
  },
  props: {
    title: String,
    vote_average: Number,
    release_date: String
  },
  computed: {
    determineIfReleased() {
      const dateToday = new Date();
      const releaseDate = new Date(this.release_date);

      if (dateToday.getDate() > releaseDate) {
        return "released!";
      } else {
        const month = this.release_date.slice(6, 7);
        const day = this.release_date.slice(8, 10);
        const year = this.release_date.slice(0, 4);
        return `${months(parseInt(month)).slice(0, 3)} ${day} ${year}`;
      }
    }
  }
};
</script>

<style lang="scss">
.release-date {
  color: $white;
  font-size: 1.6rem;
  font-family: inherit;
}
.favorites__list-item-title {
  font-size: 1.6rem;
  color: $white;
}
.score {
  padding: 1rem 0 !important;
}
</style>
