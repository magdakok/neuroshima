<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  PropType,
  computed,
  ref,
} from "@vue/runtime-core";
import { Army } from "@/types";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  armies: { type: Object as PropType<Army[]>, required: true },
});

const availableArmies = computed(() => {
  return props.armies.filter((army: Army) => army.available === true);
});
const leftArmiesLength = computed(() => {
  return [...leftArmies.value].length;
});

const checkedArmies = ref<Army[]>([...availableArmies.value]);
const leftArmies = ref<Army[]>([...availableArmies.value]);
const templateKey = ref<string>("");
const anonymousPlayersNumber = ref<any>("2");

let leftArmiesSet: any;

const emit = defineEmits<{
  (event: "resetRequest", value: any[] | void): void;
}>();

const handleSubmit = () => {
  if (leftArmiesLength.value < store.getters.getPlayers.length) {
    leftArmies.value = [...checkedArmies.value];
  }
  createGame();
  emit("resetRequest");
  templateKey.value = "refreshTemplateToggle";
};

function createGame() {
  const playersArray = [];
  for (let i = 0; i < store.getters.getPlayers.length; i++) {
    playersArray[i] = pickArmy();
  }

  const newGame = {
    players: playersArray,
    time: Date.now(),
  };

  let gamesLog = store.getters.getTempGamesLog;
  gamesLog.push(newGame);

  store.commit("setTempGamesLog", gamesLog);
  store.commit("setCurrentGame", newGame);

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

const handleCheckboxChange = () => {
  leftArmies.value = [...checkedArmies.value];
};

const handleAnonymousPlayersChange = () => {
  store.dispatch(
    "anonymousPlayersAction",
    parseInt(anonymousPlayersNumber.value)
  );
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
    class="c-army-form__form"
    @submit.prevent="handleSubmit"
    @change="handleCheckboxChange"
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
    <div class="c-army-checkbox__action">
      <div v-if="!store.getters.isUserAuth" class="c-field__group">
        <label class="c-field__label" for="playersNumber"
          >How many players?</label
        >
        <select
          class="c-field__select"
          @change="handleAnonymousPlayersChange"
          v-model="anonymousPlayersNumber"
          name="playersNumber"
          id="playersNumber"
          required
        >
          <option value="2" selected>2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <button class="c-army-checkbox__button" type="submit">Play!</button>
    </div>
  </form>
</template>

