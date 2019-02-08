import { stat } from "fs";

const state = {
  isMovieFavorited: false,
  isMovieWatchlisted: false,
  isTrailerOpen: false
};

const getters = {
  isFavorite: state => state.isMovieFavorited,
  isInWatchlist: state => state.isMovieWatchlisted,
  isTrailerShown: state => state.isTrailerOpen
};

const mutations = {
  addToFavorites(state) {
    state.isMovieFavorited = true;
  },
  removeFromFavorites(state) {
    state.isMovieFavorited = false;
  },
  addToWatchlist(state) {
    state.isMovieWatchlisted = true;
  },
  removeFromWatchlist(state) {
    state.isMovieWatchlisted = false;
  },
  showTrailer(state) {
    state.isTrailerOpen = true;
  },
  closeTrailer(state) {
    state.isTrailerOpen = false;
  }
};

export default {
  state,
  getters,
  mutations
};
