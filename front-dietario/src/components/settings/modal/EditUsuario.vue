<template>
  <div
    id="EditUsuario"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="EditUsuario-label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  aria-describedby="icon-nombre"
                  aria-label="Nuevo nombre"
                  v-model="nombre"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="apellidos" class="form-label">Apellidos</label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="apellidos"
                  aria-describedby="icon-apellidos"
                  aria-label="Nuevo apellidos"
                  v-model="apellidos"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="correo" class="form-label">Correo</label>
              <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="correo"
                  aria-describedby="icon-correo"
                  aria-label="Nuevo correo"
                  v-model="correo"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-primary"
            @click="updateUsuario"
            data-bs-dismiss="modal"
          >
            Actualizar
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import usuarioService from "@/services/usuario.service";
import type Usuario from "@/types/Usuario";
import { defineComponent } from "vue";
// Servicios
// Tipos

export default defineComponent({
  name: "EditUsuario",

  data() {
    return {
      nombre: "",
      apellidos: "",
      correo: "",
    };
  },
  props: {
    nombreOriginal: String,
    apellidosOriginal: String,
    correoOriginal: String,
  },
  watch: {
    nombreOriginal() {
      this.nombre = this.nombreOriginal ? this.nombreOriginal : "";
    },
    apellidosOriginal() {
      this.apellidos = this.apellidosOriginal ? this.apellidosOriginal : "";
    },
    correoOriginal() {
      this.correo = this.correoOriginal ? this.correoOriginal : "";
    },
  },
  methods: {
    updateUsuario() {
      const data: Usuario = {
        id_user: undefined,
        nombre: this.nombre,
        apellidos: this.apellidos,
        email: this.correo,
        password: undefined,
        salt: undefined,
      };
      usuarioService.updateGeneral(data).then((data)=>{
        if(data){
          this.$emit("updateUsuario")
        }

      });
    },
  },
  emits: ["updateUsuario"],
});
</script>
