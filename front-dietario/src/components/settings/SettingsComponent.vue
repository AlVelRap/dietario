<template>
  <h1>Hola, {{ nombre }}</h1>
  <hr />
  <div class="container">
    <div class="row">
      <p><b>Nombre</b></p>
      <p>{{ nombre }}</p>
    </div>
    <div class="row">
      <p><b>Apellidos</b></p>
      <p>{{ apellidos }}</p>
    </div>
    <div class="row">
      <p><b>Correo</b></p>
      <p>{{ correo }}</p>
    </div>
    <div class="row text-center">
      <div class="col">
        <button v-if="nombre" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#EditUsuario">
          Modificar
        </button>
      </div>
    </div>
    <hr />
    <div class="row">
      <p><b>Contaseña</b></p>
    </div>
    <div class="row text-center">
      <div class="col">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#CambiarPassword">
          Cambiar contraseña
        </button>
      </div>
    </div>
    <hr />
    <div class="row">
      <p><b>Cuenta</b></p>
    </div>
    <div class="row text-center">
      <div class="col">
        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteUsuario">
          Eliminar Cuenta
        </button>
      </div>
    </div>
  </div>
  <!-- Modales -->
  <DeleteUsuario></DeleteUsuario>
  <CambiarPassword></CambiarPassword>
  <EditUsuario :nombreOriginal="nombre" :apellidosOriginal="apellidos" :correoOriginal="correo"
    @update-usuario="getUsuario"></EditUsuario>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// Componentes
import DeleteUsuario from "@/components/settings/modal/DeleteUsuario.vue";
import CambiarPassword from "@/components/settings/modal/CambiarPassword.vue";
import EditUsuario from "@/components/settings/modal/EditUsuario.vue";
// Servicios
import usuarioService from "@/services/usuario.service";
// Tipos
import type Usuario from "@/types/Usuario";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Stores
import { useMessageStore } from "@/stores/messages";

export default defineComponent({
  name: "SettingsComponent",
  // Meter todas las llamadas al usuario
  data() {
    return {
      nombre: "",
      apellidos: "",
      correo: "",
    };
  },
  components: {
    DeleteUsuario,
    CambiarPassword,
    EditUsuario,
  },
  methods: {
    getUsuario() {
      usuarioService.getOne().then((usuario: Usuario) => {
        if (usuario.nombre && usuario.apellidos) {
          this.nombre = usuario.nombre;
          this.apellidos = usuario.apellidos;
          this.correo = usuario.email ? usuario.email : "";
        }
      }).catch((err) => {
        const store = useMessageStore()
        if (err.response && err.response.status == 403) {
          store.message = "Necesitas estar logueado."
          return
        }
        store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
      });
    },
  },
  mounted() {
    this.getUsuario();
  },
});
</script>
