<script setup lang="ts">
// !FPINIA7: importing store
import { useUserStore } from "@/store/UserStore.js";
const userStore = useUserStore();

// !FPINIA8: no need for computed to access Pinia state
// const user = computed(() => store.getters.getUser);

const handleLogOut = () => {
  userStore.logoutAction();
};
</script>
<template>
  <header class="c-header" role="banner">
    <router-link to="/" class="c-header__logo"
      >Neuroshima <span class="visually-hidden">- main page</span></router-link
    >
    <div class="c-header__info">
      <!-- !FPINIA8a: using state -->
      <span v-if="userStore.isUserAuth" class="c-header__user"
        >Logged as {{ userStore.user.email }}</span
      >
      <nav class="c-header__nav" aria-label="Menu">
        <ul class="c-header__nav-list" v-if="userStore.isUserAuth" role="list">
          <li class="c-header__nav-list-item" role="listitem">
            <button class="c-header__btn-link" @click="handleLogOut">
              Log out
            </button>
          </li>
        </ul>
        <ul class="c-header__nav-list" v-else role="list">
          <li class="c-header__nav-list-item" role="listitem">
            <router-link to="/register" class="c-header__link"
              >Register</router-link
            >
          </li>
          <li class="c-header__nav-list-item" role="listitem">
            <router-link to="/login" class="c-header__link">Login</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>