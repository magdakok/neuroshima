import { createStore } from "vuex";
import {
  getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
} from "firebase/auth";

const initialState = () => {
  return { user: null, error: null };
};

export default createStore({
  state: initialState,
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    signUpAction({ commit }, payload) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          commit("setUser", userCredential.user);
          console.log(userCredential.user);
        })
        .catch((error) => {
          commit("setError", error.message);
          console.log(error.message);
        });
    },
    loginAction({commit}, payload){
      const auth = getAuth();
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          commit("setUser", userCredential.user);
          console.log(userCredential.user);
        })
        .catch((error) => {
          commit("setError", error.message);
          console.log(error.message);
        });
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isUserAuth(state) {
      return !!state.user;
    },
    getError(state) {
      return state.error;
    }
  },
});
