<template>
  <div class="row">
    <div
      class="col-sm-6 grow d-flex flex-column p-1"
      v-for="(movie, index) in movies"
      :key="index"
      @click="showMovieDetails(movie.id)"
      data-test="favorites-list-item-wrapper"
    >
      <div class="release-date">
        <span class="release-date__heading">Release Date:</span>
        <span class="release-date__date">{{determineIfReleased(movie.release_date)}}</span>
      </div>
      <div
        class="favorites__list-item card w-100 justify-content-start align-items-start p-2"
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
import { months } from "../../utilities/months";
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
export default {
  components: {
    WatchListItem
  },
  props: {
    movies: Array
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
    determineIfReleased(release_date) {
      const dateToday = new Date();
      const releaseDate = new Date(release_date);

      if (dateToday.getDate() > releaseDate) {
        return "released!";
      } else {
        const month = release_date.slice(6, 7);
        const day = release_date.slice(8, 10);
        const year = release_date.slice(0, 4);
        return ` ${months(parseInt(month)).slice(0, 3)} ${day} ${year}`;
      }
    }
  }
};
</script>

<style lang="scss">
.favorites__list-item {
  height: 20rem;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary;
}
.release-date {
  color: $white;
  font-size: 1.4rem;
  font-family: inherit;
  padding: 0.8rem 2rem;
  background-color: rgba(46, 49, 49, 1)
}
.release-date__heading {
  font-size: 1.4rem;
}

.release-date__date {
  font-weight: "bold";
}
</style>
