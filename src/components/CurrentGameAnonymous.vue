<script setup lang="ts">
import {
  defineProps,
  PropType,
  computed,
  reactive,
  onBeforeMount,
  ref,
} from "@vue/runtime-core";

import { useStore } from "vuex";

const store = useStore();

const createDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};
</script>
<template>
  <div class="c-current-game__container">
    <div class="c-current-game" v-if="store.getters.getCurrentGame.time">
      <span class="c-current-game__time"
        >Game {{ createDate(store.getters.getCurrentGame.time) }}</span
      >
      <div class="c-current-game__players">
        <div
          class="c-current-game__player"
          v-for="(playerArmy, i) in store.getters.getCurrentGame.players"
          :key="playerArmy"
        >
          <span class="c-current-game__name">{{
            store.getters.getPlayers[i]
          }}</span>
          <span
            class="c-current-game__army"
            :style="{ 'border-color': playerArmy.color }"
            >{{ playerArmy.name }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

