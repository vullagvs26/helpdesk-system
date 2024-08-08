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
            <!-- Scrollable container -->
            <div class="scrollable-content">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Add New System
                  </h3>
                  <div class="mt-2 mr-8">
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="systemName"
                      >
                        System Name
                      </label>
                      <input
                        v-model="form.system_name"
                        @input="formTouched = true"
                        id="systemName"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.system_name && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.system_name && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        System Name is required.
                      </p>
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="codeName"
                      >
                        Code Name
                      </label>
                      <input
                        v-model="form.code_name"
                        @input="formTouched = true"
                        id="codeName"
                        type="text"
                        :class="{ 'border-red-500': formErrors.code_name && formTouched }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.code_name && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Code Name is required.
                      </p>
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="framework"
                      >
                        Owner
                      </label>
                      <input
                        v-model="form.owner"
                        @input="formTouched = true"
                        id="framework"
                        type="text"
                        :class="{ 'border-red-500': formErrors.owner && formTouched }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.code_name && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Owner is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="codeName"
                      >
                        Release
                      </label>
                      <input
                        v-model="form.release"
                        @input="formTouched = true"
                        id="codeName"
                        type="text"
                        :class="{ 'border-red-500': formErrors.release && formTouched }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.code_name && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Release is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="type"
                      >
                        Type
                      </label>
                      <select
                        v-model="form.type"
                        @change="formTouched = true"
                        id="type"
                        :class="{ 'border-red-500': formErrors.type && formTouched }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="Web">Web</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Desktop Software">Desktop Software</option>
                      </select>
                      <p
                        v-if="formErrors.type && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Type is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="deployment"
                      >
                        Deployment
                      </label>
                      <select
                        v-model="form.deployment"
                        @change="formTouched = true"
                        id="deployment"
                        :class="{
                          'border-red-500': formErrors.deployment && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="FDTP Portal">FDTP Portal</option>
                      </select>
                      <p
                        v-if="formErrors.deployment && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Deployment is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="language"
                      >
                        Language
                      </label>
                      <select
                        v-model="form.language"
                        @change="formTouched = true"
                        id="language"
                        :class="{ 'border-red-500': formErrors.language && formTouched }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="PHP">PHP</option>
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                      </select>
                      <p
                        v-if="formErrors.language && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Language is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="framework"
                      >
                        Framework
                      </label>
                      <input
                        v-model="form.framework"
                        @input="formTouched = true"
                        id="framework"
                        type="text"
                        :class="{ 'border-red-500': formErrors.framework && formTouched }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.code_name && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Framework is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="supportDeveloper"
                      >
                        Support Developer
                      </label>
                      <select
                        v-model="form.support_developer"
                        @change="formTouched = true"
                        id="supportDeveloper"
                        :class="{
                          'border-red-500': formErrors.support_developer && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Select a developer</option>
                        <option
                          v-for="(developer, i) in developerStore.getLoadDeveloper"
                          :key="i"
                          :value="developer.first_name.toString()"
                        >
                          {{ developer.first_name }}
                        </option>
                      </select>
                      <p
                        v-if="formErrors.support_developer && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Support Developer is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="publishedAt"
                      >
                        Published At
                      </label>
                      <vue-datepicker
                        v-model="form.published_at"
                        @change="formTouched = true"
                        id="publishedAt"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.published_at && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Published At is required.
                      </p>
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="developedBy"
                      >
                        Developed By
                      </label>
                      <input
                        v-model="form.developed_by"
                        @input="formTouched = true"
                        id="developedBy"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.developed_by && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.developed_by && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Developed By is required.
                      </p>
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="description"
                      >
                        Short Description
                      </label>
                      <textarea
                        v-model="form.description"
                        @input="formTouched = true"
                        id="description"
                        :class="{
                          'border-red-500': formErrors.description && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      ></textarea>
                      <p
                        v-if="formErrors.description && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Short Description is required.
                      </p>
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="status"
                      >
                        Status
                      </label>
                      <select
                        v-model="form.status"
                        @change="formTouched = true"
                        id="status"
                        :class="{ 'border-red-500': formErrors.status && formTouched }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <p
                        v-if="formErrors.status && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Status is required.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="save"
              :disabled="!validateForm()"
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
import { ref, onMounted } from "vue";
import VueDatepicker from "vue3-datepicker";
import { formatDate } from "@/utils/dateUtils";
import { useDeveloperStore } from "@/modules/developer.js";

