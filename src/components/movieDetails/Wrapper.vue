<template>
  <div>Movie Details</div>
</template>

<script>
import { keys } from "../../keys";
export default {
  created() {
    this.fetchMovieDetails();
  },
  methods: {
    fetchMovieDetails() {
      const movie_id = window.location.search;
      console.log("movie_id", movie_id);
      const url = `https://api.themoviedb.org/3/movie/${movie_id}`;

      const params = {
        api_key: keys.TMDB_API_KEY
      };
    }
  }
};
</script>

<style>
</style>
