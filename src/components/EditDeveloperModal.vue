<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-2xl">
        <div class="p-6">
          <div class="text-center mb-6">
            <div class="relative w-24 h-24 mx-auto mb-4">
              <img
                v-if="developer.profile_photo"
                :src="developer.profile_photo"
                class="w-full h-full rounded-full border-4 border-blue-500"
                alt=""
              />
              <label
                for="upload-photo"
                class="absolute inset-0 flex items-center justify-center cursor-pointer text-blue-600 hover:text-blue-700 transition-colors"
              >
                <input
                  type="file"
                  id="upload-photo"
                  class="hidden"
                  @change="uploadPhoto"
                />
              </label>
            </div>
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Upload Photo
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label for="first-name" class="block text-gray-700">First Name</label>
              <input
                type="text"
                id="first-name"
                v-model="developer.first_name"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label for="last-name" class="block text-gray-700">Last Name</label>
              <input
                type="text"
                id="last-name"
                v-model="developer.last_name"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label for="status" class="block text-gray-700">Status</label>
              <input
                type="text"
                id="status"
                v-model="developer.status"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label for="position" class="block text-gray-700">Position</label>
              <input
                type="text"
                id="position"
                v-model="developer.position"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label for="email" class="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                v-model="developer.email"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div class="col-span-2">
              <label for="description" class="block text-gray-700">About you</label>
              <textarea
                id="description"
                v-model="developer.description"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              @click="closeAndReset"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full mr-2 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="saveChanges"
              class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
  onSave: {
    type: Function,
    required: true,
  },
  developerData: {
    type: Object,
    default: null,
  },
});

const developer = ref({
  first_name: "",
  last_name: "",
  status: "",
  position: "",
  email: "",
  description: "",
  profile_photo: null,
});

// Watch for changes in props.developerData and update local developer ref
watch(
  () => props.developerData,
  (newVal) => {
    if (newVal) {
      developer.value = {
        first_name: newVal.first_name,
        last_name: newVal.last_name,
        status: newVal.status,
        position: newVal.position,
        email: newVal.email,
        description: newVal.description,
        profile_photo: newVal.profile_photo,
      };
    }
  }
);

const closeAndReset = () => {
  close();
  resetDeveloper();
};

const saveChanges = () => {
  save();
  resetDeveloper();
};

const resetDeveloper = () => {
  developer.value = {
    first_name: "",
    last_name: "",
    status: "",
    position: "",
    email: "",
    description: "",
    profile_photo: null,
  };

  // Reset file input (if needed)
  const fileInput = document.getElementById("upload-photo");
  if (fileInput) {
    fileInput.value = "";
  }
};

const close = () => {
  props.onClose();
};

const save = () => {
  console.log("Saving changes with data:", developer.value);
  const formData = new FormData();
  formData.append("id", props.developerData.id); // Include developer ID
  formData.append("first_name", developer.value.first_name);
  formData.append("last_name", developer.value.last_name);
  formData.append("status", developer.value.status);
  formData.append("position", developer.value.position);
  formData.append("email", developer.value.email);
  formData.append("description", developer.value.description);

  if (developer.value.profile_photo) {
    formData.append("profile_photo", developer.value.profile_photo);
  }

  props.onSave(formData);
  resetDeveloper();
};

const uploadPhoto = (event) => {
  const file = event.target.files[0];
  if (file) {
    developer.value.profile_photo = file;
    developer.value.profile_photo = URL.createObjectURL(file);
  }
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
