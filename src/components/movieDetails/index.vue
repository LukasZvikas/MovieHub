<template>
  <div class="movie-overview h-100">
    <MovieDescription :movie_details="movie_details"/>
    <CastList :cast="cast"/>
  </div>
</template>

<script>
import MovieDescription from "./MovieDescription";
import CastList from "./CastList";
import fetchFactory from "../../utilities/fetch";
import postFetchFactory from "../../utilities/postFetch";
import { getAuthToken } from "../../utilities/localStorage";
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
import { keys } from "../../keys";
import { mapMutations } from "vuex";

export default {
  components: {
    MovieDescription,
    CastList
  },
  data() {
    return {
      cast: [],
      movie_details: {},
      favoriteFillColor: "#fff"
    };
  },
  async created() {
    const urlId = this.getIdFromUrl();
    const movieDetails = await fetchFactory(
      `https://api.themoviedb.org/3/movie/${urlId}`
    );
    
    this.movie_details = movieDetails;

    const castDetails = await fetchFactory(
      `https://api.themoviedb.org/3/movie/${urlId}/credits`
    );
    this.cast = castDetails.cast.slice(0, 4);

    const isFavorited = await this.CheckIfFavorited();
  },

  beforeDestroy() {
    this.removeFromFavorites();
  },

  methods: {
    ...mapMutations(["addToFavorites", "removeFromFavorites"]),
    async getDetails(movieId) {
      this.movie_details = await fetchMovieDetails(movieId);
    },
    async CheckIfFavorited() {
      const token = getAuthToken();
      const movieData = { token, movie_id: this.movie_details.id };

      const response = await postFetchFactory(
        "http://localhost:5000/user/check_if_favorited",
        movieData
      );
      if (response.data.isFavorited) {
        this.addToFavorites();
      }
    },
    getPosterPath(path) {
      return generatePosterPath(path);
    },
    getIdFromUrl() {
      const path = window.location.pathname.split("/");
      return path[path.length - 1];
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