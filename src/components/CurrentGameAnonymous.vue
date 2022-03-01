<script setup lang="ts">
import {
  defineProps,
  PropType,
  computed,
  reactive,
  onBeforeMount,
  ref,
} from "@vue/runtime-core";

const props = defineProps({
  games: { type: Object as PropType<any[]> },
  players: { type: Object as PropType<any[]>, required: true },
});

const currentGame = computed(() => props.games[props.games.length - 1]);

const createDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};
</script>
<template>
  <div class="c-current-game__container">
    <div class="c-current-game" v-if="games.length">
      <span class="c-current-game__time"
        >Game {{ createDate(currentGame.time) }}</span
      >
      <div class="c-current-game__players">
        <div
          class="c-current-game__player"
          v-for="(playerArmy, i) in currentGame.players"
          :key="playerArmy"
        >
          <span class="c-current-game__name">{{ players[i].playerName }}</span>
          <span class="c-current-game__army">{{ playerArmy.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

