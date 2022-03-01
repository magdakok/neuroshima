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
  players: { type: Object as PropType<any[]>, required: true },
  request: { type: Object, required: true },
});

onBeforeMount(() => {
  props.players.forEach((player) => (inputs[player.playerName] = 0));
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
      playerName: props.players[i].playerName,
      armyId: currentGame.value.players[i].id,
      armyName: currentGame.value.players[i].name,
      damage: inputs[props.players[i].playerName],
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
          <span class="c-current-game__name">{{ players[i].playerName }}</span>
          <span class="c-current-game__army">{{ playerArmy.name }}</span>
          <input
            class="c-current-game__input--damage"
            type="number"
            min="0"
            max="20"
            :name="'inputDamage' + players[i].playerName"
            v-model="inputs[players[i].playerName]"
          />
        </div>
      </div>
      <input
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

