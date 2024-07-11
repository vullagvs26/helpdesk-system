import axios from 'axios';
import { defineStore } from 'pinia';

export const useSystemStore = defineStore({
    id: 'system',
    state: () => ({
        items: [],
        edit_system: {}
    }),
    actions: {
        // Action to load systems
        setLoadSystem() {
            return new Promise((resolve, reject) => {
                axios.get('systems')
                    .then(response => {
                        this.items = response.data.data; // Assuming 'data' holds the array of systems
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

        // Action to store (create) a system
        setStoreSystem(payload) {
            return new Promise((resolve, reject) => {
                axios.post('systems', payload)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

        setUpdateSystem(payload) {
            return new Promise((resolve, reject)=> {
                axios.put(`systems/${payload.id}`, payload).then((response)=> {
                    
                    resolve(response.data)
                }) .catch(err => {
                    reject (err)
                })
            })
        },

        // Action to delete a system by ID
        setDeleteSystem(systemId) {
            return new Promise((resolve, reject) => {
                axios.delete(`systems/${systemId}`)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }
    },

    setUpdateEmployee(payload) {
            return new Promise((resolve, reject)=> {
                axios.put(`employees/${payload.id}`, payload).then((response)=> {
                    
                    resolve(response.data)
                }) .catch(err => {
                    reject (err)
                })
            })
        },

    getters: {
        // Getter to retrieve loaded systems
        getLoadSystem() {
            return this.items;
        },

        // Getter to retrieve the system being edited
        getShowSystem() {
            return this.edit_system;
        }
    }
});
