<script setup lang="ts">
import { ref, reactive } from "vue";
import ArmiesForm from "@/components/ArmiesForm.vue";
import CurrentGame from "@/components/CurrentGame.vue";
import dataAllArmies from "@/data-all-armies.json";
import dataPlayers from "@/data-players.json";
import db from "@/firebase/firebaseInit";
import { collection, addDoc } from "firebase/firestore/lite";
import { Request, Gamelog } from "@/types";

const players = ref(dataPlayers);
const armies = ref(dataAllArmies);
const games = ref([]);
const request: Request = reactive({
  activeRequest: false,
  success: null,
  message: null,
});

const handleArmiesEmit = (payload: any) => {
  games.value = payload;
};

const handleGameLogEmit = async (payload: Gamelog) => {
  try {
    const docRef = await addDoc(collection(db, "gameslog"), payload);
    console.log("Document written with ID: ", docRef.id);
    handleSuccess();
  } catch (e) {
    handleError();
    console.log("You don't know the password :(");
  }
};

const handleSuccess = () => {
  request.activeRequest = true;
  request.success = true;
  request.message = "Saved the score";
};

const handleError = () => {
  request.activeRequest = true;
  request.success = false;
  request.message = "Request couldn't be saved";
};

const resetRequest = () => {
  request.activeRequest = false;
  request.success = null;
  request.message = null;
};
</script>
<template>
  <ArmiesForm
    :armies="armies"
    :players="players"
    @handleArmiesEmit="handleArmiesEmit"
  />
  <CurrentGame
    :games="games"
    :players="players"
    :request="request"
    @handleGameLogEmit="handleGameLogEmit"
  />
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

