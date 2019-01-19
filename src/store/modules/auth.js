const state = {
  isLogged: false
};

const getters = {
  isLoggedIn: state => state.isLogged
};

const mutations = {
  setUserAuth(state) {
    state.isLogged = true;
  }
};

export default {
  state,
  getters,
  mutations
};
