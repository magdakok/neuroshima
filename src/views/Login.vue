<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/UserStore.js";
const userStore = useUserStore();

const email = ref("");
const password = ref("");

const handleSubmit = () => {
  userStore.loginAction({
    email: email.value,
    password: password.value,
  });
};
</script>
<template>
  <div class="c-login">
    <h1 class="c-login__title">Login</h1>
    <form @submit.prevent="handleSubmit" class="c-login__form">
      <div class="c-field__group">
        <label class="c-field__label" for="login-email">Email</label>
        <input
          type="email"
          class="c-login__input"
          placeholder="email"
          v-model="email"
          id="login-email"
        />
      </div>
      <div class="c-field__group">
        <label class="c-field__label" for="login-password">Password</label>
        <input
          type="password"
          class="c-login__input"
          placeholder="password"
          v-model="password"
          id="login-password"
        />
      </div>
      <div class="c-field__group">
        <input type="submit" class="c-login__submit" value="Login" />
      </div>
      <p class="c-login__cta">
        Need an account?
        <router-link to="/register" class="c-login__link">Register</router-link>
      </p>
    </form>
  </div>
</template>
