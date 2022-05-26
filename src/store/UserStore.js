import { defineStore } from "pinia";
import db from "@/firebase/firebaseInit.js";
import { setDoc, doc, getDoc } from "firebase/firestore/lite";
import { useRouter, useRoute } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// !FPINIA6a: using other stores
import { useLogStore } from "@/store/LogStore.js";

// !FPINIA2: Defining a store (it's already it's own module)
// * defineStore("UniqueStoreName", { configHere });

export const useUserStore = defineStore("UserStore", {
  // !FPINIA3: Defining a state
  // * state() { return { ... }} OR state: () => ({})
  state: () => ({
    user: null,
    error: null,
    players: ["Player 1", "Player 2"],
  }),
  // !FPINIA4: Defining getters
  getters: {
    // * or uid(){ return this.user.uid } (no passing state here, just this)
    // * for using other getters better use uid(){} way and access them with this
    uid: (state) => (state.user ? state.user.uid : null),
    isUserAuth: (state) => !!state.user,
  },
  // !FPINIA5: Defining actions
  actions: {
    registerAction(payload) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          // * used to be: commit("setUser", userCredential.user);
          this.user = userCredential.user;
          // * used to be: commit("setPlayers", payload.dbUserData.players);
          this.players = payload.dbUserData.players;
          return userCredential.user.uid;
        })
        .then((uid) => {
          setDoc(doc(db, "users", uid), {
            ...payload.dbUserData,
            userUID: this.user.uid,
            registrationTime: Date.now(),
            log: [],
          });
        })
        .then(() => {
          // !FPINIA6b: using other stores
          useLogStore().tempGamesLog = [];
          useLogStore().currentGame = {};
        })
        .catch((error) => {
          useLogStore().error = error.message;
          console.log(error.message);
        });
    },
    loginAction(payload) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          this.user = userCredential.user;
          return this.user.uid;
        })
        .then((uid) => {
          getDoc(doc(db, "users", uid)).then((docSnap) => {
            if (docSnap.exists()) {
              this.players = docSnap.data().players;
              useLogStore().tempGamesLog = [];
              useLogStore().currentGame = {};
            } else {
              console.log("No such document!");
            }
          });
        })
        .catch((error) => {
          useLogStore().error = error.message;
          console.log(error.message);
        });
    },
    logoutAction() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.user = null;
          this.players = ["Player 1", "Player 2"];
          useLogStore().tempGamesLog = [];
          useLogStore().currentGame = {};
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    authAction() {
      const auth = getAuth();
      const router = useRouter();
      const route = useRoute();

      onAuthStateChanged(auth, (user) => {
        if (!user) {
          this.user = null;
        } else if (route.path === "/login" || route.path === "/register") {
          this.user = user;
          router.replace("/");
        } else {
          getDoc(doc(db, "users", user.uid)).then((docSnap) => {
            if (docSnap.exists()) {
              this.players = docSnap.data().players;
              useLogStore().tempGamesLog = [];
              useLogStore().currentGame = {};
            } else {
              console.log("No such document!");
            }
          });
          this.user = user;
        }
      });
    },
  },
});
