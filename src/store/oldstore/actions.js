import db from "@/firebase/firebaseInit.js";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
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
      .then(() => {
        commit("setTempGamesLog", []);
        commit("setCurrentGame", {});
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
        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            commit("setPlayers", docSnap.data().players);
            commit("setTempGamesLog", []);
            commit("setCurrentGame", {});
          } else {
            console.log("No such document!");
          }
        });
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
  logGame({ commit }, payload) {
    addDoc(collection(db, "gameslog"), payload)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        commit("setActiveSaveRequest", true);
        commit("setActiveSaveRequestSuccess", true);
      })
      .catch((e) => {
        console.log(e);
        commit("setActiveSaveRequest", true);
        commit("setActiveSaveRequestSuccess", false);
      });
  },
};

export default actions;
