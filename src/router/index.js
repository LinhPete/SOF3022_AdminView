import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "AdminDashBoard",
      component: () => import("../views/HomeAdmin.vue"),
    }
  ],
});
export default router
