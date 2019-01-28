<template>
  <div class="movie-overview-cast-image-wrapper h-100 m-1">
    <img
      class="card-img-top img-fluid movie-overview-cast-image"
      :src="getPosterPath(profile_path)"
    >

    <div class="card-title font-weight-bolder">
      {{name}}
      <div class="font-weight-normal">{{character}}</div>
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
  width: 9rem;
}
.movie-overview-cast-image {
  object-fit: cover;
  height: 13rem;
  width: 9rem;
}
.card-title {
  background-color: whitesmoke;
  text-align: center;
  height: 4rem;
}
</style>
