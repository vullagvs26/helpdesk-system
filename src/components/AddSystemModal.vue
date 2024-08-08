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
                        for="database"
                      >
                        Database
                      </label>
                      <input
                        v-model="form.database"
                        @input="onInputChange"
                        id="database"
                        :class="{ 'border-red-500': formErrors.database && formTouched }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        list="database-options"
                        placeholder="Select database"
                      />

                      <datalist id="database-options">
                        <option value="MySQL">MySQL</option>
                        <option value="Oracle">Oracle</option>
                        <option value="PostgreSQL">PostgreSQL</option>
                      </datalist>
                      <p
                        v-if="formErrors.database && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Database is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="support_section"
                      >
                        Support Section
                      </label>
                      <input
                        v-model="form.support_section"
                        @input="formTouched = true"
                        id="support_section"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.support_section && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.support_section && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Support Section is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="supportDeveloper"
                      >
                        Support Developer
                      </label>
                      <input
                        v-model="form.support_developer"
                        @input="onInputChange"
                        id="supportDeveloper"
                        :class="{
                          'border-red-500': formErrors.support_developer && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        list="support-developer-options"
                        placeholder="Select a developer"
                      />
                      <datalist id="support-developer-options">
                        <option
                          v-for="(developer, i) in developerStore.getLoadDeveloper"
                          :key="i"
                          :value="developer.first_name.toString()"
                        >
                          {{ developer.first_name }}
                        </option>
                      </datalist>
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
                        for="supportPrimary"
                      >
                        Support Primary
                      </label>
                      <input
                        v-model="form.support_primary"
                        @input="onInputChange"
                        id="supportPrimary"
                        :class="{
                          'border-red-500': formErrors.support_primary && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        list="support-primary-options"
                        placeholder="Select a primary"
                      />
                      <datalist id="support-primary-options">
                        <option
                          v-for="(developer, i) in developerStore.getLoadDeveloper"
                          :key="i"
                          :value="developer.first_name.toString()"
                        >
                          {{ developer.first_name }}
                        </option>
                      </datalist>
                      <p
                        v-if="formErrors.support_primary && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Support Primary is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="supportSecondary"
                      >
                        Support Secondary
                      </label>
                      <input
                        v-model="form.support_secondary"
                        @input="onInputChange"
                        id="supportSecondary"
                        :class="{
                          'border-red-500': formErrors.support_secondary && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        list="support-secondary-options"
                        placeholder="Select a secondary"
                      />
                      <datalist id="support-secondary-options">
                        <option
                          v-for="(developer, i) in developerStore.getLoadDeveloper"
                          :key="i"
                          :value="developer.first_name.toString()"
                        >
                          {{ developer.first_name }}
                        </option>
                      </datalist>
                      <p
                        v-if="formErrors.support_secondary && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Support Secondary is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="supportTertiary"
                      >
                        Support Tertiary
                      </label>
                      <input
                        v-model="form.support_tertiary"
                        @input="onInputChange"
                        id="supportTertiary"
                        :class="{
                          'border-red-500': formErrors.support_tertiary && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        list="support-tertiary-options"
                        placeholder="Select a tertiary"
                      />
                      <datalist id="support-tertiary-options">
                        <option
                          v-for="(developer, i) in developerStore.getLoadDeveloper"
                          :key="i"
                          :value="developer.first_name.toString()"
                        >
                          {{ developer.first_name }}
                        </option>
                      </datalist>
                      <p
                        v-if="formErrors.support_tertiary && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Support Tertiary is required.
                      </p>
                    </div>

                    <!-- Add Original Date -->
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="originalDate"
                      >
                        Original Date
                      </label>
                      <vue-datepicker
                        v-model="form.original_date"
                        @change="formTouched = true"
                        id="originalDate"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.original_date && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Original Date is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="portalDate"
                      >
                        Portal Date
                      </label>
                      <vue-datepicker
                        v-model="form.portal_date"
                        @change="formTouched = true"
                        id="portalDate"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.portal_date && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Portal Date is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="prodPath"
                      >
                        Production Path
                      </label>
                      <input
                        v-model="form.prod_path"
                        @input="formTouched = true"
                        id="prodPath"
                        type="text"
                        :class="{ 'border-red-500': formErrors.prod_path && formTouched }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.code_name && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Production Path is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="prodWeb"
                      >
                        Production Webserver
                      </label>
                      <input
                        v-model="form.prod_webserver"
                        @input="formTouched = true"
                        id="prodWeb"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.prod_webserver && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.prod_webserver && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Production Webserver is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="prodDatabase"
                      >
                        Production Database
                      </label>
                      <input
                        v-model="form.prod_database"
                        @input="formTouched = true"
                        id="prodDatabase"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.prod_database && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.prod_database && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Production Database is required.
                      </p>
                    </div>

                    <!-- New Development URL Field -->
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="devUrl"
                      >
                        Development URL
                      </label>
                      <input
                        v-model="form.dev_url"
                        @input="formTouched = true"
                        id="devUrl"
                        type="text"
                        :class="{ 'border-red-500': formErrors.dev_url && formTouched }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.dev_url && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Development URL is required.
                      </p>
                    </div>

                    <!-- New Development Webserver Field -->
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="devWeb"
                      >
                        Development Webserver
                      </label>
                      <input
                        v-model="form.dev_web"
                        @input="formTouched = true"
                        id="devWeb"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.dev_web && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.dev_web && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Development Webserver is required.
                      </p>
                    </div>

                    <!-- New Development Database Field -->
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="devDatabase"
                      >
                        Development Database
                      </label>
                      <input
                        v-model="form.dev_database"
                        @input="formTouched = true"
                        id="devDatabase"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.dev_database && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.dev_database && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Development Database is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="backUpUrl"
                      >
                        Backup URL
                      </label>
                      <input
                        v-model="form.back_up_url"
                        @input="formTouched = true"
                        id="backUpUrl"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.back_up_url && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.back_up_url && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Backup URL is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="backUpWeb"
                      >
                        Backup Web
                      </label>
                      <input
                        v-model="form.back_up_web"
                        @input="formTouched = true"
                        id="backUpWeb"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.back_up_web && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.back_up_web && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Backup Web is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="backUpDatabase"
                      >
                        Backup Database
                      </label>
                      <input
                        v-model="form.back_up_database"
                        @input="formTouched = true"
                        id="backUpDatabase"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.back_up_database && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.back_up_database && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Backup Database is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="gitName"
                      >
                        Git Name
                      </label>
                      <input
                        v-model="form.git_name"
                        @input="formTouched = true"
                        id="gitName"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.git_name && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.git_name && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Git Name is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="gitServer"
                      >
                        Git Server
                      </label>
                      <input
                        v-model="form.git_server"
                        @input="formTouched = true"
                        id="gitServer"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.git_server && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.git_server && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Git Server is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="ssiStatus"
                      >
                        SSI Status
                      </label>
                      <input
                        v-model="form.ssi_status"
                        @input="formTouched = true"
                        id="ssiStatus"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.ssi_status && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.ssi_status && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        SSI Status is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="ssiRemarks"
                      >
                        SSI Remarks
                      </label>
                      <input
                        v-model="form.ssi_remarks"
                        @input="formTouched = true"
                        id="ssiRemarks"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.ssi_remarks && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.ssi_remarks && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        SSI Remarks is required.
                      </p>
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="ongoingActivity"
                      >
                        Ongoing Activity
                      </label>
                      <input
                        v-model="form.ongoing_activity"
                        @input="formTouched = true"
                        id="ongoingActivity"
                        type="text"
                        :class="{
                          'border-red-500': formErrors.ongoing_activity && formTouched,
                        }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        v-if="formErrors.ongoing_activity && formTouched"
                        class="text-red-500 text-xs italic mt-1"
                      >
                        Ongoing Activity is required.
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
  database: "",
  support_section: "",
  support_developer: "",
  support_primary: "",
  support_secondary: "",
  support_tertiary: "",
  original_date: null,
  portal_date: null,
  prod_path: "",
  prod_webserver: "",
  prod_database: "",
  dev_url: "",
  dev_web: "",
  dev_database: "",
  back_up_url: "",
  back_up_web: "",
  back_up_database: "",
  git_name: "",
  git_server: "",
  ssi_status: "",
  ssi_remarks: "",
  ongoing_activity: "",
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
  database: false,
  support_section: false,
  support_developer: false,
  support_primary: false,
  support_secondary: false,
  support_tertiary: false,
  original_date: false,
  portal_date: false,
  prod_path: false,
  prod_webserver: false,
  prod_database: false,
  dev_url: false,
  dev_web: false,
  dev_database: false,
  back_up_url: false,
  back_up_web: false,
  back_up_database: false,
  git_name: false,
  git_server: false,
  ssi_status: false,
  ssi_remarks: false,
  ongoing_activity: false,
});

