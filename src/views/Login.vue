<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");

const handleSubmit = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(userCredential);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
</script>
<template>
  <div class="c-login">
    <h1 class="c-login__title">Login</h1>
    <form @submit.prevent="handleSubmit" class="c-login__form">
      <input
        type="text"
        class="c-login__input"
        placeholder="email"
        v-model="email"
      />
      <input
        type="password"
        class="c-login__input"
        placeholder="password"
        v-model="password"
      />
      <input type="submit" class="c-login__submit" value="Login" />
      <p class="c-login__cta">
        Need an account?
        <router-link to="/register" class="c-login__link">Register</router-link>
      </p>
    </form>
  </div>
</template>
