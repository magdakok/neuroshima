const getters = {
  getUser(state) {
    return state.user;
  },
  isUserAuth(state) {
    return !!state.user;
  },
  getError(state) {
    return state.error;
  },
  getPlayers(state) {
    return state.players;
  },
  getTempGamesLog(state) {
    return state.tempGamesLog;
  },
  getCurrentGame(state) {
    return state.currentGame;
  },
  getScoreInputs(state) {
    return state.scoreInputs;
  },
  getActiveSaveRequest(state) {
    return state.activeSaveRequest;
  },
  getActiveSaveRequestSuccess(state) {
    return state.activeSaveRequestSuccess;
  },
};

export default getters;
