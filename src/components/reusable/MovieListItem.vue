<template>
  <div
    class="movie-item-box d-flex justify-content-center align-items-center flex-column"
    @click="showMovieDetails(movie.id)"
    data-test="movie-item-search-result-item"
  >
    <template v-if="getPosterPath(movie.poster_path)">
      <img
        class="img-fluid img-cover"
        :src="getPosterPath(movie.poster_path)"
        data-test="movie-item-search-box-image"
      >
    </template>
    <template v-else>
      <image-icon/>
      <div>Image was not found</div>
    </template>
    <div class="movie-item-box-title" data-test="movie-item-search-box-title">{{movie.title}}</div>
  </div>
</template>

<script>
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
import ImageIcon from "../svg/ImageIcon";
export default {
  components: {
    ImageIcon
  },
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
