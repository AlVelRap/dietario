<template>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"
        ><img
          alt="Logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
          src="../assets/logo.png"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white">Inicio</router-link>
          </li>
          <li class="nav-item" v-if="auth">
            <router-link to="/cliente" class="nav-link text-white">Clientes</router-link>
          </li>
          <li class="nav-item" v-if="auth">
            <router-link to="/settings" class="nav-link text-white">Settings</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <button
            v-if="!auth"
            class="btn btn-success"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#login"
          >
            LogIn
          </button>
          <button
            v-if="auth"
            class="btn btn-danger"
            @click="logoutUser"
            type="button"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  </nav>
  <Login @emit-logged="checkAuth"></Login>
  <Registro></Registro>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// Componentes
import Login from "@/components/acceso/Login.vue";
import Registro from "@/components/acceso/Registro.vue";

export default defineComponent({
  name: "NavBar",

  data() {
    return {
      auth: false,
    };
  },
  components: {
    Login,Registro
  },
  watch:{},
  methods: {
    logoutUser: function () {
      localStorage.removeItem("token-dietario");
      this.auth = localStorage.getItem("token-dietario")?true:false
      this.$router.push({ name: 'home'})
    },
    checkAuth(){
      this.auth = localStorage.getItem("token-dietario")?true:false
    }
  },
  beforeMount(){
    this.auth = localStorage.getItem("token-dietario")?true:false
  }
});
</script>
