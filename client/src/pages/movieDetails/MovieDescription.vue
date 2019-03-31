
<template>
  <div data-test="movie-overview" :style="setBackgroundImage">
    <div class="movie-overview__background-image row">
      <div class="col-sm-12 col-md-6 col-xl-4 movie-overview-poster-wrap">
        <img
          data-test="movie-overview__poster"
          class="movie-overview-poster p-1 h-100 w-100"
          :src="getPosterPath(movie_details.poster_path)"
        >
      </div>
      <div class="col-sm-12 col-md-8 movie-overview__description p-2 d-flex justify-content-center">
        <heading :release_date="movie_details.release_date" :title="movie_details.title"/>
        <div class="row d-flex justify-content-start align-items-center">
          <user-score :vote_average="movie_details.vote_average"/>
          <div
            class="movie-overview__add-to-user-list d-flex justify-content-center align-items-center mr-1 tooltip"
            @click="addMovieToUsersList('watchlist')"
            :style="`border-color: ${determineWatchlistFill}`"
          >
            <span
              class="tooltiptext"
            >{{isInWatchlist ? "Remove movie from your watchlist": "Add movie to your watchlist"}}</span>
            <Bookmark class="../components/svgclass" :fill="determineWatchlistFill"/>
          </div>
          <div
            class="movie-overview__add-to-user-list d-flex justify-content-center align-items-center tooltip"
            @click="addMovieToUsersList('favorites')"
            data-test="movie-overview-favorites-button"
            :style="`border-color: ${determineFavoritesFill}`"
          >
            <span
              class="tooltiptext"
            >{{isFavorite ? "Remove movie from your favorites": "Add movie to your favorites"}}</span>
            <Favorite class="../components/svgclass" :fill="determineFavoritesFill"/>
          </div>
          <div
            class="movie-overview__trailer-btn d-flex justify-content-center align-items-center ml-1 flex-column"
            @click="showTrailer"
            data-test="movie-overview-trailer-btn"
          >
            <div class="font-weight-bold">Play Trailer</div>
            <play-video class="movie-overview__play-video-icon"/>
          </div>
        </div>
        <div class="mb-2">
          <div class="d-flex mt-2 align-items-center">
            <h3 class="font-weight-bold mr-1">Overview</h3>
            <div
              class="movie-overview__watched-mark d-flex justify-content-center align-items-center flex-column tooltip"
              :style="`border-color: ${determineWatchedFill}`"
              @click="addMovieToUsersList('watched')"
            >
              <span
                class="tooltiptext"
              >{{isWatched ? "Remove from your watched movies": "Mark as watched"}}</span>
              <check-mark class="../components/svgclass" :fill="determineWatchedFill"/>
            </div>
          </div>
          <div data-test="movie-overview-body">{{movie_details.overview}}</div>
        </div>
        <div class="row">
          <div
            data-test="movie-overview-genre"
            class="movie-overview__genres m-1 col-4 col-md-4 p-1"
            v-for="(item, index) in movie_details.genres"
            :key="index"
          >{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserScore from "../../components/UserScore";
import Heading from "./Heading";
import Bookmark from "../../components/svg/Bookmark";
import Favorite from "../../components/svg/Favorite";
import PlayVideo from "../../components/svg/PlayVideo";
import CheckMark from "../../components/svg/CheckMark";
import { getAuthToken } from "../../utilities/localStorage";
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
import postFetchFactory from "../../utilities/postFetch";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    UserScore,
    Bookmark,
    Favorite,
    PlayVideo,
    Heading,
    CheckMark
  },
  props: {
    movie_details: Object
  },
  computed: {
    ...mapGetters(["isFavorite", "isInWatchlist", "isWatched"]),
    setBackgroundImage() {
      return {
        "background-image": `linear-gradient(59deg, rgba(25,20,20,0.7) 53%, rgba(25, 20, 20, 0.8) 76%), url(${this.getPosterPath(
          this.movie_details.backdrop_path
        )})`,
        "background-repeat": "no repeat",
        "background-position": "center",
        "background-size": "cover",
        display: "flex",
        "justify-content": "center"
      };
    },
    determineFavoritesFill() {
      const favorited = this.isFavorite;
      if (favorited) return "#f70963";
      return "#fff";
    },
    determineWatchlistFill() {
      const watchlisted = this.isInWatchlist;
      if (watchlisted) return "#f70963";
      return "#fff";
    },
    determineWatchedFill() {
      const isWatched = this.isWatched;
      if (isWatched) return "#48AE48";
      return "#fff";
    }
  },
  methods: {
    ...mapMutations([
      "addToFavorites",
      "removeFromFavorites",
      "addToWatchlist",
      "removeFromWatchlist",
      "addToWatched",
      "removeFromWatched",
      "showTrailer",
      "closeTrailer",
      "incrementWatchedMovieCount"
    ]),
    getPosterPath(path) {
      return generatePosterPath(path);
    },
    async addMovieToUsersList(type) {
      const { id } = this.movie_details;
      const body = { movie_id: id, type };

      const response = await postFetchFactory({
        urlPath: `/user/add/${type}`,
        body
      });

      if (type === "watchlist") {
        response.status === "added"
          ? this.addToWatchlist()
          : this.removeFromWatchlist();
      } else if (type === "favorites") {
        response.status === "added"
          ? this.addToFavorites()
          : this.removeFromFavorites();
      } else {
        response.status === "added"
          ? (this.addToWatched(), this.incrementWatchedMovieCount(body.movie_id))
          : this.removeFromWatched();
      }
    }
  }
};
</script>

<style>
</style>
