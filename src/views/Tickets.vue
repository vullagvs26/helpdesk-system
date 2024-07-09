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
          <tr v-for="(ticket, i) in ticketStore.getLoadTicket" :key="i" class="border-t border-b">
            <td class="py-2 px-4 border-b">{{ ticket.ticket_no }}</td>
            <td class="py-2 px-4 border-b">{{ ticket.type_of_ticket }}</td>
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
              <button @click="deleteTicket(ticket.id)">
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
          <input type="text" id="number" v-model="editTicket.ticket_no" class="border bg-gray-400 border-gray-300 p-2 rounded" readonly />
        </div>
        <div class="flex flex-col mb-4">
          <label for="assignedTo" class="font-semibold">Assigned To</label>
          <input type="text" id="assignedTo" v-model="editTicket.type_of_ticket" class="border bg-gray-400 border-gray-300 p-2 rounded" readonly />
        </div>
        <div class="flex flex-col mb-4">
          <label for="description" class="font-semibold">Short Description</label>
          <input type="text" id="description" v-model="editTicket.description" class="border border-gray-300 p-2 rounded" />
        </div>
        <div class="flex flex-col mb-4">
          <label for="status" class="font-semibold">Status</label>
          <select id="status" v-model="editTicket.status" class="border border-gray-300 p-2 rounded">
            <option value="Active">Active</option>
            <option value="On-going">On-going</option>
            <option value="Closed">Closed</option>
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

<script setup>
import { useTicketStore } from "@/modules/ticket.js";
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faEdit, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faEdit, faCheck, faTimes);

// Modal state and functions
const showModal = ref(false);
const editTicket = ref({});

const openModal = (ticket) => {
  editTicket.value = { ...ticket };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

// Access the store
const ticketStore = useTicketStore();

// Load tickets when component mounts
onMounted(() => {
  ticketStore.setLoadTicket()
    .then(() => console.log('Tickets loaded:', ticketStore.getLoadTicket))
    .catch((error) => console.error('Error loading tickets:', error));
});

// Delete ticket action
const deleteTicket = (ticketId) => {
  ticketStore.setDeleteTicket(ticketId)
    .then(() => {
      // Refresh tickets after deletion (if needed)
      ticketStore.setLoadTicket();
    })
    .catch((error) => {
      console.error('Error deleting ticket:', error);
    });
};

// Save changes function (if needed)
const saveChanges = () => {
  // Implement save changes logic
  closeModal();
};
</script>

<style scoped>
/* Add any additional styling if necessary */
</style>
