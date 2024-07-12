<script setup>
import { ref, onMounted } from "vue";
import AddDeveloperModal from "@/components/AddDeveloperModal.vue";
import profileImage from "@/assets/image/profile.png";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useDeveloperStore } from "@/modules/developer.js";
import { useTicketStore } from "@/modules/ticket.js";
library.add(faEllipsisVertical);

const developerStore = useDeveloperStore();
const ticketStore = useTicketStore();
const developers = ref(null);
const tickets = ref([]);

const showModal = ref(false);
const activeDropdown = ref(null);

const addNewDeveloper = (payload) => {
  developerStore
    .setStoreDeveloper(payload)
    .then(() => {
      closeModal();
      fetchDevelopers();
    })
    .catch((error) => {
      console.error("Failed to add new developer:", error);
    });
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const toggleDropdown = (id) => {
  activeDropdown.value = activeDropdown.value === id ? null : id;
};

const fetchDevelopers = () => {
  developerStore.setLoadDeveloper().then(() => {
    developers.value = developerStore.getLoadDeveloper;
  });
};

onMounted(fetchDevelopers);
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h2 class="text-3xl font-bold mb-8 text-blue-600">Developers Overview</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        v-for="(developer, index) in developers"
        :key="developer.id"
        class="relative bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
      >
        <div class="absolute top-4 right-4 text-gray-400 cursor-pointer">
          <font-awesome-icon
            icon="ellipsis-vertical"
            @click="toggleDropdown(developer.id)"
          />
          <div
            v-if="activeDropdown === developer.id"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
          >
            <ul class="text-center">
              <li
                @click="editDeveloper(developer)"
                class="px-4 py-2 hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
              >
                Edit
              </li>
              <li
                @click="deleteDeveloper(developer.id)"
                class="px-4 py-2 hover:bg-red-100 hover:text-red-600 cursor-pointer"
              >
                Delete
              </li>
            </ul>
          </div>
        </div>
        <img
          src="@/assets/image/profile.png"
          alt="Developer Image"
          class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
        />
        <h3 class="font-semibold text-xl mb-2">
          {{ developer.first_name }} {{ developer.last_name }}
        </h3>
        <p class="text-gray-600 mb-4">{{ developer.position }}</p>
        <div class="flex justify-center mb-4 space-x-4">
          <div class="text-center">
            <p class="text-red-600 font-semibold text-xl">
              {{ developer.activeTickets }}
            </p>
            <p class="text-gray-500">Active</p>
          </div>
          <div class="text-center">
            <p class="text-yellow-600 font-semibold text-xl">
              {{ developer.ongoingTickets }}
            </p>
            <p class="text-gray-500">On-going</p>
          </div>
          <div class="text-center">
            <p class="text-green-600 font-semibold text-xl">
              {{ developer.closedTickets }}
            </p>
            <p class="text-gray-500">Closed</p>
          </div>
        </div>
        <button
          class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          View Profile
        </button>
      </div>

      <div
        @click="openModal"
        class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-center"
      >
        <div class="text-gray-400 text-6xl">+</div>
        <p class="text-blue-600 font-semibold mt-4">Add New</p>
      </div>
    </div>

    <AddDeveloperModal
      :show="showModal"
      :onClose="closeModal"
      :onSave="addNewDeveloper"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
