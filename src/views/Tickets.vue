<script setup>
import { ref, computed, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

// Importing images
import profileImage from "@/assets/image/profile.png";
import ticketImage from "@/assets/image/fujitsu-logo.png";
import { useDeveloperStore } from "@/modules/developer.js";
import { useTicketStore } from "@/modules/ticket.js";
import { useSystemStore } from "@/modules/system.js";

library.add(faTrashAlt, faSearch, faTimes);

const developerStore = useDeveloperStore();
const ticketStore = useTicketStore();
const systemStore = useSystemStore();
const developers = ref(null);
const tickets = ref([]);
const systems = ref(null);
const searchQuery = ref("");
const isTicketOpen = ref(false);
const selectedTicket = ref(null);

const ticketsSearch = computed(() => {
  return tickets.value.filter((ticket) =>
    ticket.ticket_no.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
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

const closeTicket = () => {
  isTicketOpen.value = false;
};

onMounted(fetchDevelopersAndTickets);
</script>

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

    <div class="mb-6 flex justify-between items-center">
      <h3 class="text-xl font-medium">Ticket List</h3>
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

    <div>
      <div
        v-for="ticket in ticketsSearch"
        :key="ticket.id"
        class="mb-4 p-4 bg-white border border-gray-200 rounded-lg flex justify-between items-center"
      >
        <div class="flex items-center">
          <img :src="ticket.image" alt="Ticket Image" class="w-12 h-12 mr-4" />
          <div>
            <h4 class="font-semibold">
              {{ ticket.ticket_no }} | {{ ticket.system.system_name }} |
              {{ ticket.full_name }}
            </h4>
            <p class="text-gray-600">{{ ticket.description }}</p>
            <button class="text-blue-500 mt-2" @click="openTicket(ticket)">Open</button>
          </div>
        </div>
        <button class="text-gray-500">
          <font-awesome-icon icon="trash-alt" />
          Cancel
        </button>
      </div>
    </div>

    <transition name="slide">
      <div
        v-if="isTicketOpen"
        class="fixed right-0 top-0 bottom-0 w-1/2 bg-white shadow-lg p-4 overflow-y-auto"
      >
        <button @click="closeTicket" class="absolute top-4 right-4 text-gray-500">
          <font-awesome-icon icon="times" />
        </button>
        <h3 class="text-xl font-semibold mb-4">{{ selectedTicket.full_name }}</h3>
        <img :src="selectedTicket.image" alt="Ticket Image" class="w-24 h-24 mb-4" />
        <p class="mb-4"><strong>Impact:</strong> {{ selectedTicket.impact }}</p>
        <p>{{ selectedTicket.description }}</p>
        <!-- Add more ticket details here if necessary -->
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
