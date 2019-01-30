<template>
  <div
    data-test="movie-overview-cast-list-item"
    class="movie-overview-cast-image-wrapper h-100 m-1"
  >
    <img
    data-test="movie-overview-cast-list-item-img"
      class="card-img-top img-fluid movie-overview-cast-image"
      :src="getPosterPath(profile_path)"
    >

    <div class="card-title font-weight-bolder">
      <div data-test="movie-overview-cast-list-item-name">{{name}}</div>
      <div data-test="movie-overview-cast-list-item-char-name" class="font-weight-normal">{{character}}</div>
    </div>
  </div>
</template>

<script>
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
export default {
  props: { profile_path: String, name: String, character: String },
  methods: {
    getPosterPath(path) {
      return generatePosterPath(path);
    }
  }
};
</script>

<style>
.movie-overview-cast-image-wrapper {
  position: relative;
  height: 15rem;
  width: 11rem;
}
.movie-overview-cast-image {
  object-fit: cover;
  height: 13rem;
  width: 11rem;
}
.card-title {
  background-color: whitesmoke;
  text-align: center;
  height: 5rem;
}
</style>
