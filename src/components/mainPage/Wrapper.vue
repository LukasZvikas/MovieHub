<template>
  <PopularMovies/>
</template>

<script>
import PopularMovies from "./PopularMovies";
import { keys } from "../../keys";
export default {
  components: {
    PopularMovies
  },
  created() {
    this.getPopularMovies();
  },
  methods: {
    getPopularMovies: function() {
      const url = new URL("https://api.themoviedb.org/3/movie/popular");

      const params = {
        api_key: keys.TMDB_API_KEY,
        sort_by: "popularity.desc"
      };
      console.log("URL", url);
      url.search = new URLSearchParams(params);

      fetch(url, {
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          console.log("response", res);
        })
        .catch(err => {
          console.log("error", err);
        });
    }
  }
};
</script>

<style>
</style>
