<template>
  <div class="row">
    <div
      class="favorites__list-item card col-sm-6 grow d-flex justify-content-start align-items-start p-2"
      :style="setBackgroundImage(movie.backdrop_path)"
      v-for="(movie, index) in movies"
      :key="index"
      @click="showMovieDetails(movie.id)"
      data-test="favorites-list-item-wrapper"
    >
      <watch-list-item
        :title="movie.title"
        :vote_average="movie.vote_average"
        :release_date="movie.release_date"
      />
    </div>
  </div>
</template>

<script>
import WatchListItem from "./WatchListItem";
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
        "background-image": `linear-gradient(59deg, rgba(25,20,20,0.3), rgba(25, 20, 20, 0.3)), url(${this.getPosterPath(
          path
        )})`,
        "background-repeat": "no repeat",
        "background-position": "center",
        "background-size": "cover"
      };
    },
    showMovieDetails(id) {
      this.$router.push({ path: `/movie/${id}` });
    }
  }
};
</script>

<style lang="scss">
.favorites__list-item {
  height: 18rem;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary;
}
</style>
