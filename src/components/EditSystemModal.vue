<template>
  <transition name="fade">
    <div v-if="show" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Edit System</h3>
                <div class="mt-2">
                  <div class="mb-4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="editSystemName"
                    >
                      System Name
                    </label>
                    <input
                      v-model="form.system_name"
                      id="editSystemName"
                      type="text"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div class="mb-4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="editPublishedAt"
                    >
                      Published At
                    </label>
                    <vue-datepicker
                      v-model="form.published_at"
                      id="editPublishedAt"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div class="mb-4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="editDevelopedBy"
                    >
                      Developed By
                    </label>
                    <input
                      v-model="form.developed_by"
                      id="editDevelopedBy"
                      type="text"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div class="mb-4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="editDescription"
                    >
                      Short Description
                    </label>
                    <textarea
                      v-model="form.description"
                      id="editDescription"
                      type="text"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                  </div>
                  <div class="mb-4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="editStatus"
                    >
                      Status
                    </label>
                    <select
                      v-model="form.status"
                      id="editStatus"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="updateSystem"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              @click="close"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import VueDatepicker from "vue3-datepicker";
import { formatDate } from "@/utils/dateUtils";

const props = defineProps({
  show: Boolean,
  system: Object,
});

const emit = defineEmits(["onClose", "onUpdate"]);

const form = ref({
  system_name: "",
  published_at: null,
  developed_by: "",
  description: "",
  status: "",
});

watch(
  () => props.system,
  (newValue) => {
    if (newValue) {
      form.value.system_name = newValue.system_name;
      form.value.published_at = newValue.published_at
        ? new Date(newValue.published_at)
        : null;
      form.value.developed_by = newValue.developed_by;
      form.value.description = newValue.description;
      form.value.status = newValue.status;
    }
  }
);

const handleUpdateSystem = (updatedSystem) => {
    systemStore.setUpdateSystem(updatedSystem)
        .then(() => {
            // Successfully updated
            closeEditDialog();
        })
        .catch(err => {
            console.error("Error updating system:", err);
        });
};


const updateSystem = () => { 
    // Format the date to YYYY-MM-DD before saving
  const formattedDate = formatDate(form.value.published_at); // Use your date formatting function here
  form.value.published_at = formattedDate;
  emit("onUpdate", { ...form.value, id: props.system.id });
  resetForm(); 
};

const close = () => {
  emit("onClose");
};

const resetForm = () => {
  form.value.system_name = "";
  form.value.published_at = null;
  form.value.developed_by = "";
  form.value.description = "";
  form.value.status = "";
};
</script>

<style scoped>
/* Add scoped styles here */
</style>
