<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const router = useRouter();
const route = useRoute();
const loggedIn = ref(false);

onBeforeMount(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      loggedIn.value = false;
    } else if (route.path === "/login" || route.path === "/register") {
      router.replace("/");
      loggedIn.value = true;
      console.log(user);
    } else {
      loggedIn.value = true;
      console.log(user);
    }
  });
});
</script>

<template>
  <Header :loggedIn="loggedIn" />
  <main class="c-main">
    <router-view :loggedIn="loggedIn" />
  </main>
  <Footer />
</template>

<style lang="scss">
html {
}
</style>
