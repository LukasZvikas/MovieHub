<template>
  <PopularMovieList :movies="movies"/>
</template>

<script>
import PopularMovieList from "./PopularMovieList";
import { keys } from "../../keys";
export default {
  components: {
    PopularMovieList
  },
  data: function() {
    return {
      movies: {}
    };
  },
  created() {
    this.getPopularMovies();
  },
  methods: {
    getPopularMovies: async function() {
      const url = new URL("https://api.themoviedb.org/3/movie/popular");

      const params = {
        api_key: keys.TMDB_API_KEY,
        sort_by: "popularity.desc"
      };
      url.search = new URLSearchParams(params);

      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          res.json().then(res => {
            this.movies = res.results;
          });
        })
        .catch(err => {
          console.log("error", err);
        });

      console.log(response);
    }
  }
};
</script>

<style>
</style>
