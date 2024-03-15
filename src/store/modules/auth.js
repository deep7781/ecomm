const state = {
  user: {
    email: "",
    password: "",
    keepLoggedIn: false,
    isLoggedIn: false,
    isAdmin: false,
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setIsLoggedIn(state, isLoggedIn) {
    state.user.isLoggedIn = isLoggedIn;
  },
  setIsAdmin(state, isAdmin) {
    state.user.isAdmin = isAdmin;
  },
  clearUser(state) {
    state.user = {
      email: "",
      password: "",
      keepLoggedIn: false,
      isLoggedIn: false,
      isAdmin: false,
    };
  },
};

const actions = {
  loginUser({ commit }, userData) {
    commit("setUser", { ...userData, isLoggedIn: true });
  },
  logoutUser({ commit }) {
    commit("clearUser");
  },
};
const getters = {
  isAuthenticated(state) {
    return state.user.isLoggedIn;
  },
  isAdmin(state) {
    return state.user.isAdmin;
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
