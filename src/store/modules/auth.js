const state = {
  isLogged: false
};

const getters = {
  isLoggedIn: state => state.isLogged
};

const mutations = {
  setUserAuth(state) {
    console.log("state", state);
    state.isLogged = true;
  }
};

export default {
  state,
  getters,
  mutations
};
