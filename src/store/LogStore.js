import { defineStore } from "pinia";
import db from "@/firebase/firebaseInit.js";
import { collection, addDoc, setDoc, doc } from "firebase/firestore/lite";
import { useUserStore } from "@/store/UserStore.js";

// interface StateModel {
//   tempGamesLog: [];
//   currentGame: any;
//   scoreInputs: [];
//   activeSaveRequest: boolean;
//   activeSaveRequestSuccess: null | boolean;
// }

export const useLogStore = defineStore("LogStore", {
  state: () => ({
    leftArmiesSet: undefined,
    tempGamesLog: [],
    currentGame: {},
    scoreInputs: [],
    activeSaveRequest: false,
    activeSaveRequestSuccess: null,
  }),
  getters: {
    saveButtonMessage() {
      if (this.activeSaveRequestSuccess) {
        return "Saved";
      } else if (!this.activeSaveRequest) {
        return "Save";
      } else {
        return "Saving";
      }
    },
  },
  actions: {
    anonymousPlayersAction(anonymousPlayersNumber) {
      const playersArray = [...new Array(anonymousPlayersNumber)].map(
        (el, index) => `Player ${index + 1}`
      );
      useUserStore().players = playersArray;

      this.tempGamesLog = [];
      this.currentGame = {};
    },
    logGame(payload) {
      addDoc(collection(db, "gameslog"), payload)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.activeSaveRequest = false;
          this.activeSaveRequestSuccess = true;
        })
        .catch((e) => {
          console.log(e);
          this.activeSaveRequest = true;
          this.activeSaveRequestSuccess = false;
        });

      addDoc(collection(db, "users", useUserStore().uid, "log"), payload)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.activeSaveRequest = false;
          this.activeSaveRequestSuccess = true;
        })
        .catch((e) => {
          console.log(e);
          this.activeSaveRequest = true;
          this.activeSaveRequestSuccess = false;
        });
    },
    saveSet() {
      setDoc(
        doc(db, "users", useUserStore().uid),
        {
          leftArmiesSet: Array.from(this.leftArmiesSet),
        },
        { merge: true }
      ).catch((e) => {
        console.log(e);
      });
    },
  },
});
