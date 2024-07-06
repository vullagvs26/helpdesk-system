<template>
  <div class="flex h-screen bg-gray-200">
    <Sidebar />
    <div class="flex-1">
      <Navbar />
      <router-view />
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
/* Add any component-specific styles here */
</style>
