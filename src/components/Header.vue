<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const loggedIn = computed(() => store.getters.isUserAuth);
const user = computed(() => store.getters.getUser);

const handleLogOut = () => {
  store.dispatch("logoutAction");
};
</script>
<template>
  <header v-if="loggedIn" class="c-header">
    Profile - {{ user.email }} | <button @click="handleLogOut">Log out</button>
  </header>
  <header v-else class="c-header">
    <router-link to="/" class="c-header__link">Logo</router-link> |
    <router-link to="/register" class="c-header__link">Sign in</router-link> |
    <router-link to="/login" class="c-header__link">Login</router-link>
  </header>
</template>