const state = {
  isMovieFavorited: false
};

const getters = {
  isFavorite: state => state.isMovieFavorited
};

const mutations = {
  addToFavorites(state) {
    state.isMovieFavorited = true;
  },
  removeFromFavorites(state) {
    state.isMovieFavorited = false;
  }
};

export default {
  state,
  getters,
  mutations
};
