<template>
  <div class="p-6 h-full">
    <div class="flex justify-between">
      <h2 class="text-xl font-bold text-blue-500 mb-4 mt-4">Create a new ticket</h2>
      <button
        type="submit"
        class="mt-4 mb-4 bg-blue-500 text-white py-2 px-4 rounded-full"
        @click="submitTicketForm"
      >
        Send Request
      </button>
    </div>
    <div class="bg-white border shadow-lg rounded-lg p-6 overflow-auto h-5/6">
      <form @submit.prevent="submitTicketForm">
        <div class="grid grid-cols-1 gap-4">
          <!-- Form Fields -->
          <div class="flex flex-col">
            <label for="ticketNo" class="mb-1 font-semibold">Ticket Number</label>
            <input
              type="text"
              id="ticketNo"
              v-model="ticketForm.ticket_no"
              class="border border-gray-300 p-2 rounded"
              placeholder="Enter Ticket Number"
            />
            <span v-if="errors.ticket_no" class="text-red-500">{{ errors.ticket_no[0] }}</span>
          </div>
          <div class="flex flex-col">
            <label for="name" class="mb-1 font-semibold">Your Name</label>
            <input
              type="text"
              id="name"
              v-model="ticketForm.full_name"
              class="border border-gray-300 p-2 rounded"
              placeholder="(Ex: Vullag, Vincent)"
            />
            <span v-if="errors.full_name" class="text-red-500">{{ errors.full_name[0] }}</span>
          </div>
          <div class="flex flex-col">
            <label for="email" class="mb-1 font-semibold">Your Email</label>
            <input
              type="email"
              id="email"
              v-model="ticketForm.email"
              class="border border-gray-300 p-2 rounded"
              placeholder="Input Your Email"
            />
            <span v-if="errors.email" class="text-red-500">{{ errors.email[0] }}</span>
          </div>
          <div class="flex flex-col">
            <label for="typeOfTicket" class="mb-1 font-semibold">Type of Ticket</label>
            <select
              id="typeOfTicket"
              v-model="ticketForm.type_of_ticket"
              class="border border-gray-300 p-2 rounded"
            >
              <option value="" disabled>Select Type of Ticket</option>
              <option v-for="type in ticketTypes" :key="type.id" :value="type.name">
                {{ type.name }}
              </option>
            </select>
            <span v-if="errors.type_of_ticket" class="text-red-500">{{ errors.type_of_ticket[0] }}</span>
          </div>
          <div class="flex flex-col">
            <label for="impact" class="mb-1 font-semibold">Impact</label>
            <select
              id="impact"
              v-model="ticketForm.impact"
              class="border border-gray-300 p-2 rounded"
            >
              <option value="" disabled>Select Impact</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <span v-if="errors.impact" class="text-red-500">{{ errors.impact[0] }}</span>
          </div>
          <div class="flex flex-col">
            <label for="status" class="mb-1 font-semibold">Status</label>
            <select
              id="status"
              v-model="ticketForm.status"
              class="border border-gray-300 p-2 rounded"
            >
              <option value="" disabled>Select Status</option>
              <option v-for="status in ticketStatuses" :key="status.id" :value="status.name">
                {{ status.name }}
              </option>
            </select>
            <span v-if="errors.status" class="text-red-500">{{ errors.status[0] }}</span>
          </div>
          <div class="flex flex-col">
            <label for="systemName" class="mb-1 font-semibold">System Name</label>
            <select
              id="systemName"
              v-model="ticketForm.system_name_id"
              class="border border-gray-300 p-2 rounded"
            >
              <option value="" disabled>Select System</option>
              <option
                v-for="(system, i) in systemStore.getLoadSystem"
                :key="i"
                :value="system.id"
              >
                {{ system.system_name }}
              </option>
            </select>
            <span v-if="errors.system_name_id" class="text-red-500">{{ errors.system_name_id[0] }}</span>
          </div>
          <div class="flex flex-col">
            <label for="assignedTo" class="mb-1 font-semibold">Assigned To</label>
            <select
              id="assignedTo"
              v-model="ticketForm.assigned_to_id"
              class="border border-gray-300 p-2 rounded"
            >
              <option value="" disabled>Select Developer</option>
              <option
                v-for="(developer, i) in developerStore.getLoadDeveloper"
                :key="i"
                :value="developer.id"
              >
                {{ developer.email }}
              </option>
            </select>
            <span v-if="errors.assigned_to_id" class="text-red-500">{{ errors.assigned_to_id[0] }}</span>
          </div>
          <div class="flex flex-col">
            <label for="description" class="mb-1 font-semibold">Short Description</label>
            <textarea
              id="description"
              v-model="ticketForm.description"
              class="border border-gray-300 p-2 rounded"
              rows="4"
              placeholder="Describe your request or error encountered"
            ></textarea>
            <span v-if="errors.description" class="text-red-500">{{ errors.description[0] }}</span>
          </div>
          <!-- Add Image Upload Field -->
          <div class="flex flex-col">
            <label for="image" class="mb-1 font-semibold">Upload Image</label>
            <input
              type="file"
              id="image"
              @change="handleImageUpload"
              class="border border-gray-300 p-2 rounded"
            />
            <span v-if="errors.image" class="text-red-500">{{ errors.image[0] }}</span>
          </div>
          <!-- Preview Uploaded Images -->
          <div class="mt-4 flex space-x-2">
            <img
              v-for="(file, index) in imagePreviews"
              :key="index"
              :src="file.url"
              class="w-26 h-24"
              :alt="file.name"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTicketStore } from '@/modules/ticket.js';  
