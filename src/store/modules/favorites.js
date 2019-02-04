const state = {
  isMovieFavorited: false,
  isMovieWatchlisted: false
};

const getters = {
  isFavorite: state => state.isMovieFavorited,
  isInWatchlist: state => state.isMovieWatchlisted
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
  }
};

export default {
  state,
  getters,
  mutations
};
