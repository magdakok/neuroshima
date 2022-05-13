<script setup lang="ts">
import { onBeforeMount } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { useUserStore } from "@/store/UserStore.js";
const userStore = useUserStore();

onBeforeMount(() => {
  userStore.authAction();
});
</script>

<template>
  <Header />
  <main class="c-main">
    <div class="o-wrapper">
      <router-view />
    </div>
  </main>
  <Footer />
</template>

<style lang="scss">
html {
}
</style>
