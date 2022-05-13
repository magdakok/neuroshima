<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  PropType,
  computed,
  ref,
} from "@vue/runtime-core";
import { Army } from "@/types";
import { useUserStore } from "@/store/UserStore.js";
import { useLogStore } from "@/store/LogStore.js";

const userStore = useUserStore();
const logStore = useLogStore();

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
  if (leftArmiesLength.value < userStore.players.length) {
    leftArmies.value = [...checkedArmies.value];
  }
  createGame();
  emit("resetRequest");
  logStore.activeSaveRequest = false;
  logStore.activeSaveRequestSuccess = false;

  // request.message = null;
  // request.submitBtn = "Save";
  templateKey.value = "refreshTemplateToggle";
};

function createGame() {
  const playersArray = [];
  for (let i = 0; i < userStore.players.length; i++) {
    playersArray[i] = pickArmy();
  }

  const newGame = {
    players: playersArray,
    time: Date.now(),
  };

  let gamesLog = logStore.tempGamesLog;
  gamesLog.push(newGame);

  logStore.tempGamesLog = gamesLog;
  logStore.currentGame = newGame;

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
  logStore.anonymousPlayersAction(parseInt(anonymousPlayersNumber.value));
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
  <h1 class="visually-hidden">Neuroshima - random army picker</h1>
  <form
    class="c-army-form__form"
    @submit.prevent="handleSubmit"
    @change="handleCheckboxChange"
    aria-label="Pick your available armies"
    :key="templateKey"
  >
    <div class="c-army-form__container">
      <div
        class="c-army-form__checkbox"
        v-for="army in availableArmies"
        :army="army"
        :key="army.id"
        :style="{ 'border-color': army.color, opacity: setAsPlayed(army.id) }"
      >
        <label class="c-army-form__label" :for="'input' + army.id">
          {{ army.name }}</label
        >
        <input
          class="c-army-form__input"
          type="checkbox"
          :id="'input' + army.id"
          :value="army"
          v-model="checkedArmies"
          checked="checked"
        />
      </div>
    </div>
    <div class="c-army-form__action">
      <div v-if="!userStore.isUserAuth" class="c-field__group">
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
      <button class="c-army-form__button" type="submit">Play!</button>
    </div>
  </form>
</template>

