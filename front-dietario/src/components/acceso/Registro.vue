<template>
  <div id="registro" class="modal fade" tabindex="-1" aria-labelledby="registro-label" aria-hidden="true">
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
            <div class="mb-3">
              <!-- Nombre -->
              <label for="nombre-registro" class="form-label">Nombre</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" :class="{ 'form-error': v$.form.nombre.$errors.length }"
                  id="nombre-registro" aria-describedby="icon-nombre-registro" aria-label="Nombre del usuario"
                  v-model="v$.form.nombre.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.nombre.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <div class="mb-3">
              <!-- Apellidos -->
              <label for="apellidos-registro" class="form-label">Apellidos</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" :class="{ 'form-error': v$.form.apellidos.$errors.length }"
                  id="apellidos-registro" aria-describedby="icon-apellidos-registro" aria-label="Apellidos del usuario"
                  v-model="v$.form.apellidos.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.apellidos.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <div class="mb-3">
              <!-- Email -->
              <label for="email-registro" class="form-label">Email</label>
              <div class="input-group mb-3">
                <input type="email" class="form-control" :class="{ 'form-error': v$.form.email.$errors.length }"
                  id="email-registro" aria-describedby="icon-email-registro" aria-label="email del usuario"
                  v-model="v$.form.email.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <div class="mb-3">
              <!-- Pass -->
              <label for="pass-registro" class="form-label">Contraseña</label>
              <div class="input-group mb-3">
                <input type="password" class="form-control"
                  :class="{ 'form-error': v$.form.password.password.$errors.length }" id="pass-registro"
                  aria-describedby="icon-password-registro" aria-label="contraseña del usuario"
                  v-model="v$.form.password.password.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.password.password.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <!-- Repetir pass -->
            <div class="mb-3">
              <label for="rep-pass-registro" class="form-label">Repita la contraseña</label>
              <div class="input-group mb-3">
                <input type="password" class="form-control"
                  :class="{ 'form-error': v$.form.password.confirm.$errors.length }" id="rep-pass-registro"
                  aria-describedby="icon-password-registro" aria-label="repita la contraseña del usuario"
                  v-model="v$.form.password.confirm.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.password.confirm.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input"
                :class="{ 'form-error': v$.form.condiciones.$errors.length }" id="condiciones-registro"
                v-model="v$.form.condiciones.$model" />
              <label class="form-check-label" for="condiciones-registro">Acepto los términos y condiciones</label>
            </div>
            <!-- error message -->
            <div class="input-errors" v-for="(error, index) of v$.form.condiciones.$errors" :key="index">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </form>
          <div class="modal-footer text-center">
            <button type="button" class="btn btn-primary" @click="registroUser" :disabled="v$.form.$invalid"
              data-bs-dismiss="modal">
              Crear Cuenta
            </button>
            <button type="button" class="btn btn-secondary" data-bs-target="#login" data-bs-toggle="modal">
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
// Tipos
import type Usuario from "@/types/Usuario";
// Servicios
import UsuarioService from "@/services/usuario.service";
// Store
import { useMessageStore } from "@/stores/messages";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Validators
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers, sameAs, maxLength } from '@vuelidate/validators'

export default defineComponent({
  name: "Registro",
  data() {
    return {
      v$: useVuelidate(),
      form: {
        nombre: "",
        apellidos: "",
        email: "",
        password: {
          password: "",
          confirm: "",
        },
        condiciones: false,
      },
    };
  },
  validations() {
    return {
      form: {
        nombre: {
          required: helpers.withMessage("Escriba un nombre.", required),
          max: helpers.withMessage("El nombre debe tener menos de 64 caracteres.", maxLength(64))
        },
        apellidos: {
          required: helpers.withMessage("Escriba su(s) apellido(s).", required),
          max: helpers.withMessage("Los apellidos deben tener menos de 64 caracteres.", maxLength(64))
        },
        email: {
          required: helpers.withMessage("Escriba una dirección de correo.", required),
          email: helpers.withMessage("Escribe una dirección de correo correcta.", email),
          max: helpers.withMessage("La contraseña debe tener menos de 255 caracteres.", maxLength(255))
        },
        password: {
          password: {
            required: helpers.withMessage("Escriba su contraseña.", required),
            min: helpers.withMessage("La contraseña debe tener 8 o más caracteres.", minLength(8)),
            max: helpers.withMessage("La contraseña debe tener menos de 64 caracteres.", maxLength(64)),
            regexpNumeros: helpers.withMessage("La contraseña debe tener al menos 1 número.", helpers.regex(/\d+/)),
            regexpMayus: helpers.withMessage("La contraseña debe tener al menos 1 letra mayúscula.", helpers.regex(/[A-Z]+/)),
            regexpMinus: helpers.withMessage("La contraseña debe tener al menos 1 letra minúscula.", helpers.regex(/[a-z]+/)),
            regexpEspecial: helpers.withMessage("La contraseña debe tener al menos 1 carácter especial.", helpers.regex(/\W+/)),
          },
          confirm: {
            required: helpers.withMessage("Repita su contraseña.", required),
            sameAs: helpers.withMessage("Las contraseñas deben coincidir.", sameAs(this.form.password.password)),
          },
        },
        condiciones: { required: helpers.withMessage("Debe aceptar los terminos y condiciones.", required) }
      }
    }
  },
  methods: {
    registroUser: function () {
      if (!this.v$.$validate()) return
      if (this.v$.$error) return
      const data: Usuario = {
        id_user: undefined,
        nombre: this.form.nombre,
        apellidos: this.form.apellidos,
        email: this.form.email,
        password: this.form.password.password,
        salt: undefined,
      };
      UsuarioService.register(data).then((res) => {
        // const store = useMessageStore()
        // store.message = "Usuario creado satisfactoriamente."
        this.$router.replace({ name: "creado" });
      }).catch((err) => {
        const store = useMessageStore()
        store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
      });
    },
  },
});
</script>
