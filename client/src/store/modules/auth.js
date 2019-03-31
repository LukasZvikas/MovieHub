const state = {
  isLogged: false,
  userData: []
};

const getters = {
  isLoggedIn: state => state.isLogged,
  getUserData: state => state.userData
};

const mutations = {
  setUserAuth(state) {
    state.isLogged = true;
  },
  setUserData(state, data) {
    state.userData = data;
  },
  logout(state) {
    state.isLogged = false;
  },
  incrementWatchedMovieCount(state, id) {
    state.userData.watched.push(id);
  }
};

export default {
  state,
  getters,
  mutations
};
