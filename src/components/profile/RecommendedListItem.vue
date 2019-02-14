<template>
  <div
    class="movie-item-box"
    @click="showMovieDetails(movie_data.id)"
    data-test="movie-item-search-result-item"
  >
    <img
      class="img-fluid img-cover"
      :src="getPosterPath(movie_data.poster_path)"
      data-test="movie-item-search-box-image"
    >
    <div class="movie-item-box-title" data-test="movie-item-search-box-title">{{movie_data.title}}</div>
  </div>
</template>

<script>
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
export default {
  props: {
    movie_data: Object
  },
  methods: {
    getPosterPath(path) {
      return generatePosterPath(path);
    },
    showMovieDetails(id) {
      this.$router.push({ path: `/movie/${id}` });
    }
  }
};
</script>

<style>
</style>
