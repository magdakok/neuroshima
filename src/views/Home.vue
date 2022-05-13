<script setup lang="ts">
import { ref, reactive } from "vue";
import ArmiesForm from "@/components/ArmiesForm.vue";
import CurrentGameLogged from "@/components/CurrentGameLogged.vue";
import CurrentGameAnonymous from "@/components/CurrentGameAnonymous.vue";
import dataAllArmies from "@/data-all-armies.json";
import { Request, Gamelog } from "@/types";
import { useUserStore } from "@/store/UserStore.js";
import { useLogStore } from "@/store/LogStore.js";

const userStore = useUserStore();
const logStore = useLogStore();

const armies = ref(dataAllArmies);

const handleGameLogEmit = async (payload: Gamelog) => {
  logStore.logGame(payload);
};
</script>
<template>
  <ArmiesForm :armies="armies" />
  <CurrentGameAnonymous v-if="!userStore.isUserAuth" />
  <CurrentGameLogged v-else @handleGameLogEmit="handleGameLogEmit" />
</template>