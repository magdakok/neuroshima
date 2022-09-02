<script setup lang="ts">
import { defineEmits, computed, ref } from "@vue/runtime-core";
import { Army } from "@/types";
import { useUserStore } from "@/store/UserStore.js";
import { useLogStore } from "@/store/LogStore.js";

const userStore = useUserStore();
const logStore = useLogStore();

const checkedArmies = ref<Army[]>(logStore.availableArmies);
const templateKey = ref<string>("");
const anonymousPlayersNumber = ref<any>("2");

const emit = defineEmits<{
  (event: "resetRequest", value: any[] | void): void;
}>();

const handleSubmit = () => {
  //handle not enough armies to play
  if (logStore.leftArmiesLength < userStore.players.length) {
    logStore.armiesQueue = [...logStore.leftArmies];
    logStore.leftArmies = [...checkedArmies.value];
  }
  createGame();
  emit("resetRequest");

  logStore.activeSaveRequest = false;
  logStore.activeSaveRequestSuccess = false;

  userStore.isUserAuth && logStore.saveSet();
  templateKey.value = "refreshTemplateToggle";
};

function createGame() {
  const playersArray = [];
  let queueIds = [];

  if ([...logStore.armiesQueue].length) {
    logStore.armiesQueue.forEach((el) => {
      queueIds.push(el.id);
    });
  }

  for (let i = 0; i < userStore.players.length; i++) {
    playersArray[i] = pickArmy(queueIds);
  }

  const newGame = {
    players: playersArray,
    time: Date.now(),
  };

  let gamesLog = logStore.tempGamesLog;
  gamesLog.push(newGame);

  logStore.tempGamesLog = gamesLog;
  logStore.currentGame = newGame;

  templateKey.value = "refreshTemplateStyles";
}

function pickArmy(queueIds) {
  // prioritise armies from the queue
  if (logStore.armiesQueue.length) {
    return logStore.armiesQueue.splice(
      (logStore.armiesQueue.length * Math.random()) | 0,
      1
    )[0];
  } else {
    // no more armies in queue
    const randomNumber = () => {
      return (logStore.leftArmiesLength * Math.random()) | 0;
    };
    // make sure that new round doesn't double prioritised queue armies
    if (queueIds.length) {
      let pickedArmy = [];
      let doubledArmy = true;

      while (doubledArmy) {
        let pick = randomNumber();
        pickedArmy = [...logStore.leftArmies][pick];
        doubledArmy = queueIds.some((id) => id === pickedArmy.id);
      }
      logStore.leftArmies = logStore.leftArmies.filter(
        (army) => army.id !== pickedArmy.id
      );
      return pickedArmy;
    } else {
      return logStore.leftArmies.splice(randomNumber(), 1)[0];
    }
  }
}

const handleCheckboxChange = () => {
  logStore.leftArmies = [...checkedArmies.value];
};

const handleAnonymousPlayersChange = () => {
  logStore.anonymousPlayersAction(parseInt(anonymousPlayersNumber.value));
};

function setAsPlayed(army: Army) {
  let opacity = "1";
  if (!logStore.leftArmies.some((a: string) => a.id === army)) {
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
        v-for="army in logStore.availableArmies"
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

