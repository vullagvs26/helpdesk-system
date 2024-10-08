<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-4 text-blue-600">Manage Systems</h2>

    <div class="flex justify-end">
      <div class="flex justify-end mb-4 mr-2">
        <button
          @click="exportSystems"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <font-awesome-icon icon="file-export" class="mr-2" />
          Export Systems
        </button>
      </div>

      <div class="flex justify-end mb-4">
        <button
          @click="openModal"
          class="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
        >
          <font-awesome-icon icon="plus" class="mr-2" />
          Add System
        </button>
      </div>
    </div>

    <!-- Scrollable table container -->
    <div class="overflow-x-auto bg-white rounded-lg shadow-md">
      <table class="min-w-full divide-gray-200">
        <thead class="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              System Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Published At
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Short Description
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(system, index) in systems" :key="index">
            <td class="px-6 py-4 whitespace-nowrap">{{ system.system_name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ system.published_at }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ system.description }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="{
                  'text-green-500': system.status === 'Active',
                  'text-red-500': system.status !== 'Active',
                }"
              >
                {{ system.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
              <button
                @click="editSystem(system)"
                class="text-blue-600 hover:text-blue-900"
              >
                <font-awesome-icon icon="edit" />
              </button>
              <button
                @click="confirmDeleteSystem(system.id)"
                class="text-red-600 hover:text-red-900"
              >
                <font-awesome-icon icon="trash-alt" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add System Modal -->
    <AddSystemModal :show="showModal" @onClose="closeModal" @onSave="addNewSystem" />

    <!-- Edit System Modal -->
    <EditSystemModal
      :show="showEditModal"
      :system="selectedSystem"
      @onClose="closeEditModal"
      @onUpdate="updateSystem"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import AddSystemModal from "@/components/AddSystemModal.vue";
import EditSystemModal from "@/components/EditSystemModal.vue";
import { useSystemStore } from "@/modules/system.js";
import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import axios from "axios";

library.add(faPlus, faEdit, faTrashAlt);

const systemStore = useSystemStore();
const showModal = ref(false);
const systems = ref(null);
const showEditModal = ref(false);
const selectedSystem = ref(null);

//EXPORT
const exportSystems = async () => {
  try {
    const response = await axios.get("/export", {
      responseType: "blob", // Important for handling file downloads
    });

    // Create a blob URL and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "systems.xlsx"); // You can change the filename if needed
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Export failed:", error);
    showToast("Failed to export systems. Please try again.", "#dc3545");
  }
};

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

// Method to open edit modal
const editSystem = (system) => {
  selectedSystem.value = { ...system };
  showEditModal.value = true;
};

// Method to close edit modal
const closeEditModal = () => {
  showEditModal.value = false;
  selectedSystem.value = null; // Reset selectedSystem after modal closes
};

// Method to update system after edit
const updateSystem = (updatedSystem) => {
  systemStore
    .setUpdateSystem(updatedSystem)
    .then(() => {
      closeEditModal();
      fetchSystems();
      showToast("System edited successfully!", "#2563EB");
    })
    .catch((error) => {
      console.error("Failed to update system:", error);
    });
};

// Open and close add modal
const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const addNewSystem = (payload) => {
  systemStore
    .setStoreSystem(payload)
    .then(() => {
      closeModal();
      fetchSystems();
      showToast("System added successfully!", "#28a745");
    })
    .catch((error) => {
      console.error("Failed to add new system:", error);
    });
};

// Confirm and delete system
const confirmDeleteSystem = (systemId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteSystem(systemId);
    }
  });
};

const deleteSystem = (systemId) => {
  systemStore
    .setDeleteSystem(systemId)
    .then(() => {
      fetchSystems();
      showToast("System deleted successfully!", "#dc3545");
    })
    .catch((error) => {
      console.error(`Failed to delete system with ID ${systemId}:`, error);
    });
};

const fetchSystems = () => {
  systemStore.setLoadSystem().then(() => {
    systems.value = systemStore.getLoadSystem;
  });
};

onMounted(fetchSystems);
</script>

<style scoped>
.overflow-x-auto {
  max-height: calc(100vh - 200px);
  overflow-x: auto;
}

.bg-gray-50 {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
