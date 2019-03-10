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
    console.log("state", state);
    state.isLogged = true;
  },
  setUserData(state, data) {
    state.userData = data;
    console.log(state);
  }
};

export default {
  state,
  getters,
  mutations
};
