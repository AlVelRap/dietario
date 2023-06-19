<template>
  <!-- Notificacion tipo Toast -->
  <Notificacion></Notificacion>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <!-- Logo -->
      <router-link to="/" class="navbar-brand"><img alt="Logo" width="30" height="24"
          class="d-inline-block align-text-top" src="../assets/logo.png" /></router-link>
      <!-- Toggler para movil -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Los links -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white">Inicio</router-link>
          </li>
          <li class="nav-item" v-if="auth">
            <router-link to="/cliente" class="nav-link text-white">Clientes</router-link>
          </li>
          <li class="nav-item" v-if="auth">
            <router-link to="/settings" class="nav-link text-white">Configuración</router-link>
          </li>
        </ul>
        <!-- Botones de LogIn y LogOut -->
        <div class="d-flex">
          <button v-if="!auth" class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#login">
            LogIn
          </button>
          <button v-if="auth" class="btn btn-danger" @click="logoutUser" type="button">
            LogOut
          </button>
        </div>
      </div>
    </div>
  </nav>
  <!-- Modales -->
  <Login @emit-logged="checkAuth"></Login>
  <Registro></Registro>
</template>
<script lang="ts">
import { defineComponent, watch } from "vue";
// Componentes
import Login from "@/components/acceso/Login.vue";
import Registro from "@/components/acceso/Registro.vue";
import Notificacion from "@/components/errores/Notificacion.vue"
// Store
import { useMessageStore } from "@/stores/messages"

export default defineComponent({
  name: "NavBar",

  data() {
    return {
      auth: false,
      store: useMessageStore()
    };
  },
  components: {
    Login, Registro, Notificacion
  },
  methods: {
    logoutUser: function () {
      localStorage.removeItem("token-dietario");
      this.auth = localStorage.getItem("token-dietario") ? true : false
      this.$router.push({ name: 'home' })
    },
    checkAuth() {
      this.auth = localStorage.getItem("token-dietario") ? true : false
    }
  },
  beforeMount() {
    this.auth = localStorage.getItem("token-dietario") ? true : false
  }
});
</script>
