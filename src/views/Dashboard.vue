<script setup>
import { ref } from "vue";

// Sample retrieve data
const activeTickets = ref(3);
const ongoingTickets = ref(4);
const closedTickets = ref(0);
</script>

<template>
  <div class="dashboard-container p-6">
    <h2 class="text-2xl font-semibold mb-4 text-blue-600">Ticket Overview</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        class="stat-card bg-white rounded-lg shadow-md p-6 text-center transition-transform transition-shadow hover:transform hover:-translate-y-1 hover:shadow-lg"
      >
        <h3 class="stat-title text-lg font-medium">Active Ticket Today</h3>
        <p class="stat-number text-red-600 text-4xl font-bold">
          {{ activeTickets }}
        </p>
      </div>
      <div
        class="stat-card bg-white rounded-lg shadow-md p-6 text-center transition-transform transition-shadow hover:transform hover:-translate-y-1 hover:shadow-lg"
      >
        <h3 class="stat-title text-lg font-medium">On-going</h3>
        <p class="stat-number text-4xl font-bold">{{ ongoingTickets }}</p>
      </div>
      <div
        class="stat-card bg-white rounded-lg shadow-md p-6 text-center transition-transform transition-shadow hover:transform hover:-translate-y-1 hover:shadow-lg"
      >
        <h3 class="stat-title text-lg font-medium">Closed</h3>
        <p class="stat-number text-4xl font-bold">{{ closedTickets }}</p>
      </div>
    </div>
  </div>
</template>
