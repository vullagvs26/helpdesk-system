<template>
  <div class="p-8 bg-gray-100 h-full">
    <h2 class="text-3xl font-bold mb-8 text-blue-600">Developers Overview</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
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
                @click="confirmDeleteDeveloper(developer.id)"
                class="px-4 py-2 hover:bg-red-100 hover:text-red-600 cursor-pointer"
              >
                Delete
              </li>
            </ul>
          </div>
        </div>
        <img
          :src="
            developer.profile_photo
              ? `${developer.profile_photo}`
              : defaultProfilePhoto
          "
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
        <span
          class="px-4 py-2 rounded-full text-sm font-semibold"
          :class="{
            'bg-green-100 text-green-600': developer.status === 'Available',
            'bg-red-100 text-red-600': developer.status === 'Busy',
          }"
        >
          {{ developer.status }}
        </span>
      </div>
    </div>

    <EditDeveloperModal
      :show="showEditModal"
      :developerData="selectedDeveloper"
      @close="closeEditModal"
      @save="saveEditedDeveloper"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EditDeveloperModal from "@/components/EditDeveloperModal.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useDeveloperStore } from "@/modules/developer.js";
import defaultProfilePhoto from "@/assets/image/default-profile.png";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Swal from "sweetalert2";

library.add(faEllipsisVertical);

const developerStore = useDeveloperStore();
const developers = ref(null);
const showEditModal = ref(false);
const activeDropdown = ref(null);
const selectedDeveloper = ref(null);

// Show toast notifications
const showToast = (message, backgroundColor) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: { background: backgroundColor },
    stopOnFocus: true,
  }).showToast();
};

// Edit Developer
const editDeveloper = (developer) => {
  selectedDeveloper.value = { ...developer };
  showEditModal.value = true;
};

// Save Edited Developer
const saveEditedDeveloper = (payload) => {
  developerStore
    .setUpdateDeveloper(payload)
    .then(() => {
      closeEditModal();
      fetchDevelopers();
      showToast("Developer edited successfully!", "#2563EB");
    })
    .catch((error) => {
      console.error("Failed to save edited developer:", error);
    });
};

// Confirm and delete Developer
const confirmDeleteDeveloper = (developerId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteDeveloper(developerId);
    }
  });
};

const deleteDeveloper = (developerId) => {
  developerStore
    .setDeleteDeveloper(developerId)
    .then(() => {
      fetchDevelopers();
      showToast("Developer deleted successfully!", "#dc3545");
    })
    .catch((error) => {
      console.error(`Failed to delete developer with ID ${developerId}:`, error);
    });
};

// Open and close edit modal
const openEditModal = () => {
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  selectedDeveloper.value = null;
};

// Toggle Dropdown
const toggleDropdown = (id) => {
  activeDropdown.value = activeDropdown.value === id ? null : id;
};

// Fetch Developers
const fetchDevelopers = () => {
  developerStore.setLoadDeveloper().then(() => {
    developers.value = developerStore.getLoadDeveloper;
  });
};

onMounted(fetchDevelopers);
</script>

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
