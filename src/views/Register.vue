<script setup lang="ts">
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const email = ref("");
const password = ref("");
const name = ref("");

const handleSubmit = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(userCredential);
      updateProfile(auth.currentUser, {
        displayName: name.value,
      });
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
</script>
<template>
  <div class="c-register">
    <h1 class="c-register__title">Register</h1>
    <form @submit.prevent="handleSubmit" class="c-register__form">
      <input
        type="text"
        class="c-register__input"
        placeholder="email"
        v-model="email"
      />
      <input
        type="password"
        class="c-register__input"
        placeholder="password"
        v-model="password"
      />
      <input
        type="text"
        class="c-register__input"
        placeholder="name"
        v-model="name"
      />
      <input type="submit" class="c-register__submit" value="register" />
      <p class="c-register__cta">
        Already registered?
        <router-link to="/login" class="c-register__link">Login</router-link>
      </p>
    </form>
  </div>
</template>
