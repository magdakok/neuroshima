<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const email = ref("");
const password = ref("");
const playersNumber = ref("2");
const playerInputs = ref([null, null]);
const playerInputsArray = computed(() => [...playerInputs.value]);

watch(playersNumber, (newValue, oldValue) => {
  playerInputs.value = new Array(parseInt(newValue)).fill(null);
});

const handleSubmit = () => {
  let userData = {
    players: [],
  };
  playerInputs.value.forEach((player, i) => {
    userData.players.push(player);
  });
  store.dispatch("registerAction", {
    email: email.value,
    password: password.value,
    dbUserData: userData,
  });
};
</script>
<template>
  <div class="c-register">
    <h1 class="c-register__title">Register</h1>
    <form @submit.prevent="handleSubmit" class="c-register__form">
      <div class="c-field__group">
        <label class="c-field__label" for="register-email">Email</label>
        <input
          type="email"
          class="c-register__input"
          placeholder="email"
          v-model="email"
          id="register-email"
          required
        />
      </div>
      <div class="c-field__group">
        <label class="c-field__label" for="register-email">Password</label>
        <input
          type="password"
          class="c-register__input"
          placeholder="password"
          v-model="password"
          id="register-email"
          required
        />
      </div>
      <div class="c-field__group">
        <label class="c-field__label" for="playersNumber"
          >How many players?</label
        >
        <select
          class="c-field__select"
          v-model="playersNumber"
          name="playersNumber"
          id="playersNumber"
          required
        >
          <option value="2" selected>2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <div
        class="c-field__group"
        v-for="(name, i) in playerInputsArray"
        :key="'name' + i"
      >
        <label class="c-field__label" :for="'playername' + i + 1"
          >Player {{ i + 1 }}</label
        >
        <input
          type="text"
          class="c-register__input"
          placeholder="name"
          v-model="playerInputs[i]"
          :id="'playername' + i + 1"
          required
        />
      </div>
      <input type="submit" class="c-register__submit" value="Register" />
      <p class="c-register__cta">
        Already registered?
        <router-link to="/login" class="c-register__link">Login</router-link>
      </p>
    </form>
  </div>
</template>
