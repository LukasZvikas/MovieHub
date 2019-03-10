<template>
  <div
    class="movie-item-box"
    @click="showMovieDetails(movie.id)"
    data-test="movie-item-search-result-item"
  >
    <img
      class="img-fluid img-cover"
      :src="getPosterPath(movie.poster_path)"
      data-test="movie-item-search-box-image"
    >
    <div class="movie-item-box-title" data-test="movie-item-search-box-title">{{movie.title}}</div>
  </div>
</template>

<script>
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
export default {
  props: {
    movie: Object
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
.img-cover {
  height: 100%;
  object-fit: cover;
  height: 100%;
  width: 100%;
}
</style>
