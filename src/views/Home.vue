<template>
    <div class="flex min-h-screen bg-gray-100">
      <aside class="w-64 bg-white border-r">
        <div class="p-6">
          <h1 class="text-xl font-bold">MIS Dev Team Help Desk System</h1>
        </div>
        <nav>
          <ul>
            <li class="p-4 hover:bg-gray-200">
              <font-awesome-icon :icon="['fas', 'bars']" class="mr-2" />
              Monitoring
            </li>
            <li class="p-4 hover:bg-gray-200">
              <font-awesome-icon :icon="['fas', 'bars']" class="mr-2" />
              Dashboard
            </li>
            <li class="p-4 hover:bg-gray-200">
              <font-awesome-icon :icon="['fas', 'bars']" class="mr-2" />
              Tickets
            </li>
            <li class="p-4 hover:bg-gray-200">
              <font-awesome-icon :icon="['fas', 'bars']" class="mr-2" />
              Requests/Concerns
            </li>
            <li class="p-4 hover:bg-gray-200">
              <font-awesome-icon :icon="['fas', 'bars']" class="mr-2" />
              Management
            </li>
            <li class="p-4 hover:bg-gray-200">
              <font-awesome-icon :icon="['fas', 'bars']" class="mr-2" />
              Developers
            </li>
            <li class="p-4 hover:bg-gray-200">
              <font-awesome-icon :icon="['fas', 'bars']" class="mr-2" />
              Systems
            </li>
          </ul>
        </nav>
      </aside>
      <main class="flex-1 p-6">
        <div class="bg-white p-6 rounded shadow-md">
          <h2 class="text-2xl font-bold mb-4">Requests/Concerns</h2>
          <form>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Requested by:</label>
              <select class="w-full p-2 border rounded">
                <option>Select options</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">System Name:</label>
              <input type="text" class="w-full p-2 border rounded" placeholder="Input Subject" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Body:</label>
              <textarea class="w-full p-2 border rounded" placeholder="Describe your request or error encountered"></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Remarks:</label>
              <textarea class="w-full p-2 border rounded" placeholder="Additional Information"></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Attach File:</label>
              <button type="button" class="p-2 bg-blue-500 text-white rounded">Attach File</button>
              <span class="ml-2">No File Selected</span>
            </div>
            <div class="mb-4">
              <div class="flex space-x-4">
                <div class="w-24 h-24 border flex items-center justify-center cursor-pointer">
                  <font-awesome-icon :icon="['fas', 'plus']" class="text-gray-400" />
                </div>
                <img src="/path/to/image1.PNG" class="w-24 h-24 border" />
                <img src="/path/to/image2.PNG" class="w-24 h-24 border" />
              </div>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="p-2 bg-blue-500 text-white rounded">Send Request</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
 
  </script>
  
  <style scoped>

  </style>
  