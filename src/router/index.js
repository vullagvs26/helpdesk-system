import { createRouter, createWebHashHistory } from "vue-router";


const Tickets = () => import('@/views/Tickets.vue');
const CreateTicket = () => import('@/views/CreateTicket.vue');



const routes = [
    {
        path: '/Tickets',
        name: 'Tickets',
        component: Tickets
    },
    {
        path: '/CreateTicket',
        name: 'CreateTicket',
        component: CreateTicket
    },
   
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router;