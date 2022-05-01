import { createStore } from "vuex";
import mutations from "@/store/mutations.js";
import actions from "@/store/actions.js";
import getters from "@/store/getters.js";

const initialState = () => {
  return {
    user: null,
    error: null,
    players: ["Player 1", "Player 2"],
  };
};

export default createStore({
  state: initialState,
  mutations: mutations,
  actions: actions,
  getters: getters,
});