import { useSystemStore } from '@/modules/system.js';  
import { useDeveloperStore } from '@/modules/developer.js'; 

// Data
const ticketStore = useTicketStore();
const systemStore = useSystemStore();
const developerStore = useDeveloperStore();  

const ticketForm = ref({
  id: null,
  ticket_no: '',
  full_name: '',
  email: '',
  type_of_ticket: '', 
  impact: '',
  status: '',  
  system_name_id: null,
  assigned_to_id: null,  
  description: '',
  image: null, // Add this field for the image file
});

const imagePreviews = ref([]);  // To store image previews
const errors = ref({});

const ticketTypes = ref([
  { id: 1, name: 'Bug' },
  { id: 2, name: 'Feature Request' },
  { id: 3, name: 'Inquiry' },
]);

const ticketStatuses = ref([
  { id: 1, name: 'Active' },
  { id: 2, name: 'On-going' },
  { id: 3, name: 'Closed' },
]);

const clearTicketForm = () => {
  ticketForm.value = {
    id: null,
    ticket_no: '',
    full_name: '',
    email: '',
    type_of_ticket: '',
    impact: '',
    status: '',
    system_name_id: null,
    system_name: '',
    assigned_to_id: null,
    description: '',
    image: null, // Clear the image file
  };
  imagePreviews.value = [];  // Clear the image previews
  errors.value = {};
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Store the file
    ticketForm.value.image = file;

    // Create a preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.value = [{ url: e.target.result, name: file.name }];
    };
    reader.readAsDataURL(file);
  }
};

const submitTicketForm = () => {
  const selectedSystem = systemStore.getLoadSystem.find(system => system.id === ticketForm.value.system_name_id);
  const assignedDeveloper = developerStore.getLoadDeveloper.find(developer => developer.id === ticketForm.value.assigned_to_id);
  
  const formData = new FormData();
  formData.append('ticket_no', ticketForm.value.ticket_no);
  formData.append('full_name', ticketForm.value.full_name);
  formData.append('email', ticketForm.value.email);
  formData.append('type_of_ticket', ticketForm.value.type_of_ticket);
  formData.append('impact', ticketForm.value.impact);
  formData.append('status', ticketForm.value.status);
  formData.append('description', ticketForm.value.description);
  formData.append('system_name_id', ticketForm.value.system_name_id);
  formData.append('assigned_to_id', ticketForm.value.assigned_to_id);
  if (ticketForm.value.image) {
    formData.append('image', ticketForm.value.image);
  }

  const payload = {
    system_name: selectedSystem ? selectedSystem.system_name : '',
    assigned_to_email: assignedDeveloper ? assignedDeveloper.email : '',
  };

  console.log('Submitting form with payload:', payload);  

  ticketStore.setStoreTicket(formData, payload).then((res) => {
    if (res.status === 'success') {
      ticketStore.setLoadTicket().then(() => {
        clearTicketForm();
      });
    } else {
      errors.value = res.error || {};
      console.error('Form submission error:', res.error);
    }
  }).catch(error => {
    console.error('Submission failed:', error);
  });
};

onMounted(() => {
  ticketStore.setLoadTicket();
  systemStore.setLoadSystem().then((res) => console.log('Systems loaded:', res));
  developerStore.setLoadDeveloper().then((res) => console.log('Developers loaded:', res));
});
</script>

<style scoped>
/* Ensure the form content is scrollable */
.bg-white.border.shadow-lg.rounded-lg.p-6.overflow-auto.h-full {
  max-height: calc(100vh - 6rem); /* Adjust the height based on your needs */
}
</style>
