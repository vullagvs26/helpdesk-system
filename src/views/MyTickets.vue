<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faEdit, faCheck);

const tickets = [
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
];
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-blue-500">Manage Tickets</h2>
      <div class="flex items-center border border-blue-500 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Search"
          class="outline-none text-blue-500 bg-gray-200"
        />
        <font-awesome-icon
          :icon="['fas', 'search']"
          class="text-blue-500 ml-2"
        />
      </div>
    </div>
    <div class="overflow-x-auto">
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
              <span
                :class="{
                  'text-red-500': ticket.status === 'Active',
                  'text-yellow-500': ticket.status === 'On-going',
                  'text-green-500': ticket.status === 'Closed',
                }"
              >
                {{ ticket.status }}
              </span>
            </td>
            <td class="py-2 px-4 border-b">
              <button class="mr-2">
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
  </div>
</template>



<style scoped>
/* Add any additional styling if necessary */
</style>
