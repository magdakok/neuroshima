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

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "@vue/runtime-core";
import { Army } from "@/types";

export default defineComponent({
  props: {
    armies: { type: Object as PropType<Army[]>, required: true },
  },
  setup(props, context) {
    const availableArmies = computed(() => {
      return props.armies.filter((army) => army.available === true);
    });
    const leftArmiesLength = computed(() => {
      return [...leftArmies.value].length;
    });

    const checkedArmies = ref<Army[]>([...availableArmies.value]);
    const leftArmies = ref<Army[]>([...availableArmies.value]);
    const games = ref<any>([]);

    function handleSubmit() {
      if (leftArmiesLength.value < 2) {
        leftArmies.value = [...checkedArmies.value];
      }

      createGame();
    }

    function pickArmy() {
      return leftArmies.value.splice((leftArmiesLength.value * Math.random()) | 0, 1)[0];
    }

    function createGame() {
      games.value.push({
        players: [pickArmy(), pickArmy()],
        time: Date.now(),
      });
      context.emit("handleGamesEmit", games.value);
    }

    function handleChange() {
      leftArmies.value = [...checkedArmies.value];
    }

    return {
      availableArmies,
      checkedArmies,
      leftArmies,
      leftArmiesLength,
      games,
      handleSubmit,
      handleChange,
      pickArmy,
      createGame,
    };
  },
});
</script>

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
