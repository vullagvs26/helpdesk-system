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
                class="w-full h-full rounded-full border-4 border-blue-500"
                :src="developer.image"
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
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M16.7 7.29l-4-4A1 1 0 0 0 12 3H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a1 1 0 0 0-.3-.71zM11 5.41L14.59 9H11V5.41zM6 15V5h4v4a1 1 0 0 0 1 1h4v5H6z"
                  ></path>
                </svg>
              </label>
            </div>
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              @click="uploadPhoto"
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
                v-model="developer.firstName"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label for="last-name" class="block text-gray-700">Last Name</label>
              <input
                type="text"
                id="last-name"
                v-model="developer.lastName"
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
              <label for="about" class="block text-gray-700">About you</label>
              <textarea
                id="about"
                v-model="developer.about"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              @click="close"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full mr-2 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="save"
              class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
import placeholderImage from "@/assets/image/profile.png";

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
});

const developer = ref({
  first_name: "",
  last_name: "",
  position: "",
  email: "",
  about: "",
  image: null,
});

const close = () => {
  props.onClose();
};

const save = () => {
  props.onSave(developer.value);
  close();
};

const uploadPhoto = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      developer.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
