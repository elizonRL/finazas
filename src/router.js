import { createWebHistory, createRouter } from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Ingresos from "./views/Ingresos.vue";
import Login from "./views/Login.vue"
import Registro from "@/views/Registro.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/ingresos",
    component: Ingresos,
  },
  {
    path:"/login",
    component: Login,
  },
  {
    path:"/singup",
    component: Registro,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
