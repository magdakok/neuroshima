import { defineStore } from "pinia";
import db from "@/firebase/firebaseInit.js";
import { collection, addDoc } from "firebase/firestore/lite";
import { useUserStore } from "@/store/UserStore.js";

// FPINIA1: defineStore("UniqueStoreName", { configHere });
export const useLogStore = defineStore("LogStore", {
  // FPINIA2: state() { return { ... }} OR state: () => ({})
  state: () => ({
    tempGamesLog: [],
    currentGame: {},
    scoreInputs: [],
    activeSaveRequest: false,
    activeSaveRequestSuccess: null,
  }),
  actions: {
    anonymousPlayersAction(anonymousPlayersNumber) {
      let playersArray = [...new Array(anonymousPlayersNumber)].map(
        (el, index) => `Player ${index + 1}`
      );
      // FPINIA: using other store, soooo easy!
      useUserStore().players = playersArray;

      this.tempGamesLog = [];
      this.currentGame = {};
    },
    logGame(payload) {
      addDoc(collection(db, "gameslog"), payload)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.activeSaveRequest = true;
          this.activeSaveRequestSuccess = true;
        })
        .catch((e) => {
          console.log(e);
          this.activeSaveRequest = true;
          this.activeSaveRequestSuccess = false;
        });
    },
  },
});
