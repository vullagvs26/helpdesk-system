<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Register as Developer</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="first_name" class="block text-gray-700 font-semibold mb-2">First Name</label>
          <input
            type="text"
            id="first_name"
            v-model="firstName"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="last_name" class="block text-gray-700 font-semibold mb-2">Last Name</label>
          <input
            type="text"
            id="last_name"
            v-model="lastName"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="position" class="block text-gray-700 font-semibold mb-2">Position</label>
          <input
            type="text"
            id="position"
            v-model="position"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700 font-semibold mb-2">Description (Optional)</label>
          <textarea
            id="description"
            v-model="description"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="status" class="block text-gray-700 font-semibold mb-2">Status</label>
          <input
            type="text"
            id="status"
            v-model="status"
            class="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
            readonly
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Already have an account?
        <router-link to="/login" class="text-blue-500">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const position = ref("");  // Optional
const description = ref("");  // Optional
const status = ref("Available");  // Default value, readonly
const password = ref("");
const router = useRouter();

const handleRegister = async () => {
  try {
    await axios.post(
      "/register",
      {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        position: position.value,  // Send null if empty
        description: description.value || null,  // Send null if empty
        status: status.value,  // Will always be "Available"
        password: password.value,
      }
    );

    // Redirect to login page
    router.push("/login");
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed");
  }
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
