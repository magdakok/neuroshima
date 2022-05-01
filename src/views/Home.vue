<script setup lang="ts">
import { ref, reactive } from "vue";
import ArmiesForm from "@/components/ArmiesForm.vue";
import CurrentGameLogged from "@/components/CurrentGameLogged.vue";
import CurrentGameAnonymous from "@/components/CurrentGameAnonymous.vue";
import dataAllArmies from "@/data-all-armies.json";
import db from "@/firebase/firebaseInit";
import { collection, addDoc } from "firebase/firestore/lite";
import { Request, Gamelog } from "@/types";
import { useStore } from "vuex";

const store = useStore();

const armies = ref(dataAllArmies);
const request: Request = reactive({
  activeRequest: false,
  success: null,
  message: null,
  submitBtn: "Save",
});

const handleGameLogEmit = async (payload: Gamelog) => {
  try {
    const docRef = await addDoc(collection(db, "gameslog"), payload);
    console.log("Document written with ID: ", docRef.id);
    handleSuccess();
  } catch (e) {
    handleError();
    console.log(e);
  }
};

const handleSuccess = () => {
  request.activeRequest = true;
  request.success = true;
  request.message = "Saved the score";
  request.submitBtn = "Success!";
};

const handleError = () => {
  request.activeRequest = true;
  request.success = false;
  request.message = "Request couldn't be saved";
  request.submitBtn = "Save";
};

const resetRequest = () => {
  request.activeRequest = false;
  request.success = null;
  request.message = null;
  request.submitBtn = "Save";
};
</script>
<template>
  <ArmiesForm :armies="armies" @resetRequest="resetRequest" />
  <CurrentGameLogged
    v-if="store.getters.isUserAuth"
    :request="request"
    @handleGameLogEmit="handleGameLogEmit"
  />
  <CurrentGameAnonymous v-else />
</template>