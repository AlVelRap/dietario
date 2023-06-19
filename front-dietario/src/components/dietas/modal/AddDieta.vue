<template>
  <div id="addDieta" class="modal fade" tabindex="-1" aria-labelledby="addDieta-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <!-- Objetivo -->
            <div class="mb-3">
              <label for="objetivo-dieta" class="form-label">Objetivo</label>
              <div class="input-group mb-3">
                <input type="number" class="form-control" :class="{ 'form-error': v$.form.objetivo.$errors.length }"
                  id="objetivo-dieta" aria-describedby="icon-input-dieta" aria-label="Añadir objetivo dieta"
                  v-model="v$.form.objetivo.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.objetivo.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <!-- Fecha -->
            <div class="mb-3">
              <label for="fecha-dieta" class="form-label">Fecha</label>
              <div class="input-group mb-3">
                <input type="date" class="form-control" :class="{ 'form-error': v$.form.fecha.$errors.length }"
                  id="fecha-dieta" aria-describedby="icon-input-dieta" aria-label="Añadir fecha de la dieta del cliente"
                  v-model="v$.form.fecha.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.fecha.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-primary" @click="postDieta" :disabled="v$.form.$invalid"
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
import DietaService from "@/services/dieta.service";
// Tipos
import type Dieta from "@/types/Dieta";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Store
import { useMessageStore } from "@/stores/messages";
// Validators
import useVuelidate from '@vuelidate/core'
import { required, helpers, maxValue, minValue } from '@vuelidate/validators'


export default defineComponent({
  name: "AddDieta",

  data() {
    return {
      v$: useVuelidate(),
      form: {
        fecha: "",
        objetivo: 0,
      },
    };
  },
  validations() {
    return {
      form: {
        fecha: {
          required: helpers.withMessage("Escriba la fecha de la dieta.", required),
        },
        objetivo: {
          required: helpers.withMessage("Indique el objetivo de la dieta.", required),
          max: helpers.withMessage("El objetivo de la dieta tiene que ser menor de 20.000 Kcal.", maxValue(20000)),
          min: helpers.withMessage("El objetivo de la dieta tiene que ser mayor de 0 Kcal.", minValue(1))
        },
      }
    }
  },

  methods: {
    postDieta() {
      if (!this.v$.$validate()) return
      if (this.v$.$error) return
      // Modificamos el formato de la fecha
      const fecha_nacimiento: Date = new Date(this.form.fecha);
      const year = fecha_nacimiento.getFullYear();
      const month = ("0" + (fecha_nacimiento.getMonth() + 1)).slice(-2);
      const day = ("0" + fecha_nacimiento.getDate()).slice(-2);
      const cadenaFecha = `${year}-${month}-${day}`;

      const data: Dieta = {
        id_dieta: undefined,
        id_cliente: Number(this.$route.params.id_cliente),
        fecha_dieta: cadenaFecha,
        objetivo: this.form.objetivo,
      };

      DietaService.post(data).then((response) => {
        if (response) {
          this.$emit("updateDieta");
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
  emits: ["updateDieta"],
});
</script>
