<script setup lang="ts">
import { ref } from "vue";
import ArmiesForm from "@/components/ArmiesForm.vue";
import CurrentGame from "@/components/CurrentGame.vue";
import dataAllArmies from "@/data-all-armies.json";
import dataGameLog from "@/data-game-log.json";

const players = ["Magda", "Ollie"];
const armies = ref(dataAllArmies);
const gameLog = ref(dataGameLog);
const games = ref([]);

const handleArmiesEmit = (payload: any) => {
  games.value = payload;
};

const handleGameLogEmit = (payload: any) => {
  console.log(payload);
  //here adding points to recent game
};
</script>
<template>
  <ArmiesForm :armies="armies" :players="players" @handleArmiesEmit="handleArmiesEmit" />
  <CurrentGame :games="games" :players="players" @handleGameLogEmit="handleGameLogEmit" />
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
