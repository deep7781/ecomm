import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/components/Register.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/Layouts/AdminLayout.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("isLoggedIn")) {
        next();
      } else {
        next("/login");
      }
    },
    children: [
      {
        path: "/admin/product/:id",
        name: "edit",
        component: () => import("@/views/Admin/EditProduct.vue"),
      },
      {
        path: "/admin/product",
        name: "adminProducts",
        component: () => import("@/views/Admin/AllProducts.vue"),
      },
      {
        path: "/admin/Dashboard",
        name: "dashboard",
        component: () => import("@/views/Admin/Dashboard.vue"),
      },
      {
        path: "/admin/product/new",
        name: "AddNew",
        component: () => import("@/views/Admin/AddNewProduct.vue"), // Added .vue extension
      },
      {
        path: "/admin/Orders",
        name: "Orders",
        component: () => import("@/views/Admin/Orders.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
