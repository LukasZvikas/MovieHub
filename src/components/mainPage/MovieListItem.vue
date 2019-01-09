
<template>
  <div class="carousel-item">
    <div class="row" style="padding: 0">
      <div v-for="movie in movies" :key="movie.id">
        <div class="col-sm-6 col-md-4">
          <img :src="getPoster(movie.poster_path)">
          <div class="box-title" style="height: 1.6rem">{{movie.title}}</div>
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
      return `http://image.tmdb.org/t/p/w185/${poster_path}`;
    }
  }
};
</script>

<style>
.box-title {
  text-align: center;
  width: 11.56rem;
  color: #fff;
}
.row {
  padding: 0;
}
</style>
