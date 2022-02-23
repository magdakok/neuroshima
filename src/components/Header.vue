<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { getAuth, signOut } from "firebase/auth";

const props = defineProps({
  loggedIn: { type: Boolean, required: true },
});

const handleLogOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      //TODO: reset all numbers and arrays
    })
    .catch((error) => {
      // An error happened.
    });
};
</script>
<template>
  <header v-if="loggedIn" class="c-header">
    Profile | <button @click="handleLogOut">Log out</button>
  </header>
  <header v-else class="c-header">
    <router-link to="/" class="c-header__link">Logo</router-link> |
    <router-link to="/register" class="c-header__link">Sign in</router-link> |
    <router-link to="/login" class="c-header__link">Login</router-link>
  </header>
</template>