<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
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
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-semibold mb-2"
            >Password</label
          >
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
          Login
        </button>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Don't have an account?
        <router-link to="/register" class="text-blue-500">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import useAuth from "@/modules/auth";

const email = ref("");
const password = ref("");
const router = useRouter();
const { login } = useAuth();

const handleLogin = async () => {
  try {
    const response = await axios.post(
      "/login", // Ensure this matches your back-end login endpoint
      {
        email: email.value,
        password: password.value,
      }
    );

    // Save the token to local storage
    localStorage.setItem("token", response.data.token);

    // Call the login function from useAuth
    login(response.data.token);

    // Redirect to the dashboard
    router.push("/Dashboard"); // Ensure this matches your route
  } catch (error) {
    console.error("Login failed:", error);
    alert("Invalid email or password");
  }
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
