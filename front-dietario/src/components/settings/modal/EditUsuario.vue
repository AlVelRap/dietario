<template>
  <div id="EditUsuario" class="modal fade" tabindex="-1" aria-labelledby="EditUsuario-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <!-- Nombre -->
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" :class="{ 'form-error': v$.form.nombre.$errors.length }"
                  id="nombre" aria-describedby="icon-nombre" aria-label="Nuevo nombre" v-model="v$.form.nombre.$model" />
              </div>
              <div class="input-errors" v-for="(error, index) of v$.form.nombre.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <!-- Apellidos -->
            <div class="mb-3">
              <label for="apellidos" class="form-label">Apellidos</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" :class="{ 'form-error': v$.form.apellidos.$errors.length }"
                  id="apellidos" aria-describedby="icon-apellidos" aria-label="Nuevo apellidos"
                  v-model="v$.form.apellidos.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.apellidos.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <!-- Correo -->
            <div class="mb-3">
              <label for="correo" class="form-label">Correo</label>
              <div class="input-group mb-3">
                <input type="email" class="form-control" :class="{ 'form-error': v$.form.correo.$errors.length }"
                  id="correo" aria-describedby="icon-correo" aria-label="Nuevo correo" v-model="v$.form.correo.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.correo.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-primary" @click="updateUsuario" :disabled="v$.form.$invalid"
            data-bs-dismiss="modal">
            Actualizar
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// Servicios
import usuarioService from "@/services/usuario.service";
// Tipos
import type Usuario from "@/types/Usuario";
// Store
import { useMessageStore } from "@/stores/messages";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Validators
import useVuelidate from '@vuelidate/core'
import { required, email, helpers, maxLength } from '@vuelidate/validators'


export default defineComponent({
  name: "EditUsuario",

  data() {
    return {
      v$: useVuelidate(),
      form: {
        nombre: "",
        apellidos: "",
        correo: "",
      },
    };
  },
  props: {
    nombreOriginal: String,
    apellidosOriginal: String,
    correoOriginal: String,
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
        correo: {
          required: helpers.withMessage("Escriba una dirección de correo.", required),
          email: helpers.withMessage("Escribe una dirección de correo correcta.", email),
          max: helpers.withMessage("La contraseña debe tener menos de 255 caracteres.", maxLength(255))
        },
      }
    }
  },
  watch: {
    nombreOriginal() {
      this.form.nombre = this.nombreOriginal ? this.nombreOriginal : "";
    },
    apellidosOriginal() {
      this.form.apellidos = this.apellidosOriginal ? this.apellidosOriginal : "";
    },
    correoOriginal() {
      this.form.correo = this.correoOriginal ? this.correoOriginal : "";
    },
  },
  methods: {
    updateUsuario() {
      if (!this.v$.$validate()) return
      if (this.v$.$error) return
      const data: Usuario = {
        id_user: undefined,
        nombre: this.form.nombre,
        apellidos: this.form.apellidos,
        email: this.form.correo,
        password: undefined,
        salt: undefined,
      };
      usuarioService.updateGeneral(data).then((data) => {
        if (data) {
          this.$emit("updateUsuario")
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
  emits: ["updateUsuario"],
});
</script>
