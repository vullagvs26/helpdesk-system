import { createRouter, createWebHashHistory } from "vue-router";


const MyTickets = () => import('@/views/MyTickets.vue');
const CreateTicket = () => import('@/views/CreateTicket.vue');



const routes = [
    {
        path: '/MyTickets',
        name: 'MyTickets',
        component: MyTickets
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