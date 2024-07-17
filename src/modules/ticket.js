import axios from 'axios';
import { defineStore } from 'pinia';

export const useTicketStore = defineStore({
    id: 'ticket',
    state: () => ({
        items: [],
        edit_ticket: {}
    }),
    actions: {
        // Action to load tickets
        setLoadTicket() {
            return new Promise((resolve, reject) => {
                axios.get('tickets')
                    .then(response => {
                        this.items = response.data.data; 
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

        // Action to store (create) a ticket
        setStoreTicket(payload) {
            return new Promise((resolve, reject) => {
                axios.post('tickets', payload)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
         // Action to update the status of a ticket
         updateTicketStatus(ticketId, newStatus) {
            return new Promise((resolve, reject) => {
                axios.put(`tickets/${ticketId}`, { status: newStatus })
                    .then(response => {
                        // Optionally update local state or perform any other actions after successful update
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

        // Action to delete a ticket by ID
        setDeleteTicket(ticketId) {
            return new Promise((resolve, reject) => {
                axios.delete(`tickets/${ticketId}`)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        
    
    },

    getters: {
        // Getter to retrieve loaded tickets
        getLoadTicket() {
            return this.items;
        },

        // Getter to retrieve the ticket being edited
        getShowTicket() {
            return this.edit_ticket;
        }
    }
});
