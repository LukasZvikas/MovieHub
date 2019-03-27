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
  }
};

export default {
  state,
  getters,
  mutations
};
