import { createRouter, createWebHistory } from "vue-router";
import AdminLogin from "@/views/AdminLogin.vue";
import AdminHome from "@/views/AdminHome.vue";

const routes = [
  { path: "/login", component: AdminLogin },
  { path: "/admin", component: AdminHome },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
