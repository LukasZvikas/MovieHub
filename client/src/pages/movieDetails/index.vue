<template>
  <div class="movie-overview h-100">
    <template v-if="!movie_details">
      <spinner/>
    </template>
    <template v-else>
      <movie-description :movie_details="movie_details"/>
      <cast-list :cast="cast"/>
      <trailer-modal :trailer_id="trailer_id"/>
    </template>
  </div>
</template>

<script>
import MovieDescription from "./MovieDescription";
import TrailerModal from "./TrailerModal";
import CastList from "./CastList";
import Spinner from "../../components/Spinner";
import fetchFactory from "../../utilities/fetch";
import postFetchFactory from "../../utilities/postFetch";
import { getAuthToken } from "../../utilities/localStorage";
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
import { mapMutations } from "vuex";

export default {
  components: {
    MovieDescription,
    CastList,
    TrailerModal,
    Spinner
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
    const movieDetails = await fetchFactory({
      urlPath: `https://api.themoviedb.org/3/movie/${urlId}`,
      toApi: true
    });

    this.movie_details = movieDetails;

    const castDetails = await fetchFactory({
      urlPath: `https://api.themoviedb.org/3/movie/${urlId}/credits`,
      toApi: true
    });
    this.cast = castDetails.cast.slice(0, 4);

    const favoritesURL = "/user/check_if_favorited";

    const watchlistURL = "/user/check_if_watchlisted";

    const watchedURL = "/user/check_if_watched";

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

    await this.getUsersMovieData("watched", watchedURL, this.addToWatched);
    await this.getVideoTrailerData(this.movie_details.id);
  },

  beforeDestroy() {
    this.removeFromFavorites();
    this.removeFromWatchlist();
    this.removeFromWatched();
  },

  methods: {
    ...mapMutations([
      "addToFavorites",
      "removeFromFavorites",
      "addToWatchlist",
      "removeFromWatchlist",
      "addToWatched",
      "removeFromWatched"
    ]),

    async getUsersMovieData(type, urlPath, fn) {
      const body = {
        movie_id: this.movie_details.id,
        type
      };

      const response = await postFetchFactory({ urlPath, body });
      if (response.data.isFavorited) {
        fn();
      }
    },
    async getVideoTrailerData(movie_id) {
      const urlPath = `https://api.themoviedb.org/3/movie/${movie_id}/videos`;

      const response = await fetchFactory({ urlPath, toApi: true });

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