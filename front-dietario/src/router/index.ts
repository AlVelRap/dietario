import { createRouter, createWebHistory } from "vue-router";
// import { useAuthStore } from '@/stores';
import HomeView from "../views/HomeView.vue";
import ClienteView from "../views/ClienteView.vue";
import DietaView from "../views/DietaView.vue";
import Login from "../components/acceso/Login.vue";
import Registro from "../components/acceso/Registro.vue";
import DatosCliente from "@/components/clientes/DatosCliente.vue";
import Settings from "@/components/settings/SettingsComponent.vue";
import PageNotFound from "@/components/errores/PageNotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
    {
      path: "/cliente",
      name: "listaClientes",
      component: ClienteView,
      children: [
        {
          path: ":id_cliente",
          component: DatosCliente,
          name: "cliente",
        },
        {
          path: ":id_cliente/dieta/:id_dieta",
          component: DietaView,
          name: "dieta",
        },
      ],
    },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: Login,
    // },
    // {
    //   path: "/registro",
    //   name: "registro",
    //   component: Registro,
    // },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: PageNotFound,
    },
  ],
});

router.beforeEach(async (to) => {
  // Nos redirige a la pagina principal si no hay token
  const rutasPublicas = ["/"];
  const rutasConAutorizacion = !rutasPublicas.includes(to.path);
  const token = localStorage.getItem("token-dietario");

  if (rutasConAutorizacion && !token) {
    return "/";
  }
});

export default router;
