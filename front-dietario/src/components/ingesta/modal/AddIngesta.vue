<template>
  <div id="addIngesta" class="modal fade" tabindex="-1" aria-labelledby="addIngesta-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="input-ingesta" class="form-label">Nombre ingesta</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" :class="{ 'form-error': v$.form.nombre.$errors.length }"
                  id="input-ingesta" aria-describedby="icon-input-ingesta" aria-label="Añadir nombre ingesta"
                  v-model="v$.form.nombre.$model" />
                <span class="input-group-text material-symbols-outlined" id="icon-input-ingesta">restaurant_menu</span>
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.nombre.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-primary" @click="postIngesta" :disabled="v$.form.$invalid"
            data-bs-dismiss="modal">
            Añadir
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
import IngestaService from "@/services/ingesta.service";
// Tipos
import type Ingesta from "@/types/Ingesta";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Store
import { useMessageStore } from "@/stores/messages";
// Validators
import useVuelidate from '@vuelidate/core'
import { required, helpers, maxValue, maxLength } from '@vuelidate/validators'


export default defineComponent({
  name: "AddIngesta",

  data() {
    return {
      v$: useVuelidate(),
      form: {
        nombre: "",
      }
    };
  },
  validations() {
    return {
      form: {
        nombre: {
          required: helpers.withMessage("Indique nombre de la ingesta.", required),
          max: helpers.withMessage("El nombre debe tener menos de 50 caracteres.", maxLength(50))
        },
      }
    }
  },
  methods: {
    postIngesta() {
      const data: Ingesta = {
        id_ingesta: undefined,
        id_dieta: Number(this.$route.params.id_dieta),
        nombre: this.form.nombre,
      };
      IngestaService.post(data).then((response) => {
        if (response) {
          this.$emit("updateIngesta");
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
});
</script>
