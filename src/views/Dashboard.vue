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
          class="chart-container bg-white rounded-lg shadow-lg p-6 flex-1 min-w-[300px] h-[500px] flex flex-col items-center justify-center"
        >
          <h3 class="text-lg font-medium text-gray-700 mb-4 text-center">
            Tickets by Priority
          </h3>
          <canvas id="ticketsByPriority" class="chart-canvas"></canvas>
        </div>
        <div
          class="chart-container bg-white rounded-lg shadow-lg p-6 flex-1 min-w-[250px] h-[500px] flex flex-col items-center justify-center"
        >
          <h3 class="text-lg font-medium text-gray-700 mb-4 text-center">
            Tickets by Type
          </h3>
          <canvas id="ticketsByType" class="chart-canvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useTicketStore } from '@/modules/ticket';
import Chart from 'chart.js/auto';

const ticketStore = useTicketStore();

const activeTickets = ref(0);
const ongoingTickets = ref(0);
const closedTickets = ref(0);

const loadTickets = async () => {
  try {
    await ticketStore.setLoadTicket();
    updateTicketCounts();
    await nextTick(); // Ensure the DOM has been updated
    setTimeout(() => {
      renderCharts(); // Delay to ensure DOM and charts are updated
    }, 100); // Adjust if necessary
  } catch (err) {
    console.error('Failed to load tickets', err);
  }
};

const updateTicketCounts = () => {
  activeTickets.value = ticketStore.items.filter(
    (ticket) => ticket.status === 'Active'
  ).length;
  ongoingTickets.value = ticketStore.items.filter(
    (ticket) => ticket.status === 'On-going'
  ).length;
  closedTickets.value = ticketStore.items.filter(
    (ticket) => ticket.status === 'Closed'
  ).length;
};

const renderCharts = () => {
  console.log('Rendering charts...');

  const ticketsByPriorityCanvas = document.getElementById('ticketsByPriority');
  const ticketsByTypeCanvas = document.getElementById('ticketsByType');

  if (ticketsByPriorityCanvas && ticketsByTypeCanvas) {
    console.log('Canvas elements found.');

    const ticketPriorities = ['Low', 'Medium', 'High'];
    const ticketsByPriorityData = ticketPriorities.map((priority) => {
      return ticketStore.items.filter((ticket) => ticket.impact === priority)
        .length;
    });

    console.log('Tickets by Priority Data:', ticketsByPriorityData);

    const ticketsByPriorityCtx = ticketsByPriorityCanvas.getContext('2d');
    new Chart(ticketsByPriorityCtx, {
      type: 'doughnut',
      data: {
        labels: ticketPriorities,
        datasets: [
          {
            data: ticketsByPriorityData,
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    const ticketTypes = ticketStore.items.reduce((acc, ticket) => {
      acc[ticket.type_of_ticket] = (acc[ticket.type_of_ticket] || 0) + 1;
      return acc;
    }, {});

    console.log('Tickets by Type Data:', ticketTypes);

    const ticketsByTypeCtx = ticketsByTypeCanvas.getContext('2d');
    new Chart(ticketsByTypeCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(ticketTypes),
        datasets: [
          {
            label: 'Number of Tickets',
            data: Object.values(ticketTypes),
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  } else {
    console.error('Canvas elements not found.');
  }
};

onMounted(loadTickets);
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
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

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.chart-canvas {
  width: 90% !important;
  height: 90% !important;
}
</style>
