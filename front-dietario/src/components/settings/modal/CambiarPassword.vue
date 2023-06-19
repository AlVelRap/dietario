<template>
  <div id="CambiarPassword" class="modal fade" tabindex="-1" aria-labelledby="CambiarPassword-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <!-- Pass Actual -->
            <div class="mb-3">
              <label for="passActual">Contraseña Actual</label>
              <input type="password" class="form-control" :class="{ 'form-error': v$.form.passActual.$errors.length }"
                id="passActual" v-model="v$.form.passActual.$model" />
            </div>
            <!-- error message -->
            <div class="input-errors" v-for="(error, index) of v$.form.passActual.$errors" :key="index">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Nuevo Pass -->
            <div class="mb-3">
              <label for="nuevoPass">Nueva contraseña</label>
              <input type="password" class="form-control" :class="{ 'form-error': v$.form.nuevoPass.$errors.length }"
                id="nuevoPass" v-model="v$.form.nuevoPass.$model" />
            </div>
            <!-- error message -->
            <div class="input-errors" v-for="(error, index) of v$.form.nuevoPass.$errors" :key="index">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Repetir Pass -->
            <div class="mb-3">
              <label for="repetirPass">Repita la contraseña</label>
              <input type="password" class="form-control" :class="{ 'form-error': v$.form.repetirPass.$errors.length }"
                id="repetirPass" v-model="v$.form.repetirPass.$model" />
            </div>
            <!-- error message -->
            <div class="input-errors" v-for="(error, index) of v$.form.repetirPass.$errors" :key="index">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </form>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-primary" @click="cambiarPass" data-bs-dismiss="modal">
            Cambiar
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
// Store
import { useMessageStore } from "@/stores/messages";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Validators
import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers, sameAs, maxLength } from '@vuelidate/validators'


export default defineComponent({
  name: "CambiarPassword",
  data() {
    return {
      v$: useVuelidate(),
      form: {
        passActual: "",
        nuevoPass: "",
        repetirPass: "",
      },
    };
  },
  validations() {
    return {
      form: {
        passActual: {
          required: helpers.withMessage("Escriba contraseña actual.", required),
        },
        nuevoPass: {
          required: helpers.withMessage("Escriba su nueva contraseña.", required),
          min: helpers.withMessage("La contraseña debe tener 8 o más caracteres.", minLength(8)),
          max: helpers.withMessage("La contraseña debe tener menos de 64 caracteres.", maxLength(64)),
          regexpNumeros: helpers.withMessage("La contraseña debe tener al menos 1 número.", helpers.regex(/\d+/)),
          regexpMayus: helpers.withMessage("La contraseña debe tener al menos 1 letra mayúscula.", helpers.regex(/[A-Z]+/)),
          regexpMinus: helpers.withMessage("La contraseña debe tener al menos 1 letra minúscula.", helpers.regex(/[a-z]+/)),
          regexpEspecial: helpers.withMessage("La contraseña debe tener al menos 1 carácter especial.", helpers.regex(/\W+/)),
        },
        repetirPass: {
          required: helpers.withMessage("Repita su nueva contraseña.", required),
          sameAs: helpers.withMessage("Las contraseñas deben coincidir.", sameAs(this.form.nuevoPass)),
        },

      }
    }
  },
  methods: {
    cambiarPass() {
      const data: any = {
        passActual: this.form.passActual,
        nuevoPass: this.form.nuevoPass,
      };
      usuarioService.updatePass(data).then((data) => {
        localStorage.setItem("token-dietario", data.token);
      }).catch((err) => {
        const store = useMessageStore()
        if (err.response && err.response.status == 403) {
          store.message = "Necesitas estar logueado."
          return
        }
        store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
      })

    },
  },
});
</script>
