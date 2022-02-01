<script setup lang="ts">
import { defineProps, PropType, computed } from "@vue/runtime-core";

const props = defineProps({
  games: { type: Object as PropType<any[]> },
});
const players = ["Magda", "Ollie"];
const currentGame = computed(() => props.games[props.games.length - 1]);

const createDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

// const emit = defineEmits<{ (event: "handleGamesEmit", value: any[]): void }>();
</script>
<template>
  <form class="c-current-game" v-if="games.length">
    <span class="c-current-game__time">Game {{ createDate(currentGame.time) }}</span>
    <div
      class="c-current-game__players"
      v-for="(playerArmy, i) in currentGame.players"
      :key="playerArmy"
    >
      <div class="c-current-game__player">
        <span class="c-current-game__name">{{ players[i] }}</span>
        <span class="c-current-game__army">{{ playerArmy.name }}</span>
        <input type="number" />
      </div>
    </div>
    <button>SAVE</button>
  </form>
</template>
<style lang="scss">
.c-army-checkbox__container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.c-army-checkbox__label {
  display: inline-block;
  padding: 10px 15px;
  margin: 5px;
  border-width: 5px;
  border-style: solid;
  cursor: pointer;
}

.c-army-checkbox__button {
  padding: 10px 20px;
  background-color: black;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
