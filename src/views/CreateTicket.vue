<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  impact: '',
  systemName: '',
  description: '',
  files: []
});

const handleFileUpload = (event) => {
  const files = event.target.files;
  form.value.files = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.files.push({ name: file.name, url: e.target.result });
    };
    reader.readAsDataURL(file);
  }
};

const submitForm = () => {
  console.log('Form submitted:', form.value);
 
};
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between">
      <h2 class="text-xl font-bold text-blue-500 mb-4 mt-4">Create a new ticket</h2>
      <button type="submit" class="mt-4 mb-4 bg-blue-500 text-white py-2 px-4 rounded-full">Send Request</button>
    </div>
    <div class="bg-white border shadow-lg rounded-lg p-6">
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 gap-4">
          <div class="flex flex-col">
            <label for="name" class="mb-1 font-semibold">Your Name</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="border border-gray-300 p-2 rounded"
              placeholder="Input Your Name"
            />
          </div>
          <div class="flex flex-col">
            <label for="email" class="mb-1 font-semibold">Your Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="border border-gray-300 p-2 rounded"
              placeholder="Input Your Email"
            />
          </div>
          <div class="flex flex-col">
            <label for="impact" class="mb-1 font-semibold">Impact</label>
            <select
              id="impact"
              v-model="form.impact"
              class="border border-gray-300 p-2 rounded"
            >
              <option value="" disabled selected>Select Impact</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label for="systemName" class="mb-1 font-semibold">System Name</label>
            <input
              type="text"
              id="systemName"
              v-model="form.systemName"
              class="border border-gray-300 p-2 rounded"
              placeholder="Input System"
            />
          </div>
          <div class="flex flex-col">
            <label for="description" class="mb-1 font-semibold">Short Description</label>
            <textarea
              id="description"
              v-model="form.description"
              class="border border-gray-300 p-2 rounded"
              rows="4"
              placeholder="Describe your request or error encountered"
            ></textarea>
          </div>
          <div class="flex flex-col">
            <label for="file" class="mb-1 font-semibold">Attach Files</label>
            <input
              type="file"
              id="file"
              multiple
              @change="handleFileUpload"
              class="border border-gray-300 p-2 rounded"
            />
            <div v-if="form.files.length" class="mt-2">
              <p v-for="(file, index) in form.files" :key="index" class="text-gray-500">{{ file.name }}</p>
            </div>
          </div>
        </div>
      </form>
      <div class="mt-4 flex space-x-2">
        <img v-for="(file, index) in form.files" :key="index" :src="file.url" class="w-24 h-24" :alt="file.name" />
      </div>
    </div>
  </div>
</template>



<style scoped>

</style>
