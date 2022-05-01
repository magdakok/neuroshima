<script setup lang="ts">
import {
  defineProps,
  PropType,
  computed,
  defineEmits,
  reactive,
  onBeforeMount,
  ref,
} from "@vue/runtime-core";
import { GamelogPlayer } from "@/types";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  games: { type: Object as PropType<any[]> },
  request: { type: Object, required: true },
});

onBeforeMount(() => {
  store.getters.getPlayers.forEach((player) => (inputs[player] = 0));
});

const currentGame = computed(() => props.games[props.games.length - 1]);
const disableSubmitButton = computed(
  () => props.request.activeRequest && props.request.success
);
const inputs = reactive({});
const comment = ref<string>();

const createDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

const emit =
  defineEmits<{ (event: "handleGameLogEmit", value: any[]): void }>();
const handleFormSubmit = () => {
  let payload = {
    gameId: currentGame.value.time + "-" + store.getters.getUser.uid,
    time: createDate(currentGame.value.time),
    userUID: store.getters.getUser.uid,
    players: [],
    comment: comment.value,
  };

  currentGame.value.players.forEach((player, i) => {
    let playerData: GamelogPlayer = {
      playerName: store.getters.getPlayers[i],
      armyId: currentGame.value.players[i].id,
      armyName: currentGame.value.players[i].name,
      damage: inputs[store.getters.getPlayers[i]],
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
      v-if="games.length"
    >
      <span class="c-current-game__time"
        >Game {{ createDate(currentGame.time) }}</span
      >
      <div class="c-current-game__players">
        <div
          class="c-current-game__player"
          v-for="(playerArmy, i) in currentGame.players"
          :key="playerArmy"
        >
          <span class="c-current-game__name"
            >{{ store.getters.getPlayers[i] }}
          </span>
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
            :name="'inputDamage' + store.getters.getPlayers[i]"
            v-model="inputs[store.getters.getPlayers[i]]"
          />
        </div>
      </div>
      <textarea
        class="c-current-game__input--comment"
        type="text"
        v-model="comment"
        placeholder="comment"
      />
      <button class="c-current-game__submit" :disabled="disableSubmitButton">
        {{ request.submitBtn }}
      </button>
      <span v-if="request.activeRequest">{{ request.message }}</span>
    </form>
  </div>
</template>

