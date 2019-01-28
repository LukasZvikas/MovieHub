<template>
  <div class="movie-overview h-100">
    <MovieDescription :movie_details="movie_details"/>
    <CastList :cast="cast"/>
  </div>
</template>

<script>
import MovieDescription from "./MovieDescription";
import CastList from "./CastList";
import { fetchMovieDetails } from "../../utilities/fetch";
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
import { keys } from "../../keys";
import { setTimeout } from "timers";

export default {
  components: {
    MovieDescription,
    CastList
  },
  data() {
    return {
      cast: [],
      movie_details: {}
    };
  },
  created() {
    this.fetchMovieDetails();
    this.fetchMovieCredits();
  },

  methods: {
    async getDetails(movieId) {
      this.movie_details = await fetchMovieDetails(movieId);
    },
    getPosterPath(path) {
      return generatePosterPath(path);
    },
    getIdFromUrl() {
      const path = window.location.pathname.split("/");
      return path[path.length - 1];
    },
    fetchMovieDetails() {
      const movie_id = this.getIdFromUrl();

      const url = new URL(`https://api.themoviedb.org/3/movie/${movie_id}`);

      const params = {
        api_key: keys.TMDB_API_KEY
      };
      url.search = new URLSearchParams(params);

      fetch(url)
        .then(res =>
          res.json().then(res => {
            this.movie_details = res;
          })
        )
        .catch(err => {
          console.log("err", err);
        });
    },

    fetchMovieCredits() {
      const movie_id = this.getIdFromUrl();

      const url = new URL(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits`
      );

      const params = {
        api_key: keys.TMDB_API_KEY
      };
      url.search = new URLSearchParams(params);

      fetch(url)
        .then(res =>
          res.json().then(res => {
            this.cast = res.cast.slice(0, 4);
            console.log("res", res);
          })
        )
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>

<style lang="scss">
.movie-overview {
  background-color: $primary;
}

.flex-fill {
  flex: 1;
}
</style>
