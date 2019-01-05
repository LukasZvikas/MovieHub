
<template>
  <div class="card col-sm-auto">
    <div>{{movie.title}}</div>
    <div>
    <img class="img-fluid" :src="getPoster(movie.poster_path)">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Array
  },
  methods: {
    getPoster: function(poster_path) {
      return `http://image.tmdb.org/t/p/w185/${poster_path}`;
    }
  }
};
</script>

</<style>

</style>
