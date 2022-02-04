<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  PropType,
  computed,
  ref,
} from "@vue/runtime-core";
import { Army } from "@/types";

const props = defineProps({
  armies: { type: Object as PropType<Army[]>, required: true },
  players: { type: Object as PropType<any[]>, required: true },
});

const availableArmies = computed(() => {
  return props.armies.filter((army: Army) => army.available === true);
});
const leftArmiesLength = computed(() => {
  return [...leftArmies.value].length;
});

const checkedArmies = ref<Army[]>([...availableArmies.value]);
const leftArmies = ref<Army[]>([...availableArmies.value]);
const games = ref<any>([]);
const templateKey = ref<string>("");
let leftArmiesSet: any;

const emit = defineEmits<{ (event: "handleArmiesEmit", value: any[]): void }>();

const handleSubmit = () => {
  if (leftArmiesLength.value < props.players.length) {
    leftArmies.value = [...checkedArmies.value];
  }
  createGame();
  //here resetting parent request
  templateKey.value = "refreshTemplateToggle";
};

function createGame() {
  const playersArray = [];
  for (let i = 0; i < props.players.length; i++) {
    playersArray[i] = pickArmy();
  }

  games.value.push({
    players: playersArray,
    time: Date.now(),
  });
  emit("handleArmiesEmit", games.value);

  leftArmiesSet = new Set();
  leftArmies.value.forEach((leftArmy: Army) => leftArmiesSet.add(leftArmy.id));
  templateKey.value = "refreshTemplateStyles";
}

function pickArmy() {
  return leftArmies.value.splice(
    (leftArmiesLength.value * Math.random()) | 0,
    1
  )[0];
}

const handleChange = () => {
  leftArmies.value = [...checkedArmies.value];
};

function setAsPlayed(army: Army) {
  let opacity = "1";
  if (typeof leftArmiesSet === "object" && !leftArmiesSet.has(army)) {
    opacity = "0.3";
  }
  return opacity;
}
</script>
<template>
  <form
    @submit.prevent="handleSubmit"
    @change="handleChange"
    :key="templateKey"
  >
    <div class="c-army-checkbox__container">
      <div v-for="army in availableArmies" :army="army" :key="army.id">
        <label
          class="c-army-checkbox__label"
          :for="'input' + army.id"
          :style="{ 'border-color': army.color, opacity: setAsPlayed(army.id) }"
          ><input
            class="c-army-checkbox__input"
            type="checkbox"
            :id="'input' + army.id"
            :value="army"
            v-model="checkedArmies"
            checked="checked"
          />
          {{ army.name }}</label
        >
      </div>
    </div>
    <button class="c-army-checkbox__button" type="submit">Play!</button>
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
  padding: 5px 7px;
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