const developerStore = useDeveloperStore();

onMounted(() => {
  developerStore.setLoadDeveloper();
});

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["onClose", "onSave"]);

const form = ref({
  system_name: "",
  published_at: null,
  developed_by: "",
  description: "",
  status: "Active",
  code_name: "",
  owner: "",
  release: "",
  type: "Web",
  deployment: "FDTP Portal",
  language: "PHP",
  framework: "",
  support_developer: "",
});

const formErrors = ref({
  system_name: false,
  published_at: false,
  developed_by: false,
  description: false,
  status: false,
  code_name: false,
  owner: false,
  release: false,
  type: false,
  deployment: false,
  language: false,
  framework: false,
  support_developer: false,
});

const formTouched = ref(false);

const save = () => {
  formTouched.value = true;
  if (validateForm()) {
    const formattedDate = formatDate(form.value.published_at);
    form.value.published_at = formattedDate;

    emit("onSave", { ...form.value });
    resetForm();
  }
};

const close = () => {
  emit("onClose");
};

const validateForm = () => {
  let isValid = true;

  if (!form.value.system_name.trim()) {
    formErrors.value.system_name = true;
    isValid = false;
  } else {
    formErrors.value.system_name = false;
  }

  if (!form.value.published_at) {
    formErrors.value.published_at = true;
    isValid = false;
  } else {
    formErrors.value.published_at = false;
  }

  if (!form.value.developed_by.trim()) {
    formErrors.value.developed_by = true;
    isValid = false;
  } else {
    formErrors.value.developed_by = false;
  }

  if (!form.value.description.trim()) {
    formErrors.value.description = true;
    isValid = false;
  } else {
    formErrors.value.description = false;
  }

  if (!form.value.status) {
    formErrors.value.status = true;
    isValid = false;
  } else {
    formErrors.value.status = false;
  }
  if (!form.value.code_name.trim()) {
    // Add validation for code_name
    formErrors.value.code_name = true;
    isValid = false;
  } else {
    formErrors.value.code_name = false;
  }
  if (!form.value.owner.trim()) {
    // Add validation for owner
    formErrors.value.owner = true;
    isValid = false;
  } else {
    formErrors.value.owner = false;
  }
  if (!form.value.release.trim()) {
    // Add validation for release
    formErrors.value.release = true;
    isValid = false;
  } else {
    formErrors.value.release = false;
  }
  if (!form.value.type) {
    formErrors.value.type = true;
    isValid = false;
  } else {
    formErrors.value.type = false;
  }
  if (!form.value.deployment) {
    formErrors.value.deployment = true;
    isValid = false;
  } else {
    formErrors.value.deployment = false;
  }
  if (!form.value.language) {
    formErrors.value.language = true;
    isValid = false;
  } else {
    formErrors.value.language = false;
  }
  if (!form.value.framework) {
    formErrors.value.framework = true;
    isValid = false;
  } else {
    formErrors.value.framework = false;
  }
  if (!form.value.support_developer.trim()) {
    // Ensure this is checked as a string
    formErrors.value.support_developer = true;
    isValid = false;
  } else {
    formErrors.value.support_developer = false;
  }

  return isValid;
};

const resetForm = () => {
  form.value.system_name = "";
  form.value.published_at = null;
  form.value.developed_by = "";
  form.value.description = "";
  form.value.status = "Active";
  form.value.code_name = "";
  form.value.owner = "";
  form.value.release = "";
  form.value.type = "Web";
  form.value.deployment = "FDTP Portal";
  form.value.language = "PHP";
  form.value.framework = "";
  form.value.support_developer = "";

  resetFormErrors();
  formTouched.value = false;
};

const resetFormErrors = () => {
  formErrors.value.system_name = false;
  formErrors.value.published_at = false;
  formErrors.value.developed_by = false;
  formErrors.value.description = false;
  formErrors.value.status = false;
  formErrors.value.code_name = false;
  formErrors.value.owner = false;
  formErrors.value.release = false;
  formErrors.value.type = false;
  formErrors.value.deployment = false;
  formErrors.value.language = false;
  formErrors.value.framework = false;
  formErrors.value.support_developer = false;
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

.scrollable-content {
  max-height: 60vh; /* Adjust the height as needed */
  overflow-y: auto;
}
</style>
