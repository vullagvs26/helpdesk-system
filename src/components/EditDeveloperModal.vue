<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-gray-500 opacity-75" @click="$emit('close')"></div>
    <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
      <button
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        @click="$emit('close')"
      >
        <font-awesome-icon icon="times" />
      </button>
      <h3 class="text-xl font-semibold mb-4">Edit Developer</h3>
      <form @submit.prevent="handleSave">
        <div class="mb-4">
          <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            v-model="developer.first_name"
            id="first_name"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            v-model="developer.last_name"
            id="last_name"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="developer.email"
            id="email"
            type="email"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="position" class="block text-sm font-medium text-gray-700">Position</label>
          <input
            v-model="developer.position"
            id="position"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <select
            v-model="developer.status"
            id="status"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="developer.description"
            id="description"
            rows="3"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="profile_photo" class="block text-sm font-medium text-gray-700">Profile Photo</label>
          <input
            type="file"
            id="profile_photo"
            @change="handleFileChange"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
          <img
            v-if="developer.profile_photo"
            :src="developer.profile_photo"
            alt="Profile Photo"
            class="mt-2 w-24 h-24 rounded-full border border-gray-300"
          />
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  developerData: Object,
});

const emit = defineEmits(['close', 'save']);

const developer = ref({ ...props.developerData });

watch(
  () => props.developerData,
  (newValue) => {
    developer.value = { ...newValue };
  }
);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      developer.value.profile_photo = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};


const handleSave = () => {
  emit('save', developer.value);
};
</script>

<style scoped>
/* Add any additional styles you need */
</style>
