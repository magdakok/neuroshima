<script setup lang="ts">
import { ref } from "vue";
import ArmiesForm from "@/components/ArmiesForm.vue";
import data from "@/data.json";

const players = ["Magda", "Ollie"];
const armies = ref(data);
const games = ref([]);

const handleGamesEmit = (payload: any) => {
  games.value = payload;
};

const createDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};
</script>
<template>
  <ArmiesForm :armies="armies" @handleGamesEmit="handleGamesEmit" />
  <div v-if="games">
    <div v-for="game in games" :key="game">
      Game {{ createDate(game.time) }}
      <div v-for="(playerArmy, i) in game.players" :key="playerArmy">
        {{ players[i] }}: {{ playerArmy.name }}
      </div>
      <br />
    </div>
  </div>
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
