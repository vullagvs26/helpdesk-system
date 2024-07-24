<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-semibold mb-2">Username</label>
          <input
            type="text"
            id="name"
            v-model="name"
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
          <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password_confirmation" class="block text-gray-700 font-semibold mb-2">Confirm Password</label>
          <input
            type="password"
            id="password_confirmation"
            v-model="passwordConfirmation"
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

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const router = useRouter();

const handleRegister = async () => {
  if (password.value !== passwordConfirmation.value) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post(
      "/register",
      {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      }
    );

    console.log("Registration successful:", response.data);

    // Redirect to the login page
    router.push("/login");
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed, please try again.");
  }
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
