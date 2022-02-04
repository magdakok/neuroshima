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

const props = defineProps({
  games: { type: Object as PropType<any[]> },
  players: { type: Object as PropType<any[]>, required: true },
});

onBeforeMount(() => {
  props.players.forEach((player) => (inputs[player.playerName] = 0));
});

const currentGame = computed(() => props.games[props.games.length - 1]);
const inputs = reactive({});
const temporaryPassword = ref<string>();

const createDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

const emit = defineEmits<{ (event: "handleGameLogEmit", value: any[]): void }>();
const handleFormSubmit = () => {
  let payload = {
    gameId: currentGame.value.time,
    time: createDate(currentGame.value.time),
    players: [],
    password: temporaryPassword.value,
  };

  currentGame.value.players.forEach((player, i) => {
    let playerData = {
      playerName: props.players[i].playerName,
      playerId: props.players[i].playerId,
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
    <form class="c-current-game" @submit.prevent="handleFormSubmit" v-if="games.length">
      <span class="c-current-game__time">Game {{ createDate(currentGame.time) }}</span>
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
        class="c-current-game__input--password"
        type="text"
        v-model="temporaryPassword"
        placeholder="password xD"
      />
      <button class="c-current-game__submit">SAVE</button>
    </form>
  </div>
</template>
<style lang="scss">
.c-current-game__container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.c-current-game__time {
  display: inline-block;
  font-size: 22px;
  margin-bottom: 10px;
}
.c-current-game__players {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  display: flex;
  min-width: 350px;
}
.c-current-game__player {
  min-width: 100px;
}
.c-current-game__name {
  margin-bottom: 8px;
  display: block;
}
.c-current-game__army {
  margin-bottom: 8px;
  display: block;
}
.c-current-game__input--damage {
  font-size: 25px;
  padding: 10px;

  text-align: center;
}

.c-current-game__input--password {
  border-color: palevioletred;
  padding: 5px;
  font-size: 20px;
  margin: 10px;
  box-shadow: none;
}

.c-current-game__submit {
  display: block;
  padding: 8px 15px;
  font-size: 25px;
}
</style>
