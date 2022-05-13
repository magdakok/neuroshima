<script setup lang="ts">
import { ref, reactive } from "vue";
import ArmiesForm from "@/components/ArmiesForm.vue";
import CurrentGameLogged from "@/components/CurrentGameLogged.vue";
import CurrentGameAnonymous from "@/components/CurrentGameAnonymous.vue";
import dataAllArmies from "@/data-all-armies.json";
import { Request, Gamelog } from "@/types";
import { useStore } from "vuex";

const store = useStore();

const armies = ref(dataAllArmies);

const handleGameLogEmit = async (payload: Gamelog) => {
  store.dispatch("logGame", payload);
};
</script>
<template>
  <ArmiesForm :armies="armies" />
  <CurrentGameAnonymous v-if="!store.getters.isUserAuth" />
  <CurrentGameLogged v-else @handleGameLogEmit="handleGameLogEmit" />
</template>