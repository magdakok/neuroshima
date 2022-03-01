const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  setPlayers(state, payload) {
    state.players = payload;
  },
};

export default mutations;
