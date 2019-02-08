<template>
  <div class="movie-overview h-100">
    <movie-description :movie_details="movie_details"/>
    <cast-list :cast="cast"/>
    <trailer-modal :trailer_id="trailer_id"/>
  </div>
</template>

<script>
import MovieDescription from "./MovieDescription";
import TrailerModal from "./TrailerModal";
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
    CastList,
    TrailerModal
  },
  data() {
    return {
      cast: [],
      movie_details: {},
      trailer_id: ""
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

    const favoritesURL = "http://localhost:5000/user/check_if_favorited";

    const watchlistURL = "http://localhost:5000/user/check_if_watchlisted";

    await this.getUsersMovieData(
      "favorites",
      favoritesURL,
      this.addToFavorites
    );

    await this.getUsersMovieData(
      "watchlist",
      watchlistURL,
      this.addToWatchlist
    );

    await this.getVideoTrailerData(this.movie_details.id);
  },

  beforeDestroy() {
    this.removeFromFavorites();
    this.removeFromWatchlist();
  },

  methods: {
    ...mapMutations([
      "addToFavorites",
      "removeFromFavorites",
      "addToWatchlist",
      "removeFromWatchlist"
    ]),
    async getDetails(movieId) {
      this.movie_details = await fetchMovieDetails(movieId);
    },
    async getUsersMovieData(type, url, fn) {
      const token = getAuthToken();
      const movieData = {
        token,
        movie_id: this.movie_details.id,
        type
      };

      const response = await postFetchFactory(url, movieData);
      if (response.data.isFavorited) {
        fn();
      }
    },
    async getVideoTrailerData(movie_id) {
      const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos`;

      const response = await fetchFactory(url);

      this.trailer_id = response.results[0].key;
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