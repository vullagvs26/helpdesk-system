<template>
  <div class="flex min-h-screen">
    <!-- Left side with image and gradient overlay -->
    <div class="w-1/2 hidden lg:flex items-center justify-center bg-cover bg-center relative" :style="{ backgroundImage: `url(${loginImage})` }">
      <div class="relative bg-gray-800 bg-opacity-50 p-8 rounded-lg text-white text-center">
        <h1 class="text-4xl font-bold">Welcome to Helpdesk System</h1>
        <p class="mt-4">Log in to your account to continue.</p>
      </div>
    </div>

    <!-- Right side with login form and gradient -->
<div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-b from-[#00BEA4] to-[#E0F8F4]">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-[#00BEA4] text-white p-3 rounded-lg font-semibold hover:bg-[#00BEA4]/80 focus:outline-none focus:ring-2 focus:ring-[#00BEA4]"
          >
            Login
          </button>
        </form>
        <p class="text-center text-gray-600 mt-4">
          Don't have an account?
          <router-link to="/register" class="text-[#00BEA4]">Register</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import useAuth from '@/modules/auth';
import loginImage from '@/assets/image/login.jpg'; // Import image

const email = ref('');
const password = ref('');
const router = useRouter();
const { login } = useAuth();

const handleLogin = async () => {
  try {
    const response = await axios.post('/login', {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('email', email.value);

    login(response.data.token);
    router.push('/Dashboard');
  } catch (error) {
    console.error('Login failed:', error);
    alert('Invalid email or password');
  }
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
