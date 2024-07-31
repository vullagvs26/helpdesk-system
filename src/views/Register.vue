<template>
  <div class="flex min-h-screen">
    <!-- Left side with registration form and gradient -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-b from-[#00BEA4] to-[#E0F8F4]">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl"> <!-- Adjusted width -->
        <h2 class="text-2xl font-bold mb-6 text-center">Register as Developer</h2>
        <form @submit.prevent="handleRegister" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="mb-4">
            <label for="first_name" class="block text-gray-700 font-semibold mb-2">First Name</label>
            <input
              type="text"
              id="first_name"
              v-model="firstName"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BEA4]"
              required
            />
          </div>
          <div class="mb-4">
            <label for="last_name" class="block text-gray-700 font-semibold mb-2">Last Name</label>
            <input
              type="text"
              id="last_name"
              v-model="lastName"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BEA4]"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BEA4]"
              required
            />
          </div>
          <div class="mb-4">
            <label for="position" class="block text-gray-700 font-semibold mb-2">Position</label>
            <input
              type="text"
              id="position"
              v-model="position"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BEA4]"
              required
            />
          </div>
          <div class="mb-4 col-span-2">
            <label for="description" class="block text-gray-700 font-semibold mb-2">Description (Optional)</label>
            <textarea
              id="description"
              v-model="description"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BEA4]"
            ></textarea>
          </div>
          
          <div class="mb-6 col-span-2">
            <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00BEA4]"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-[#00BEA4] text-white p-3 rounded-lg font-semibold hover:bg-[#00BEA4]/80 focus:outline-none focus:ring-2 focus:ring-[#00BEA4] col-span-2"
          >
            Register
          </button>
        </form>
        <p class="text-center text-gray-600 mt-4">
          Already have an account?
          <router-link to="/login" class="text-[#00BEA4]">Login</router-link>
        </p>
      </div>
    </div>

    <!-- Right side with image only -->
    <div
      class="w-1/2 hidden lg:flex items-center justify-center bg-cover bg-center relative"
      :style="{ backgroundImage: `url(${registerImage})` }"
    >
      <div class="relative bg-gray-800 bg-opacity-50 p-8 rounded-lg text-white text-center">
        <h1 class="text-4xl font-bold">Welcome to Helpdesk System</h1>
        <p class="mt-4 text-lg">Join us and start creating tickets.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import registerImage from '@/assets/image/register.jpg'; // Import image

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const position = ref('');
const description = ref('');
const status = ref('Available');  // Default value, readonly
const password = ref('');
const router = useRouter();

const handleRegister = async () => {
  try {
    await axios.post('/register', {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      position: position.value,  // Send null if empty
      description: description.value || null,  // Send null if empty
      status: status.value,  // Will always be "Available"
      password: password.value,
    });

    // Redirect to login page
    router.push('/login');
  } catch (error) {
    console.error('Registration failed:', error);
    alert('Registration failed');
  }
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
