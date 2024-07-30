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
            @click="openImageModal(developer.profile_photo)"
            
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
          <img 
            :src="ticket.image" 
            alt="Ticket Image" 
            class="w-12 h-12 mr-4 cursor-pointer" 
            @click="openImageModal(ticket.image)"
          />
          <div>
            <div class="flex">
              <h4 class="font-semibold">{{ ticket.ticket_no }} |</h4>
              <p :class="getStatusColor(ticket.status)" class="ml-2 font-semibold">
                {{ ticket.status }}
              </p>
            </div>
            <p class="text-gray-600">{{ ticket.system.system_name }}</p>
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
            class="object-fill h-40 w-96 cursor-pointer"
            @click="openImageModal(selectedTicket.image)" 
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
        <div class="">
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

        <!-- Timeline Section -->
        <div class="flex flex-col items-center">
          <h3 class="text-xl font-semibold mb-4">Timeline</h3>
          <div class="relative border-l border-gray-300">
            <div
              v-for="(event, index) in timelineEvents"
              :key="index"
              class="flex items-start"
            >
              <div class="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5" />
              <div class="ml-4">
                <h4 class="font-semibold">{{ event.title }}</h4>
                <p class="text-sm text-gray-500">{{ event.date }}</p>
                <p class="text-gray-600">{{ event.time }}</p>
              </div>
            </div>
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

    <!-- Image Modal -->
    <div v-if="isImageModalOpen" class="modal fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div class="modal-content bg-white p-6 relative">
        <span class="close absolute top-4 right-4 text-3xl cursor-pointer" @click="closeImageModal">&times;</span>
        <img :src="modalImageSrc" alt="Modal Image" class="modal-image" />
      </div>
    </div>
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
const developers = ref([]);
const tickets = ref([]);
const searchQuery = ref("");
const selectedTicket = ref(null);
const isTicketOpen = ref(false);
const difficulty = ref("");
const selectedStatus = ref("all");
const isImageModalOpen = ref(false);
const modalImageSrc = ref("");
const selectedDifficulty = ref(""); 

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

const timelineEvents = computed(() => {
  if (!selectedTicket.value) return [];

  const events = [];

  if (selectedTicket.value.created_at) {
    const createdAt = moment(selectedTicket.value.created_at);
    events.push({
      title: "Created At",
      date: createdAt.format("YYYY-MM-DD"),
      time: createdAt.format("HH:mm:ss"),
    });
  }

  if (selectedTicket.value.started_at) {
    const startedAt = moment(selectedTicket.value.started_at);
    events.push({
      title: "Started At",
      date: startedAt.format("YYYY-MM-DD"),
      time: startedAt.format("HH:mm:ss"),
    });
  }

  if (selectedTicket.value.completed_at) {
    const completedAt = moment(selectedTicket.value.completed_at);
    events.push({
      title: "Completed At",
      date: completedAt.format("YYYY-MM-DD"),
      time: completedAt.format("HH:mm:ss"),
    });
  }

  if (selectedTicket.value.completed_time) {
    const completedTime = selectedTicket.value.completed_time;
    events.push({
      title: "Completed Time",
      date: "",
      time: completedTime,
    });
  }

  return events;
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

const openTicket = async (ticket) => {
  selectedTicket.value = ticket;
  isTicketOpen.value = true;
  await fetchDevelopersAndTickets();
};

const closeSlide = () => {
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

      const started_at = moment(selectedTicket.value.started_at);
      const duration = moment.duration(moment(completed_at).diff(started_at));
      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      const completed_time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      ticketStore.updateTicketStatus(
        ticketId,
        "Closed",
        remarks,
        started_at.format("YYYY-MM-DD HH:mm:ss"),
        completed_at,
        completed_time
      )
      .then(() => {
        if (selectedTicket.value.developer) {
          const developerId = selectedTicket.value.developer.id;
          return developerStore.setUpdateDeveloper({
            id: developerId,
            status: "Available",
          });
        }
      })
      .then(() => {
        fetchDevelopersAndTickets();
        isTicketOpen.value = false;
      })
      .catch((error) => {
        console.error("Failed to update ticket or developer status:", error);
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
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    ticketStore
      .updateTicketStatus(
        selectedTicket.value.id,
        "On-going",
        "",
        currentTime
      )
      .then(() => {
        const developerId = selectedTicket.value.developer.id;
        return developerStore.setUpdateDeveloper({
          id: developerId,
          status: "Busy",
        });
      })
      .then(() => {
        const index = tickets.value.findIndex(
          (ticket) => ticket.id === selectedTicket.value.id
        );
        if (index !== -1) {
          tickets.value[index] = { ...selectedTicket.value };
        }
        fetchDevelopersAndTickets();
        isTicketOpen.value = false;
      })
      .catch((error) => {
        console.error("Failed to update status:", error);
      });
  }
};

const openImageModal = (imageSrc) => {
  modalImageSrc.value = imageSrc;
  isImageModalOpen.value = true;
};

const closeImageModal = () => {
  isImageModalOpen.value = false;
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

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90vw; /* Increased max-width to 90% of viewport width */
  max-height: 90vh; /* Increased max-height to 90% of viewport height */
  overflow: hidden;
}

.close {
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
}

.close:hover {
  color: red;
}

.modal-content img {
  width: 100%;
  height: auto;
  object-fit: contain; /* Ensures image fits within modal while preserving aspect ratio */
}
</style>
