import axios from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        items: [],
        edit_user: {}
    }),
    actions: {
        // Action to load users
        setLoadUser() {
            return new Promise((resolve, reject) => {
                axios.get('users')
                    .then(response => {
                        this.items = response.data.data; 
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

        // Action to store (create) a user
        setStoreUser(payload) {
            return new Promise((resolve, reject) => {
                axios.post('users', payload)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

        // Action to delete a user by ID
        setDeleteUser(userId) {
            return new Promise((resolve, reject) => {
                axios.delete(`users/${userId}`)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }
    },

    getters: {
        // Getter to retrieve loaded users
        getLoadUser() {
            return this.items;
        },

        // Getter to retrieve the user being edited
        getShowUser() {
            return this.edit_user;
        }
    }
});
