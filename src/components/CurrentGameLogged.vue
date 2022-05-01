<script setup lang="ts">
import {
  defineProps,
  PropType,
  computed,
  defineEmits,
  reactive,
  onBeforeMount,
  ref,
  onBeforeUpdate,
} from "@vue/runtime-core";
import { GamelogPlayer } from "@/types";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  request: { type: Object, required: true },
});

onBeforeMount(() => {
  store.getters.getPlayers.forEach((player, index) => (inputs[index] = 0));
});

const disableSubmitButton = computed(
  () => props.request.activeRequest && props.request.success
);
const inputs = reactive([] as number[]);
const comment = ref<string>("");

const createDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

const emit =
  defineEmits<{ (event: "handleGameLogEmit", value: any[]): void }>();
const handleFormSubmit = () => {
  let payload = {
    gameId: store.getters.getCurrentGame.time + "-" + store.getters.getUser.uid,
    time: createDate(store.getters.getCurrentGame.time),
    userUID: store.getters.getUser.uid,
    players: [],
    comment: comment.value,
  };

  store.getters.getCurrentGame.players.forEach((player, i) => {
    let playerData: GamelogPlayer = {
      playerName: store.getters.getPlayers[i],
      armyId: store.getters.getCurrentGame.players[i].id,
      armyName: store.getters.getCurrentGame.players[i].name,
      damage: inputs[i],
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
      v-if="store.getters.getCurrentGame.time"
    >
      <span class="c-current-game__time"
        >Game {{ createDate(store.getters.getCurrentGame.time) }}</span
      >
      <div class="c-current-game__players">
        <div
          class="c-current-game__player"
          v-for="(playerArmy, i) in store.getters.getCurrentGame.players"
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
            v-model="inputs[i]"
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

