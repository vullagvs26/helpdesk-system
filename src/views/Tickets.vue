<template>
  <div class="p-6 relative">
    <h2 class="text-2xl font-semibold mb-4 text-blue-500">Tickets</h2>

    <div class="mb-6">
      <h3 class="text-xl font-medium mb-2">List of Developers</h3>
      <div class="flex space-x-4">
        <div
          v-for="(developer, index) in developers"
          :key="developer.id"
          class="flex flex-col items-center bg-white shadow-md rounded-lg p-4"
        >
          <img
            :src="developer.profile_photo"
            alt="Developer Image"
            class="w-16 h-16 rounded-full mb-2"
          />
          <p class="font-medium text-center">{{ developer.first_name }}</p>
          <p
            :class="{
              'text-green-500': developer.status === 'Available',
              'text-red-500': developer.status !== 'Available',
            }"
            class="text-sm"
          >
            {{ developer.status }}
          </p>
        </div>
      </div>
    </div>

    <div class="mb-6 flex items-center justify-between max-h-96 overflow-y-auto">
      <div class="flex items-center">
        <h3 class="text-xl font-medium mr-4">Ticket List</h3>
        <div class="relative">
          <select v-model="selectedStatus" class="border rounded-full px-4 py-1">
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="On-going">On-going</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>
      <div class="relative">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search"
          class="border rounded-full pl-4 pr-10 py-1"
        />
        <font-awesome-icon icon="search" class="absolute right-3 top-2 text-gray-400" />
      </div>
    </div>

    <div class="max-h-96 overflow-y-auto">
      <div
        v-for="ticket in filteredTickets"
        :key="ticket.id"
        class="mb-4 p-4 bg-white border border-gray-200 rounded-lg flex justify-between items-center"
      >
        <div class="flex items-center">
          <img :src="ticket.image" alt="Ticket Image" class="w-12 h-12 mr-4" />
          <div>
            <div class="flex">
              <h4 class="font-semibold">{{ ticket.ticket_no }} |</h4>
              <p :class="getStatusColor(ticket.status)" class="ml-2 font-semibold">
                {{ ticket.status }}
              </p>
            </div>

            <p class="text-gray-600">{{ ticket.description }}</p>
            <button class="text-blue-500 mt-2" @click="openTicket(ticket)">Open</button>
          </div>
        </div>
        <button class="text-gray-500 hover:text-red-500" @click="deleteTicket(ticket.id)">
          <font-awesome-icon icon="trash-alt" class="hover:text-red-500" />
          Cancel
        </button>
      </div>
    </div>

    <transition name="slide">
      <div
        v-if="isTicketOpen"
        class="fixed right-0 top-0 bottom-0 w-1/3 bg-white shadow-lg p-4 overflow-y-auto"
      >
        <button @click="closeSlide" class="absolute top-4 right-4 text-gray-500">
          <font-awesome-icon icon="times" class="text-xl" />
        </button>
        <div class="flex items-center">
          <h3 class="text-xl font-semibold">{{ selectedTicket.ticket_no }} -</h3>
          <p class="ml-2" :class="statusClass">{{ selectedTicket.status }}</p>
        </div>
        <h3 class="text-s font-semibold mb-4 text-gray-500">
          {{ selectedTicket.system.system_name }}
        </h3>
        <div class="flex items-center">
          <p class="mr-2"><strong>Assigned to:</strong></p>
          <h3 class="text-l">
            {{ selectedTicket.developer.assigned_to }}
          </h3>
        </div>
        <p class=""><strong>Error:</strong></p>
        <p class="mb-">{{ selectedTicket.description }}</p>
        <div class="flex justify-center">
          <img
            :src="selectedTicket.image"
            alt="Ticket Image"
            class="object-fill h-48 w-96"
          />
        </div>
        <div>
          <p><strong>Resolution Notes:</strong></p>
          <textarea
            v-model="selectedTicket.remarks"
            rows="3"
            class="border rounded-lg p-2 w-full"
            :disabled="selectedTicket.status === 'Closed'"
          ></textarea>
        </div>

        <!-- Select Difficulty Section -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold mb-4">Select Difficulty</h3>
          <div class="flex justify-around">
            <label
              v-for="(option, index) in difficultyOptions"
              :key="index"
              class="flex flex-col items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                v-model="selectedDifficulty"
                :value="option.value"
                class="form-radio h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-400"
                :disabled="selectedTicket.status === 'Closed'"
              />
              <span class="text-lg font-medium text-gray-800">{{ option.label }}</span>
              <span class="text-sm text-gray-500">{{ option.description }}</span>
            </label>
          </div>
        </div>

        <!-- Add more ticket details here if necessary -->

        <div
          class="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200"
        >
          <div class="flex justify-center">
            <button
              v-if="selectedTicket.status === 'Active'"
              @click="startTicket"
              style="flex-basis: 50%"
              class="flex items-center justify-center px-4 bg-green-400 text-white rounded mr-2 hover:bg-green-500 w-full md:w-auto"
            >
              <font-awesome-icon icon="play" class="mr-2" /> Start
            </button>
            <button
              v-if="selectedTicket.status !== 'Closed'"
              @click="closeTicket"
              style="flex-basis: 50%"
              class="flex items-center justify-center px-4 bg-red-500 text-white rounded hover:bg-red-600 w-full md:w-auto"
            >
              <font-awesome-icon icon="times" class="mr-2" /> Close
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faSearch, faTimes, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useDeveloperStore } from "@/modules/developer.js";
import { useTicketStore } from "@/modules/ticket.js";
import moment from "moment";
import Swal from "sweetalert2";

