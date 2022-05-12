import db from "@/firebase/firebaseInit.js";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore/lite";
import { useRouter, useRoute } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const actions = {
  registerAction({ commit }, payload) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        commit("setUser", userCredential.user);
        commit("setPlayers", payload.dbUserData.players);
        return userCredential.user.uid;
      })
      .then((uid) => {
        const docRef = setDoc(doc(db, "users", uid), {
          ...payload.dbUserData,
          userUID: this.getters.getUser.uid,
          registrationTime: Date.now(),
          log: [],
        });
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
        return userCredential.user.uid;
      })
      .then((uid) => {
        getDoc(doc(db, "users", uid)).then((docSnap) => {
          if (docSnap.exists()) {
            commit("setPlayers", docSnap.data().players);
            commit("setTempGamesLog", []);
            commit("setCurrentGame", {});
          } else {
            console.log("No such document!");
          }
        });
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
        commit("setPlayers", ["Player 1", "Player 2"]);
        commit("setTempGamesLog", []);
        commit("setCurrentGame", {});
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
      } else {
        commit("setUser", user);
      }
    });
  },
  anonymousPlayersAction({ commit }, anonymousPlayersNumber) {
    let playersArray = [...new Array(anonymousPlayersNumber)].map(
      (el, index) => `Player ${index + 1}`
    );
    commit("setPlayers", playersArray);
    commit("setTempGamesLog", []);
    commit("setCurrentGame", {});
  },
};

export default actions;
