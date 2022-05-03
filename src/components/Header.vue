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
  <header class="c-header" role="banner">
    <router-link to="/" class="c-header__logo"
      >Neuroshima <span class="visually-hidden">- main page</span></router-link
    >
    <div class="c-header__info">
      <span v-if="loggedIn" class="c-header__user"
        >Logged as {{ user.email }}</span
      >
      <nav class="c-header__nav" aria-label="Menu">
        <ul class="c-header__nav-list" v-if="loggedIn" role="list">
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