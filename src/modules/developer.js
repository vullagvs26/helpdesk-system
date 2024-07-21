import axios from "axios";
import { defineStore } from "pinia";

export const useDeveloperStore = defineStore({
  id: "developer",
  state: () => ({
    items: [],
    edit_developer: {},
  }),
  actions: {
    // Action to load developers
    setLoadDeveloper() {
      return new Promise((resolve, reject) => {
        axios
          .get("developers")
          .then((response) => {
            this.items = response.data.data;
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Action to store (create) a developer
    setStoreDeveloper(payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("developers", payload)
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Action to delete a developer by ID
    setDeleteDeveloper(developerId) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`developers/${developerId}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
     // Action to update a developer
     setUpdateDeveloper(payload) {
      return new Promise((resolve, reject) => {
        const developerId = payload.id; // Get the developer ID from the object
        axios
          .put(`developers/${developerId}`, payload)
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            console.error(
              "Update error:",
              err.response ? err.response.data : err
            );
            reject(err);
          });
      });
    },
  },

  getters: {
    // Getter to retrieve loaded developers
    getLoadDeveloper() {
      return this.items;
    },

    // Getter to retrieve the developer being edited
    getShowDeveloper() {
      return this.edit_developer;
    },
  },
});
