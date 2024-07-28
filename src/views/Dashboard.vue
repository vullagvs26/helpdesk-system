<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container bg-gray-100 p-8">
      <h2 class="text-2xl font-semibold mb-4 text-blue-600">Ticket Overview</h2>

      <div class="flex flex-wrap gap-4 mb-8">
        <div
          class="stat-card bg-white rounded-lg shadow-lg p-6 text-center flex-1 min-w-[200px]"
        >
          <h3 class="stat-title text-lg font-medium text-gray-700">
            Active Tickets Today
          </h3>
          <p class="stat-number text-red-600 text-4xl font-bold">
            {{ activeTickets }}
          </p>
        </div>
        <div
          class="stat-card bg-white rounded-lg shadow-lg p-6 text-center flex-1 min-w-[200px]"
        >
          <h3 class="stat-title text-lg font-medium text-gray-700">On-going</h3>
          <p class="stat-number text-yellow-500 text-4xl font-bold">
            {{ ongoingTickets }}
          </p>
        </div>
        <div
          class="stat-card bg-white rounded-lg shadow-lg p-6 text-center flex-1 min-w-[200px]"
        >
          <h3 class="stat-title text-lg font-medium text-gray-700">Closed</h3>
          <p class="stat-number text-green-500 text-4xl font-bold">
            {{ closedTickets }}
          </p>
        </div>
      </div>

      <div class="flex flex-wrap gap-4 mb-8">
        <div
          class="bg-white rounded-lg shadow-lg p-6 flex-1 min-w-[300px] h-[500px] flex items-center justify-center"
        >
          <div class="w-800px">
            <h3 class="text-lg font-medium text-gray-700 mb-4 text-center">
              Tickets by Priority
            </h3>
            <canvas id="ticketsByPriority"></canvas>
          </div>
        </div>
        <div
          class="bg-white rounded-lg shadow-lg p-6 flex-1 min-w-[250px] h-[500px] flex items-center justify-center"
        >
          <div class="w-full">
            <h3 class="text-lg font-medium text-gray-700 mb-4 text-center">
              Tickets by Type
            </h3>
            <canvas id="ticketsByType"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTicketStore } from "@/modules/ticket";
import Chart from "chart.js/auto";

const ticketStore = useTicketStore();

const activeTickets = ref(0);
const ongoingTickets = ref(0);
const closedTickets = ref(0);

const loadTickets = async () => {
  try {
    await ticketStore.setLoadTicket();
    updateTicketCounts();
    renderCharts();
  } catch (err) {
    console.error("Failed to load tickets", err);
  }
};

const updateTicketCounts = () => {
  activeTickets.value = ticketStore.items.filter(
    (ticket) => ticket.status === "Active"
  ).length;
  ongoingTickets.value = ticketStore.items.filter(
    (ticket) => ticket.status === "On-going"
  ).length;
  closedTickets.value = ticketStore.items.filter(
    (ticket) => ticket.status === "Closed"
  ).length;
};

const renderCharts = () => {
  // Tickets by Priority
  const ticketPriorities = ["Low", "Medium", "High"];
  const ticketsByPriorityData = ticketPriorities.map((priority) => {
    return ticketStore.items.filter((ticket) => ticket.impact === priority)
      .length;
  });

  const ticketsByPriorityCtx = document
    .getElementById("ticketsByPriority")
    .getContext("2d");
  new Chart(ticketsByPriorityCtx, {
    type: "doughnut",
    data: {
      labels: ticketPriorities,
      datasets: [
        {
          data: ticketsByPriorityData,
          backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        },
      ],
    },
  });

  // Tickets by Type
  const ticketTypes = ticketStore.items.reduce((acc, ticket) => {
    acc[ticket.type_of_ticket] = (acc[ticket.type_of_ticket] || 0) + 1;
    return acc;
  }, {});

  const ticketsByTypeCtx = document
    .getElementById("ticketsByType")
    .getContext("2d");
  new Chart(ticketsByTypeCtx, {
    type: "bar",
    data: {
      labels: Object.keys(ticketTypes),
      datasets: [
        {
          label: "Number of Tickets",
          data: Object.values(ticketTypes),
          backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        },
      ],
    },
  });
};

onMounted(loadTickets);
</script>

<style scoped>
body {
  font-family: "Inter", sans-serif;
}

.dashboard-wrapper {
  overflow-y: hidden; /* Prevent the entire page from scrolling */
}

.dashboard-container {
  max-width: 1650px;
  margin: 0 auto;
  overflow-y: auto; /* Make the dashboard container scrollable */
  height: calc(100vh - 4rem); /* Adjust the height as needed */
}

.stat-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.text-blue-600 {
  color: #1e88e5;
}

.text-gray-700 {
  color: #4a5568;
}
</style>
