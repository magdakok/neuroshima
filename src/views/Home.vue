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
const request: Request = reactive({
  activeRequest: false,
  success: null,
  message: null,
  submitBtn: "Save",
});

const handleGameLogEmit = async (payload: Gamelog) => {
  store.dispatch("logGame", payload);
};

const handleSuccess = () => {
  request.activeRequest = true;
  request.success = true;
  request.message = "Saved the score";
  request.submitBtn = "Success!";
};

const handleError = () => {
  request.activeRequest = true;
  request.success = false;
  request.message = "Request couldn't be saved";
  request.submitBtn = "Save";
};

const resetRequest = () => {
  request.activeRequest = false;
  request.success = null;
  request.message = null;
  request.submitBtn = "Save";
};
</script>
<template>
  <ArmiesForm :armies="armies" @resetRequest="resetRequest" />
  <CurrentGameAnonymous v-if="!store.getters.isUserAuth" />
  <CurrentGameLogged
    v-else
    :request="request"
    @handleGameLogEmit="handleGameLogEmit"
  />
</template>