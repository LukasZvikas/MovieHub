<template>
  <div style=" height: 100vh; z-index: 2;">
    <MovieList :movies="popularMovies" :title="'Popular Movies'" :caroID="'carousel-1'"/>
    <MovieList :movies="comingSoon" :title="'Coming Soon'" :caroID="'carousel-2'"/>
  </div>
</template>

<script>
import MovieList from "./MovieList";
import { keys } from "../../keys";
export default {
  components: {
    MovieList
  },
  data: function() {
    return {
      popularMovies: {},
      comingSoon: {}
    };
  },
  created() {
    this.getPopularMovies("popular");
    this.getPopularMovies("upcoming");
  },
  methods: {
    getPopularMovies: function(listType) {
      const url = new URL(`https://api.themoviedb.org/3/movie/${listType}`);

      const params = {
        api_key: keys.TMDB_API_KEY,
        sort_by: "popularity.desc",
        region: "US"
      };
      url.search = new URLSearchParams(params);

      fetch(url, {
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          res.json().then(res => {
            console.log("REs", res);
            console.log(listType);
            switch (listType) {
              case "popular":
                this.popularMovies = res.results;
                break;
              case "upcoming":
                this.comingSoon = res.results;
                break;
            }
          });
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
