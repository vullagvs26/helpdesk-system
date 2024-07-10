<template>
  <div class="flex h-screen bg-gray-200">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Navbar />
      <router-view class="flex-1 overflow-hidden" />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Sidebar,
    Navbar,
  },
};
</script>

<style scoped>
/* Ensure the router-view does not cause extra scroll */
.flex-1 {
  overflow: hidden;
}
</style>
