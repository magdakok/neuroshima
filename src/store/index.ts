import { createStore } from "vuex";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import db from "@/firebase/firebaseInit.js";
import { collection, addDoc } from "firebase/firestore/lite";
import { useRouter, useRoute } from "vue-router";

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
    registerAction({ commit }, payload) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          commit("setUser", userCredential.user);
          console.log(userCredential.user.uid);
          const docRef = addDoc(collection(db, "users"), payload.dbUserData);
          console.log(docRef);
        })
        .catch((error) => {
          commit("setError", error.message);
          console.log(error.message);
        });
    },
    loginAction({ commit }, payload) {
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
    },
    logoutAction({ commit }) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          commit("setUser", null);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    authAction({ commit }) {
      const auth = getAuth();
      const router = useRouter();
      const route = useRoute();

      onAuthStateChanged(auth, (user) => {
        if (!user) {
          commit("setUser", null);
        } else if (route.path === "/login" || route.path === "/register") {
          router.replace("/");
          commit("setUser", user);
          console.log(user);
        } else {
          commit("setUser", user);
          console.log(user);
        }
      });
    },
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
    },
  },
});
