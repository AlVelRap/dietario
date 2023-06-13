<template>
  <div id="login" class="modal fade" tabindex="-1" aria-labelledby="login-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <img class="img-thumbnail" src="../../assets/logo.png" alt="logo" height="60" width="60" />
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="email-login" class="form-label">Email</label>
              <div class="input-group mb-3">
                <input type="email" class="form-control" id="email-login" aria-describedby="icon-email-login"
                  aria-label="Añadir objetivo dieta" v-model="email" />
              </div>
            </div>
            <div class="mb-3">
              <label for="pass-login" class="form-label">Contraseña</label>
              <div class="input-group mb-3">
                <input type="password" class="form-control" id="pass-login" aria-describedby="icon-password-login"
                  aria-label="contraseña" v-model="password" />
              </div>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="recordar-login" v-model="recordarme" />
              <label class="form-check-label" for="recordar-login">Recordarme</label>
            </div>
          </form>
          <div>
            <a href="#">He olvidado mi contraseña</a>
          </div>
          <div class="modal-footer text-center">
            <button type="button" class="btn btn-primary" @click="loginUser" data-bs-dismiss="modal">
              Iniciar Sesión
            </button>
            <button type="button" class="btn btn-secondary" data-bs-target="#registro" data-bs-toggle="modal">
              Registrarse
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
import { useMessageStore } from "@/stores/messages"
import {GENERIC_ERR_MESSAGE} from "@/util/constants"


export default defineComponent({
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      recordarme: false,
    };
  },
  methods: {
    loginUser: function () {
      const data: Usuario = {
        id_user: undefined,
        nombre: undefined,
        apellidos: undefined,
        email: this.email,
        password: this.password,
        salt: undefined,
      };
      UsuarioService.login(data).then(async (res) => {
        localStorage.setItem("token-dietario", res.token);
        if (localStorage.getItem("token-dietario")) {
          this.$emit("emitLogged", true);
          this.$router.replace({ name: "listaClientes" });
        }
      })
        .catch((err) => {
          const store = useMessageStore()
          store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
        });
    },
  },
  emits: ["emitLogged"],
});
</script>
