import { createStore } from "vuex";
import {
  getAuth,
  createUserWithEmailAndPassword,
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
          const user = userCredential.user;
          console.log(userCredential);
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
  },
  modules: {},
});
