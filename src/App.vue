<template>
  <div class="min-h-screen flex">
    <Sidebar v-if="state.isAuthenticated" />
    <div class="flex-1 flex flex-col">
      <Navbar v-if="state.isAuthenticated" />
      <router-view class="flex-1 overflow-hidden" />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
import useAuth from "@/modules/auth";

const { state } = useAuth();
</script>

<style scoped>
/* Ensure the router-view does not cause extra scroll */
.flex-1 {
  overflow: hidden;
}
</style>
