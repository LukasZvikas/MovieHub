
<template>
  <div class="carousel-item">
    <div class="row" style="padding: 0">
      <div v-for="movie in movies" :key="movie.id">
        <div style="
    border: 1px solid yellow;     margin: 1rem; ">
          <img class="img-fluid" :src="getPoster(movie.poster_path)">
          <div class="box-title">{{movie.title}}</div>
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
  width: 11.57rem;
  height: 3rem;
  background: #ededed;
  font-weight: bold;
  color: rgb(0, 18, 38);
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  display: flex;
}
.row {
  padding: 0;
}
</style>
