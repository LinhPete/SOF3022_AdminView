import { createRouter, createWebHistory } from "vue-router";
import AdminLogin from "@/views/AdminLogin.vue";
import AdminHome from "@/views/AdminHome.vue";

const routes = [
  { path: "/login", component: AdminLogin },
  { path: "/admin", component: AdminHome, meta: { requiresAuth: true } },
  { path: "/", redirect: "/admin" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
