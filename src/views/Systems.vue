<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-4 text-blue-600">Manage Systems</h2>
    
    <div class="flex justify-end mb-4">
      <button @click="openModal" class="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
        <font-awesome-icon icon="plus" class="mr-2" />
        Add System
      </button>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow-md">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              System Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Published At
            </th>
             <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Short Description
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(system, i) in systemStore.getLoadSystem" :key="i">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ system.system_name }}
            </td>
             <td class="px-6 py-4 whitespace-nowrap">
              {{ system.published_at }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ system.description }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="{'text-green-500': system.status === 'Active', 'text-red-500': system.status !== 'Active'}">
                {{ system.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap flex items-center">
              <button @click="editSystem(system)" class="text-blue-600 hover:text-blue-900 mr-4">
                <font-awesome-icon icon="edit" />
              </button>
              <button @click="deleteSystem(system)" class="text-red-600 hover:text-red-900">
                <font-awesome-icon icon="trash-alt" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AddSystemModal :show="showModal" @onClose="closeModal" @onSave="addNewSystem" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AddSystemModal from '@/components/AddSystemModal.vue';
import { useSystemStore } from "@/modules/system.js";

library.add(faPlus, faEdit, faTrashAlt);

const systemStore = useSystemStore();
const system = ref(null); 

const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

onMounted(() => {
  systemStore.setLoadSystem().then(() => {
    //display the first system in the list initially
    if (systemStore.getLoadSystem.length > 0) {
      system.value = systemStore.getLoadSystem[0];
    }
  });
});
</script>

<style scoped>
/* Add your scoped styles here */
</style>
