<template>
  <div class="movie-item-box" @click="showMovieDetails(movie.id)" data-test="movie-item-search">
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
