<template>
  <div
    id="registro"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="registro-label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <img
            class="img-thumbnail"
            src="../../assets/logo.png"
            alt="logo"
            height="60"
            width="60"
          />
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="nombre-registro" class="form-label">Nombre</label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="nombre-registro"
                  aria-describedby="icon-nombre-registro"
                  aria-label="Nombre del usuario"
                  v-model="nombre"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="apellidos-registro" class="form-label"
                >Apellidos</label
              >
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="apellidos-registro"
                  aria-describedby="icon-apellidos-registro"
                  aria-label="Apellidos del usuario"
                  v-model="apellidos"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="email-registro" class="form-label">Email</label>
              <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="email-registro"
                  aria-describedby="icon-email-registro"
                  aria-label="email del usuario"
                  v-model="email"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="pass-registro" class="form-label">Contraseña</label>
              <div class="input-group mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="pass-registro"
                  aria-describedby="icon-password-registro"
                  aria-label="contraseña del usuario"
                  v-model="password"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="rep-pass-registro" class="form-label"
                >Repita la contraseña</label
              >
              <div class="input-group mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="rep-pass-registro"
                  aria-describedby="icon-password-registro"
                  aria-label="repita la contraseña del usuario"
                  v-model="rep_password"
                />
              </div>
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="condiciones-registro"
                v-model="condiciones"
              />
              <label class="form-check-label" for="condiciones-registro"
                >Acepto los términos y condiciones</label
              >
            </div>
          </form>
          <div class="modal-footer text-center">
            <button
              type="button"
              class="btn btn-primary"
              @click="registroUser"
              data-bs-dismiss="modal"
            >
              Crear Cuenta
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-target="#login"
              data-bs-toggle="modal"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UsuarioService from "@/services/usuario.service";
import type Usuario from "@/types/Usuario";

export default defineComponent({
  name: "Registro",
  data() {
    return {
      nombre: "",
      apellidos: "",
      email: "",
      password: "",
      rep_password: "",
      condiciones: "",
    };
  },
  methods: {
    registroUser: function () {
      const data: Usuario = {
        id_user: undefined,
        nombre: this.nombre,
        apellidos: this.apellidos,
        email: this.email,
        password: this.password,
        salt: undefined,
      };
      console.log(data);
      UsuarioService.register(data).then((res) => {
        // console.log(res)
        // localStorage.setItem("token", res.token);
      });
    },
  },
});
</script>
