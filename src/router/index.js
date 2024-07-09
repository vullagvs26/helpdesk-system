import { createRouter, createWebHashHistory } from "vue-router";

const Dashboard = () => import('@/views/Dashboard.vue');
const Tickets = () => import('@/views/Tickets.vue');
const Developers = () => import('@/views/Developers.vue');


const Systems = () => import('@/views/Systems.vue');
const CreateTicket = () => import('@/views/CreateTicket.vue');



const routes = [
    {
        path: '/Dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/Tickets',
        name: 'Tickets',
        component: Tickets
    },
    {
        path: '/Developers',
        name: 'Developers',
        component: Developers
    },
    {
        path: '/Systems',
        name: 'Systems',
        component: Systems
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