const formTouched = ref(false);

const save = () => {
  formTouched.value = true;
  if (validateForm()) {
    const formattedDate = formatDate(form.value.published_at);
    form.value.published_at = formattedDate;

    const formattedOrigDate = formatDate(form.value.original_date);
    form.value.original_date = formattedOrigDate;

    const formattedPortalDate = formatDate(form.value.portal_date);
    form.value.portal_date = formattedPortalDate;

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
  if (!form.value.database.trim()) {
    // Ensure this is checked as a string
    formErrors.value.database = true;
    isValid = false;
  } else {
    formErrors.value.database = false;
  }
  if (!form.value.support_section) {
    formErrors.value.support_section = true;
    isValid = false;
  } else {
    formErrors.value.support_section = false;
  }
  if (!form.value.support_primary.trim()) {
    // Ensure this is checked as a string
    formErrors.value.support_primary = true;
    isValid = false;
  } else {
    formErrors.value.support_primary = false;
  }
  if (!form.value.support_secondary.trim()) {
    // Ensure this is checked as a string
    formErrors.value.support_secondary = true;
    isValid = false;
  } else {
    formErrors.value.support_secondary = false;
  }
  if (!form.value.support_tertiary.trim()) {
    // Ensure this is checked as a string
    formErrors.value.support_tertiary = true;
    isValid = false;
  } else {
    formErrors.value.support_tertiary = false;
  }
  if (!form.value.original_date) {
    formErrors.value.original_date = true;
    isValid = false;
  } else {
    formErrors.value.original_date = false;
  }
  if (!form.value.portal_date) {
    formErrors.value.portal_date = true;
    isValid = false;
  } else {
    formErrors.value.portal_date = false;
  }
  if (!form.value.prod_path.trim()) {
    // Add validation for prod_path
    formErrors.value.prod_path = true;
    isValid = false;
  } else {
    formErrors.value.prod_path = false;
  }
  if (!form.value.prod_webserver.trim()) {
    // Add validation for prod_webserver
    formErrors.value.prod_webserver = true;
    isValid = false;
  } else {
    formErrors.value.prod_webserver = false;
  }
  if (!form.value.prod_database.trim()) {
    // Add validation for prod_database
    formErrors.value.prod_database = true;
    isValid = false;
  } else {
    formErrors.value.prod_database = false;
  }
  if (!form.value.dev_url) {
    formErrors.value.dev_url = true;
    isValid = false;
  } else {
    formErrors.value.dev_url = false;
  }

  if (!form.value.dev_web) {
    formErrors.value.dev_web = true;
    isValid = false;
  } else {
    formErrors.value.dev_web = false;
  }

  if (!form.value.dev_database) {
    formErrors.value.dev_database = true;
    isValid = false;
  } else {
    formErrors.value.dev_database = false;
  }
  if (!form.value.back_up_url.trim()) {
    formErrors.value.back_up_url = true;
    isValid = false;
  } else {
    formErrors.value.back_up_url = false;
  }

  if (!form.value.back_up_web.trim()) {
    formErrors.value.back_up_web = true;
    isValid = false;
  } else {
    formErrors.value.back_up_web = false;
  }

  if (!form.value.back_up_database.trim()) {
    formErrors.value.back_up_database = true;
    isValid = false;
  } else {
    formErrors.value.back_up_database = false;
  }
  if (!form.value.git_name.trim()) {
    formErrors.value.git_name = true;
    isValid = false;
  } else {
    formErrors.value.git_name = false;
  }

  if (!form.value.git_server.trim()) {
    formErrors.value.git_server = true;
    isValid = false;
  } else {
    formErrors.value.git_server = false;
  }

  if (!form.value.ssi_status.trim()) {
    formErrors.value.ssi_status = true;
    isValid = false;
  } else {
    formErrors.value.ssi_status = false;
  }

  if (!form.value.ssi_remarks.trim()) {
    formErrors.value.ssi_remarks = true;
    isValid = false;
  } else {
    formErrors.value.ssi_remarks = false;
  }

  if (!form.value.ongoing_activity.trim()) {
    formErrors.value.ongoing_activity = true;
    isValid = false;
  } else {
    formErrors.value.ongoing_activity = false;
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
  form.value.database = "";
  form.value.support_section = "";
  form.value.support_developer = "";
  form.value.support_primary = "";
  form.value.support_secondary = "";
  form.value.support_tertiary = "";
  form.value.original_date = null;
  form.value.portal_date = null;
  form.value.prod_path = "";
  form.value.prod_webserver = "";
  form.value.prod_database = "";
  form.value.dev_url = "";
  form.value.dev_web = "";
  form.value.dev_database = "";
  form.value.back_up_url = "";
  form.value.back_up_web = "";
  form.value.back_up_database = "";
  form.value.git_name = "";
  form.value.git_server = "";
  form.value.ssi_status = "";
  form.value.ssi_remarks = "";
  form.value.ongoing_activity = "";

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
  formErrors.value.database = false;
  formErrors.value.support_section = false;
  formErrors.value.support_developer = false;
  formErrors.value.support_primary = false;
  formErrors.value.support_secondary = false;
  formErrors.value.support_tertiary = false;
  formErrors.value.original_date = false;
  formErrors.value.portal_date = false;
  formErrors.value.prod_path = false;
  formErrors.value.prod_webserver = false;
  formErrors.value.prod_database = false;
  formErrors.value.dev_url = false;
  formErrors.value.dev_web = false;
  formErrors.value.dev_database = false;
  formErrors.value.back_up_url = false;
  formErrors.value.back_up_web = false;
  formErrors.value.back_up_database = false;
  formErrors.value.git_name = false;
  formErrors.value.git_server = false;
  formErrors.value.ssi_status = false;
  formErrors.value.ssi_remarks = false;
  formErrors.value.ongoing_activity = false;
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