library.add(faTrashAlt, faSearch, faTimes, faPlay);

const developerStore = useDeveloperStore();
const ticketStore = useTicketStore();
const developers = ref(null);
const tickets = ref([]);
const searchQuery = ref("");
const isTicketOpen = ref(false);
const selectedTicket = ref(null);
const selectedSystem = ref(null);
const selectedDifficulty = ref("");
const selectedStatus = ref("all");

const filteredTickets = computed(() => {
  let filtered = tickets.value.filter((ticket) => {
    let matchesStatus =
      selectedStatus.value === "all" || ticket.status === selectedStatus.value;
    let matchesSearch = ticket.ticket_no
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  return filtered;
});

const difficultyOptions = [
  { value: "easy", label: "Easy", description: "below 4hrs" },
  { value: "medium", label: "Medium", description: "4hrs to 16hrs" },
  { value: "hard", label: "Hard", description: "16hrs above" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "text-red-500";
    case "On-going":
      return "text-orange-500";
    case "Closed":
      return "text-green-500";
    default:
      return "";
  }
};

const statusClass = computed(() => {
  if (!selectedTicket.value) return "";
  switch (selectedTicket.value.status) {
    case "Active":
      return "text-red-500";
    case "On-going":
      return "text-orange-500";
    case "Closed":
      return "text-green-500";
    default:
      return "";
  }
});

const fetchDevelopersAndTickets = () => {
  developerStore.setLoadDeveloper().then(() => {
    developers.value = developerStore.getLoadDeveloper;
  });
  ticketStore.setLoadTicket().then(() => {
    tickets.value = ticketStore.getLoadTicket;
  });
};

const openTicket = (ticket) => {
  selectedTicket.value = ticket;
  isTicketOpen.value = true;
};

const closeSlide = (ticket) => {
  isTicketOpen.value = false;
};

const closeTicket = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will lose any unsaved changes!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, close it!",
    cancelButtonText: "No, keep it open",
  }).then((result) => {
    if (result.isConfirmed) {
      const ticketId = selectedTicket.value.id;
      const remarks = selectedTicket.value.remarks || "";
      const completed_at = moment().format("YYYY-MM-DD HH:mm:ss");

      // Get the start time
      const started_at = moment(selectedTicket.value.started_at);

      // Calculate the time difference
      const duration = moment.duration(moment(completed_at).diff(started_at));
      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();

      // Format completed_time as HH:MM
      const completed_time = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;

      // Update the ticket
      ticketStore
        .updateTicketStatus(
          ticketId,
          "Closed",
          remarks,
          started_at.format("YYYY-MM-DD HH:mm:ss"),
          completed_at,
          completed_time
        )
        .then(() => {
          fetchDevelopersAndTickets();
          isTicketOpen.value = false;
        })
        .catch((error) => {
          console.error("Failed to update ticket:", error);
        });
    }
  });
};

const deleteTicket = (ticketId) => {
  ticketStore
    .setDeleteTicket(ticketId)
    .then(() => {
      fetchDevelopersAndTickets();
    })
    .catch((err) => {
      console.error("Failed to delete ticket:", err);
    });
};

const startTicket = () => {
  if (selectedTicket.value && selectedTicket.value.status === "Active") {
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss"); // Get current time

    // Update local state
    selectedTicket.value.status = "On-going";
    selectedTicket.value.started_at = currentTime;

    ticketStore
      .updateTicketStatus(
        selectedTicket.value.id,
        "On-going",
        "",
        currentTime // Send started_at to API
      )
      .then(() => {
        // Update the tickets list locally
        const index = tickets.value.findIndex(
          (ticket) => ticket.id === selectedTicket.value.id
        );
        if (index !== -1) {
          tickets.value[index] = { ...selectedTicket.value }; // Update the specific ticket
        }
        fetchDevelopersAndTickets(); // Refresh the ticket list
        isTicketOpen.value = false; // Close the ticket view
      })
      .catch((error) => {
        console.error("Failed to update ticket status:", error);
      });
  }
};

onMounted(fetchDevelopersAndTickets);
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
