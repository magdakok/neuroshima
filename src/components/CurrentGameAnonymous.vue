<script setup lang="ts">
import { useUserStore } from "@/store/UserStore.js";
import { useLogStore } from "@/store/LogStore.js";

const userStore = useUserStore();
const logStore = useLogStore();

const createDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};
</script>
<template>
  <div class="c-current-game__container">
    <div class="c-current-game" v-if="logStore.currentGame.time">
      <span class="c-current-game__time"
        >Game {{ createDate(logStore.currentGame.time) }}</span
      >
      <div class="c-current-game__players">
        <div
          class="c-current-game__player"
          v-for="(playerArmy, i) in logStore.currentGame.players"
          :key="playerArmy"
        >
          <span class="c-current-game__name">{{ userStore.players[i] }}</span>
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

