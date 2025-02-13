<script setup>
import { onMounted } from "vue";
import { useLoginStore } from "@/stores/LoginStore";

const loginStore = useLoginStore();

onMounted(() => {
  loginStore.checkLogin();
});
</script>

<template>
  <router-view />
</template>