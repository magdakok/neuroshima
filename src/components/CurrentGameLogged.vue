<script setup lang="ts">
import {
  computed,
  defineEmits,
  onBeforeMount,
  ref,
  watchEffect,
  onMounted,
} from "@vue/runtime-core";
import { GamelogPlayer } from "@/types";
import { useUserStore } from "@/store/UserStore.js";
import { useLogStore } from "@/store/LogStore.js";

const userStore = useUserStore();
const logStore = useLogStore();

const resetScoreInputs = () => {
  userStore.players.forEach((player, index) => {
    scoreInputs.value[index] = 0;
  });
};

onBeforeMount(() => {
  resetScoreInputs();
});

onMounted(() => {
  watchEffect(() => {
    const data = logStore.currentGame;
    resetScoreInputs();
  });
});

const scoreInputs = computed({
  get(): string {
    return logStore.scoreInputs;
  },
  set(value) {
    logStore.scoreInputs - value;
  },
});

const disableSubmitButton = computed(
  () => logStore.activeSaveRequest || logStore.activeSaveRequestSuccess
);

const comment = ref<string>("");

const createDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

const emit =
  defineEmits<{ (event: "handleGameLogEmit", value: any[]): void }>();
const handleFormSubmit = () => {
  logStore.activeSaveRequest = true;

  let payload = {
    gameId: logStore.currentGame.time + "-" + userStore.uid,
    time: createDate(logStore.currentGame.time),
    userUID: userStore.uid,
    players: [],
    comment: comment.value,
  };

  logStore.currentGame.players.forEach((player, i) => {
    let playerData: GamelogPlayer = {
      playerName: userStore.players[i],
      armyId: logStore.currentGame.players[i].id,
      armyName: logStore.currentGame.players[i].name,
      damage: logStore.scoreInputs[i],
    };

    payload.players.push(playerData);
  });
  emit("handleGameLogEmit", payload);
};
</script>
<template>
  <div class="c-current-game__container">
    <form
      class="c-current-game"
      @submit.prevent="handleFormSubmit"
      v-if="logStore.currentGame.time"
    >
      <span class="c-current-game__time"
        >Game {{ createDate(logStore.currentGame.time) }}</span
      >
      <div class="c-current-game__players">
        <div
          class="c-current-game__player"
          v-for="(playerArmy, i) in logStore.currentGame.players"
          :key="playerArmy"
        >
          <span class="c-current-game__name">{{ userStore.players[i] }} </span>
          <span
            class="c-current-game__army"
            :style="{ 'border-color': playerArmy.color }"
            >{{ playerArmy.name }}</span
          >
          <input
            class="c-current-game__input--damage"
            type="number"
            min="0"
            :max="playerArmy.name === 'Dancer' ? 30 : 20"
            :id="'inputDamage' + userStore.players[i]"
            :name="'inputDamage' + userStore.players[i]"
            v-model="scoreInputs[i]"
          />
          <label
            class="visually-hidden"
            :for="'inputDamage' + userStore.players[i]"
            >{{ playerArmy.name }} damage points</label
          >
        </div>
      </div>
      <textarea
        class="c-current-game__input--comment"
        type="text"
        v-model="comment"
        placeholder="comment"
      />
      <button class="c-current-game__submit" :disabled="disableSubmitButton">
        {{ logStore.saveButtonMessage }}
      </button>
      <div v-if="logStore.activeSaveRequestSuccess">Boom! Saved!</div>
    </form>
  </div>
</template>

