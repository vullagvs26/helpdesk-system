<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-4 text-blue-600">Manage Systems</h2>

    <div class="flex justify-end mb-4">
      <button
        @click="openModal"
        class="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <font-awesome-icon icon="plus" class="mr-2" />
        Add System
      </button>
    </div>

    <!-- Scrollable table container -->
    <div class="overflow-x-auto bg-white rounded-lg shadow-md">
      <table class="min-w-full divide-y divide-gray-200">
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
                @click="deleteSystem(system.id)"
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

library.add(faPlus, faEdit, faTrashAlt);

const systemStore = useSystemStore();
const showModal = ref(false);
const systems = ref(null);
const showEditModal = ref(false);
const selectedSystem = ref(null);

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
  // Call your store action to update the system
  systemStore
    .setUpdateSystem(updatedSystem)
    .then(() => {
      closeEditModal();
      fetchSystems();
    })
    .catch((error) => {
      console.error("Failed to update system:", error);
    });
};

//open and close model
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
    })
    .catch((error) => {
      console.error("Failed to add new system:", error);
    });
};

const deleteSystem = (systemId) => {
  systemStore
    .setDeleteSystem(systemId)
    .then(() => {
      fetchSystems();
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
