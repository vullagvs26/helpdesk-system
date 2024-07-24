// src/router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import useAuth from "@/modules/auth";

const Dashboard = () => import("@/views/Dashboard.vue");
const Tickets = () => import("@/views/Tickets.vue");
const Developers = () => import("@/views/Developers.vue");
const Systems = () => import("@/views/Systems.vue");
const CreateTicket = () => import("@/views/CreateTicket.vue");
const Login = () => import("@/views/Login.vue");
const Register = () => import("@/views/Register.vue");

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/Dashboard", name: "Dashboard", component: Dashboard },
  { path: "/Tickets", name: "Tickets", component: Tickets },
  { path: "/Developers", name: "Developers", component: Developers },
  { path: "/Systems", name: "Systems", component: Systems },
  { path: "/CreateTicket", name: "CreateTicket", component: CreateTicket },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { state } = useAuth();
  if (to.name !== "Login" && to.name !== "Register" && !state.isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
