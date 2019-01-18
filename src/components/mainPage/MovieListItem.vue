<template>
  <div class="carousel-item">
    <div class="row" style="padding: 0">
      <div v-for="movie in movies" :key="movie.id">
        <div class="movie-item-box">
          <img class="img-fluid" style="height: 100%;" :src="getPoster(movie.poster_path)">
          <div class="movie-item-box-title">{{movie.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movies: {}
  },
  methods: {
    getPoster: function(poster_path) {
      return `http://image.tmdb.org/t/p/w500/${poster_path}`;
    }
  }
};
</script>

<style>
.row {
  padding: 0;
}
</style>
