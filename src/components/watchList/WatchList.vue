<template>
  <div class="row">
    <div
      class="col-sm-5 grow d-flex flex-column p-2"
      v-for="(movie, index) in movies"
      :key="index"
      @click="showMovieDetails(movie.id)"
      data-test="watchlist-list-item"
    >
      <div class="release-date d-flex align-items-center">
        <clock :fill="'#f70963'"/>
        <span
          class="release-date__heading"
          data-test="watchlist-list-item-date-heading"
        >Release Date:</span>
        <span
          class="release-date__date"
          data-test="watchlist-list-item-date"
        >{{formatReleaseDate(movie.release_date)}}</span>
      </div>
      <div
        class="user-movie-list-item card w-100 justify-content-start align-items-start p-2"
        :style="setBackgroundImage(movie.backdrop_path)"
      >
        <watch-list-item
          :title="movie.title"
          :vote_average="movie.vote_average"
          :release_date="movie.release_date"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WatchListItem from "./WatchListItem";
import Clock from "../svg/Clock";
import { months } from "../../utilities/months";
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
export default {
  components: {
    WatchListItem,
    Clock
  },
  props: {
    movies: Array,
    months
  },
  methods: {
    getPosterPath(path) {
      return generatePosterPath(path);
    },
    setBackgroundImage(path) {
      return {
        "background-image": `linear-gradient(59deg, rgba(0, 0, 0,0.6), rgba(0, 0, 0, 0.6)), url(${this.getPosterPath(
          path
        )})`,
        "background-repeat": "no repeat",
        "background-position": "center",
        "background-size": "cover"
      };
    },
    showMovieDetails(id) {
      this.$router.push({ path: `/movie/${id}` });
    },

    formatReleaseDate(release_date) {
      const month = parseInt(release_date.slice(6, 7));
      const day = release_date.slice(8, 10);
      const year = release_date.slice(0, 4);

      return `${months(month).slice(0, 3)} ${day} ${year}`;
    }
  }
};
</script>

<style lang="scss">
.user-movie-list-item {
  height: 20rem;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary;
}
.release-date {
  color: $white;
  font-size: 1.2rem;
  font-family: inherit;
  padding: 0.8rem 2rem;
  background-color: $black;
}
.release-date__heading {
  font-size: 1.2rem;
  margin: 0 0.5rem;
}

.release-date__date {
  font-weight: "bold";
}
</style>
