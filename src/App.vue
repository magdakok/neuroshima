<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const store = useStore();

onBeforeMount(() => {
  store.dispatch("authAction");
});
</script>

<template>
  <Header />
  <main class="c-main">
    <router-view />
  </main>
  <Footer />
</template>

<style lang="scss">
html {
}
</style>
