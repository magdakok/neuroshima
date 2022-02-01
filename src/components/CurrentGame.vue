<script setup lang="ts">
import {
  defineProps,
  PropType,
  computed,
  defineEmits,
  reactive,
  onBeforeMount,
} from "@vue/runtime-core";

const props = defineProps({
  games: { type: Object as PropType<any[]> },
  players: { type: Object as PropType<string[]>, required: true },
});

onBeforeMount(() => {
  props.players.forEach((player) => (inputs[player] = 0));
});

const currentGame = computed(() => props.games[props.games.length - 1]);
const inputs = reactive({});

const createDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

const handleFormSubmit = (e) => {
  emit("handleGameLogEmit", inputs);
};

const emit = defineEmits<{ (event: "handleGameLogEmit", value: any[]): void }>();
</script>
<template>
  <form class="c-current-game" @submit.prevent="handleFormSubmit" v-if="games.length">
    <span class="c-current-game__time">Game {{ createDate(currentGame.time) }}</span>
    <div
      class="c-current-game__players"
      v-for="(playerArmy, i) in currentGame.players"
      :key="playerArmy"
    >
      <div class="c-current-game__player">
        <span class="c-current-game__name">{{ players[i] }}</span>
        <span class="c-current-game__army">{{ playerArmy.name }}</span>
        <input
          type="number"
          min="0"
          max="20"
          :name="'inputDamage' + players[i]"
          v-model="inputs[players[i]]"
        />
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
