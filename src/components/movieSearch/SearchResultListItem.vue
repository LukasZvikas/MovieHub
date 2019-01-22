<template>
  <div class="movie-item-box">
    <img class="img-fluid img-cover" :src="getPoster(movie.poster_path)">
    <div class="movie-item-box-title">{{movie.title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  methods: {
    getPoster: function(poster_path) {
      return `http://image.tmdb.org/t/p/original/${poster_path}`;
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
