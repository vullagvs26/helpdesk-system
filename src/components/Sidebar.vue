<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTicket,
  faSignOutAlt,
  faSquarePlus,
  faTableColumns,
  faUser,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTicket, faSignOutAlt, faSquarePlus, faTableColumns, faUser, faDesktop);
</script>

<template>
  <div class="w-64 bg-white text-black flex flex-col h-screen">
    <div class="flex items-center justify-center h-14 w-64 bg-white">
      <img
        src="@/assets/image/fujitsu-logo.png"
        class="h-12 w-50"
        alt="Fujitsu Logo"
      />
    </div>
    <nav class="flex-1 overflow-auto">
      <div class="py-4 px-4">
        <!-- Monitoring Section -->
        <p class="mt-10 mb-4 text-gray-400 font-bold text-opacity-90">
          Monitoring
        </p>
        <router-link to="/Dashboard" class="no-underline">
          <p
            class="py-2 px-5 items-center font-semibold hover:text-blue-500"
            :class="{ 'text-blue-500': $route.path === '/Dashboard' }"
          >
            <font-awesome-icon
              :icon="['fas', 'table-columns']"
              class="mr-2"
            ></font-awesome-icon>
            Dashboard
          </p>
        </router-link>
        <router-link to="/Tickets" class="no-underline">
          <p
            class="py-2 px-5 items-center font-semibold hover:text-blue-500"
            :class="{ 'text-blue-500': $route.path === '/Tickets' }"
          >
            <font-awesome-icon
              :icon="['fas', 'ticket']"
              class="mr-2"
            ></font-awesome-icon>
            Tickets
          </p>
        </router-link>

        <!-- Management Section -->
        <p class="mt-10 mb-4 text-gray-400 font-bold text-opacity-90">
          Management
        </p>
        <router-link to="/Developers" class="no-underline">
          <p
            class="py-2 px-5 items-center font-semibold hover:text-blue-500"
            :class="{ 'text-blue-500': $route.path === '/Developers' }"
          >
            <font-awesome-icon
              :icon="['fas', 'user']"
              class="mr-2"
            ></font-awesome-icon>
            Developers
          </p>
        </router-link>
        <router-link to="/Systems" class="no-underline">
          <p
            class="py-2 px-5 items-center font-semibold hover:text-blue-500"
            :class="{ 'text-blue-500': $route.path === '/Systems' }"
          >
            <font-awesome-icon
              :icon="['fas', 'desktop']"
              class="mr-2"
            ></font-awesome-icon>
            Systems
          </p>
        </router-link>

        <!-- Self-Service Section -->
        <p class="mt-10 mb-4 text-gray-400 font-bold text-opacity-90">
          Self-Service
        </p>
        
        <router-link to="/CreateTicket" class="no-underline">
          <p
            class="py-2 px-5 items-center font-semibold hover:text-blue-500"
            :class="{ 'text-blue-500': $route.path === '/CreateTicket' }"
          >
            <font-awesome-icon
              :icon="['fas', 'square-plus']"
              class="mr-2"
            ></font-awesome-icon>
            Create Ticket
          </p>
        </router-link>
      </div>
    </nav>
    <div class="py-4 px-4">
      <button class="hover:bg-blue-200 w-full py-2 rounded-m font-bold">
        <font-awesome-icon
          :icon="['fas', 'sign-out-alt']"
          class="mr-2"
        ></font-awesome-icon>
        LOGOUT
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-underline {
  text-decoration: none;
}
</style>
