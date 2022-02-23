<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { onBeforeMount } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = useRouter();
const route = useRoute();

onBeforeMount(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.replace("/login");
    } else if (route.path === "/login" || route.path === "/register") {
      router.replace("/");
      console.log(user);
    } else {
      console.log(user);
    }
  });
});
</script>

<template>
  <router-view />
</template>

<style lang="scss">
html {
}
</style>
