const state = {
  isMovieFavorited: false,
  isMovieWatchlisted: false,
  isMovieWatched: false,
  isTrailerOpen: false,
  searchDate: ""
};

const getters = {
  isFavorite: state => state.isMovieFavorited,
  isInWatchlist: state => state.isMovieWatchlisted,
  isWatched: state => state.isMovieWatched,
  isTrailerShown: state => state.isTrailerOpen,
  getSearchDate: state => state.searchDate
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
  addToWatched(state) {
    state.isMovieWatched = true;
  },
  removeFromWatched(state) {
    state.isMovieWatched = false;
  },
  showTrailer(state) {
    state.isTrailerOpen = true;
  },
  closeTrailer(state) {
    state.isTrailerOpen = false;
  },
  setSearchDate(state, date) {
    state.searchDate = date._i;
  }
};

export default {
  state,
  getters,
  mutations
};
