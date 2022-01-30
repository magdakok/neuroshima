<template>
  <div class="wrapper">
    <MainPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainPage from "@/components/MainPage.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    MainPage,
  },
});
</script>
<style lang="scss">
.wrapper {
  max-width: 900px;
  margin: 0 auto;
}
</style>
