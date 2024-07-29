<template>
  <div class="min-h-screen flex">
    <Sidebar v-if="state.isAuthenticated" class="fixed-sidebar" />
    <div class="flex-1 flex flex-col ml-sidebar">
      <Navbar v-if="state.isAuthenticated" class="fixed-navbar" />
      <div class="flex-1 overflow-auto">
        <router-view class="content-area" />
      </div>
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
.content-area {
  height: calc(100vh - 56px);
}
</style>
