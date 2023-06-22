<template>
  <div id="login" class="modal fade" tabindex="-1" aria-labelledby="login-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center w-100">
            <img class="img-thumbnail" src="../../assets/logo.png" alt="logo" height="60" width="60" />
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <!-- Email -->
            <div class="form-group mb-3">
              <label for="email-login" class="form-label">Email</label>
              <div class="input-group mb-3">
                <input type="email" class="form-control" :class="{ 'form-error': v$.form.email.$errors.length }"
                  id="email-login" aria-describedby="icon-email-login" aria-label="correo" placeholder="Escriba su correo"
                  v-model="v$.form.email.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <!-- Contraseña -->
            <div class="mb-3">
              <label for="pass-login" class="form-label">Contraseña</label>
              <div class="input-group mb-3">
                <input type="password" class="form-control" :class="{ 'form-error': v$.form.password.$errors.length }"
                  id="pass-login" aria-describedby="icon-password-login" aria-label="contraseña"
                  placeholder="Escriba su contraseña" v-model="v$.form.password.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <!-- Recordarme -->
            <!-- <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="recordar-login" v-model="v$.form.recordarme.$model" />
              <label class="form-check-label" for="recordar-login">Recordarme</label>
            </div> -->
            <div>
              <!-- <a href="#">He olvidado mi contraseña</a> -->
            </div>
            <div class="modal-footer text-center">
              <button type="button" class="btn btn-primary" @click="loginUser" :disabled="v$.form.$invalid" data-bs-dismiss="modal">
                Iniciar Sesión
              </button>
              <button type="button" class="btn btn-secondary" data-bs-target="#registro" data-bs-toggle="modal">
                Registrarse
              </button>
            </div>
          </form>
          <div v-if="errMessage" class="alert alert-danger" role="alert">
            {{ errMessage }}
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
import { GENERIC_ERR_MESSAGE } from "@/util/constants"
// Validators
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'


export default defineComponent({
  name: "Login",
  data() {
    return {
      v$: useVuelidate(),
      form: {
        email: "",
        password: "",
        // recordarme: false,
      },
      errMessage: "",
    };
  },
  validations() {
    return {
      form: {
        email: {
          required: helpers.withMessage("Escriba una dirección de correo.", required),
          email: helpers.withMessage("Escribe una dirección de correo correcta.", email)
        },
        password: {
          required: helpers.withMessage("Escriba su contraseña.", required),
          min: helpers.withMessage("La contraseña debe tener más de 6 caracteres.", minLength(6))
        },
        // recordarme: {}
      }
    }
  },
  methods: {
    loginUser: function () {
      if (!this.v$.$validate()) return
      if (this.v$.$error) return
      const data: Usuario = {
        id_user: undefined,
        nombre: undefined,
        apellidos: undefined,
        email: this.form.email,
        password: this.form.password,
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
          if (err.response.status == 404) {
            this.errMessage = "Usuario y/o Contraseña incorrecta"
            return
          }
          const store = useMessageStore()
          store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
        });
    },
  },
  emits: ["emitLogged"],
});
</script>
