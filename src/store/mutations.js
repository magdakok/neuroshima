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
  setTempGamesLog(state, payload) {
    state.tempGamesLog = payload;
  },
  setCurrentGame(state, payload) {
    state.currentGame = payload;
  },
};

export default mutations;
