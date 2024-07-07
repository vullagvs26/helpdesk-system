<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faEdit, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faEdit, faCheck, faTimes);

//sample data
const tickets = ref([
  {
    number: "INC1243124",
    assignedTo: "vincent.vullag@fujitsu.com",
    description: "Can't add new user",
    status: "Active",
  },
  {
    number: "INC1243125",
    assignedTo: "vincent.vullag@fujitsu.com",
    description: "Can't add new user",
    status: "On-going",
  },
  {
    number: "INC1243126",
    assignedTo: "vincent.vullag@fujitsu.com",
    description: "Can't add new user",
    status: "Closed",
  },
]);

//modal function
const showModal = ref(false);
const editTicket = ref({});

const openModal = (ticket) => {
  editTicket.value = { ...ticket };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveChanges = () => {
  const index = tickets.value.findIndex(t => t.number === editTicket.value.number);
  if (index !== -1) {
    tickets.value[index] = { ...editTicket.value };
  }
  closeModal();
};
</script>


<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-blue-500">Manage Tickets</h2>
      <div class="flex items-center border border-blue-500 rounded-full px-4 py-2">
        <input type="text" placeholder="Search" class="outline-none text-blue-500 bg-gray-200" />
        <font-awesome-icon :icon="['fas', 'search']" class="text-blue-500 ml-2" />
      </div>
    </div>
    <div class="overflow-x-auto shadow-lg">
      <table class="min-w-full bg-white border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-2 px-4 border-b">Ticket No.</th>
            <th class="py-2 px-4 border-b">Assigned To</th>
            <th class="py-2 px-4 border-b">Short Description</th>
            <th class="py-2 px-4 border-b">Status</th>
            <th class="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(ticket, index) in tickets" :key="index">
            <td class="py-2 px-4 border-b">{{ ticket.number }}</td>
            <td class="py-2 px-4 border-b">{{ ticket.assignedTo }}</td>
            <td class="py-2 px-4 border-b">{{ ticket.description }}</td>
            <td class="py-2 px-4 border-b">
              <span :class="{
                  'text-red-500': ticket.status === 'Active',
                  'text-yellow-500': ticket.status === 'On-going',
                  'text-green-500': ticket.status === 'Closed',
                }">
                {{ ticket.status }}
              </span>
            </td>
            <td class="py-2 px-4 border-b">
              <button class="mr-2" @click="openModal(ticket)">
                <font-awesome-icon :icon="['fas', 'edit']" class="text-blue-500" />
              </button>
              <button>
                <font-awesome-icon :icon="['fas', 'check']" class="text-green-500" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Ticket Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-1/3">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Edit Ticket</h3>
          <button @click="closeModal">
            <font-awesome-icon :icon="['fas', 'times']" />
          </button>
        </div>
        <div class="flex flex-col mb-4">
          <label for="number" class="font-semibold">Ticket No.</label>
          <input type="text" id="number" v-model="editTicket.number" class="border bg-gray-400 border-gray-300 p-2 rounded" readonly />
        </div>
        <div class="flex flex-col mb-4">
          <label for="assignedTo" class="font-semibold">Assigned To</label>
          <input type="text" id="assignedTo" v-model="editTicket.assignedTo" class="border bg-gray-400 border-gray-300 p-2 rounded"  readonly/>
        </div>
        <div class="flex flex-col mb-4">
          <label for="description" class="font-semibold">Short Description</label>
          <input type="text" id="description" v-model="editTicket.description" class="border border-gray-300 p-2 rounded" />
        </div>
        <div class="flex flex-col mb-4">
          <label for="status" class="font-semibold">Status</label>
          <select id="status" v-model="editTicket.status" class="border border-gray-300 p-2 rounded">
            <option value="Active">Active</option>
            
          </select>
        </div>
        <div class="flex justify-end">
          <button @click="saveChanges" class="bg-blue-500 text-white py-2 px-4 rounded mr-2">Save</button>
          <button @click="closeModal" class="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Add any additional styling if necessary */
</style>
