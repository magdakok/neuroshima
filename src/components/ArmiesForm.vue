<script setup lang="ts">
import { defineEmits, defineProps, PropType, computed, ref } from "@vue/runtime-core";
import { Army } from "@/types";

const props = defineProps({
  armies: { type: Object as PropType<Army[]>, required: true },
});

const availableArmies = computed(() => {
  return props.armies.filter((army) => army.available === true);
});
const leftArmiesLength = computed(() => {
  return [...leftArmies.value].length;
});

const checkedArmies = ref<Army[]>([...availableArmies.value]);
const leftArmies = ref<Army[]>([...availableArmies.value]);
const games = ref<any>([]);

const emit = defineEmits<{ (event: "handleGamesEmit", value: any[]): void }>();

const handleSubmit = () => {
  if (leftArmiesLength.value < 3) {
    leftArmies.value = [...checkedArmies.value];
  }

  createGame();
};

function createGame() {
  games.value.push({
    players: [pickArmy(), pickArmy()],
    time: Date.now(),
  });
  emit("handleGamesEmit", games.value);
}

function pickArmy() {
  return leftArmies.value.splice((leftArmiesLength.value * Math.random()) | 0, 1)[0];
}

const handleChange = () => {
  leftArmies.value = [...checkedArmies.value];
};
</script>
<template>
  <form @submit.prevent="handleSubmit" @change="handleChange">
    <div class="c-army-checkbox__container">
      <div v-for="army in availableArmies" :army="army" :key="army.id">
        <label
          class="c-army-checkbox__label"
          :for="'input' + army.id"
          :style="{ 'border-color': army.color }"
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