import { createRouter, createWebHistory } from "vue-router";
// import { useAuthStore } from '@/stores';
import HomeView from "../views/HomeView.vue";
import ClienteView from "../views/ClienteView.vue";
import DietaView from "../views/DietaView.vue";
import DatosCliente from "@/components/clientes/DatosCliente.vue";
import Settings from "@/components/settings/SettingsComponent.vue";
import PageNotFound from "@/components/errores/PageNotFound.vue";
import RecordatorioMovil from "@/components/clientes/RecordatorioMovil.vue"
import UsuarioCreado from "@/components/acceso/UsuarioCreado.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cliente",
      name: "listaClientes",
      component: ClienteView,
      children: [
        {
          path: "",
          component: RecordatorioMovil,
          name: "recodatorio",
        },
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
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/creado",
      name: "creado",
      component: UsuarioCreado,
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
  const rutasPublicas = ["/", "/creado"];
  const rutasConAutorizacion = !rutasPublicas.includes(to.path);
  const token = localStorage.getItem("token-dietario");

  if (rutasConAutorizacion && !token) {
    return "/";
  }
});

export default router;
