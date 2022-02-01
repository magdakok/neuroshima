<script setup lang="ts">
import { ref } from "vue";
import ArmiesForm from "@/components/ArmiesForm.vue";
import CurrentGame from "@/components/CurrentGame.vue";
import dataAllArmies from "@/data-all-armies.json";

const armies = ref(dataAllArmies);
const games = ref([]);

const handleGamesEmit = (payload: any) => {
  games.value = payload;
};
</script>
<template>
  <ArmiesForm :armies="armies" @handleGamesEmit="handleGamesEmit" />
  <CurrentGame :games="games" />
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
