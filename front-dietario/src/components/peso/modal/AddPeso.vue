<template>
  <div id="addPeso" class="modal fade" tabindex="-1" aria-labelledby="addPeso-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <!-- Peso -->
            <div class="mb-3">
              <label for="input-peso" class="form-label">Peso</label>
              <div class="input-group mb-3">
                <input type="number" class="form-control" :class="{ 'form-error': v$.form.peso.$errors.length }"
                  id="nombre-peso" aria-describedby="icon-input-peso" aria-label="Añadir peso"
                  v-model="v$.form.peso.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.peso.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <!-- Fecha -->
            <div class="mb-3">
              <label for="fecha-peso" class="form-label">Fecha</label>
              <div class="input-group mb-3">
                <input type="date" class="form-control" :class="{ 'form-error': v$.form.fecha.$errors.length }"
                  id="fecha-peso" aria-describedby="icon-input-peso" aria-label="Añadir fecha del peso del cliente"
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
          <button type="button" class="btn btn-primary" @click="postPeso" :disabled="v$.form.$invalid"
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
import pesoService from "@/services/peso.service";
// Tipos
import type Peso from "@/types/Peso";
// Store
import { useMessageStore } from "@/stores/messages";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Validators
import useVuelidate from '@vuelidate/core'
import { required, helpers, maxValue, minValue } from '@vuelidate/validators'


export default defineComponent({
  name: "AddPeso",

  data() {
    return {
      v$: useVuelidate(),
      form: {
        fecha: "",
        peso: 0,
      },
      // fecha: "",
      // peso: 0,
    };
  },
  validations() {
    return {
      form: {
        fecha: {
          required: helpers.withMessage("Escriba la fecha del peso.", required),
        },
        peso: {
          required: helpers.withMessage("Indique el peso.", required),
          max: helpers.withMessage("El peso tiene que ser menor de 1.000 Kg.", maxValue(1000)),
          min: helpers.withMessage("El peso dieta tiene que ser mayor de 0 Kg.", minValue(1))
        },
      }
    }
  },

  methods: {
    postPeso() {
      if (!this.v$.$validate()) return
      if (this.v$.$error) return
      // Modificamos el formato de la fecha
      const fecha_nacimiento: Date = new Date(this.form.fecha);
      const year = fecha_nacimiento.getFullYear();
      const month = ("0" + (fecha_nacimiento.getMonth() + 1)).slice(-2);
      const day = ("0" + fecha_nacimiento.getDate()).slice(-2);
      const cadenaFecha = `${year}-${month}-${day}`;

      const data: Peso = {
        id_peso: undefined,
        id_cliente: Number(this.$route.params.id_cliente),
        fecha: cadenaFecha,
        peso: this.form.peso,
      };

      pesoService.post(data).then((response) => {
        if (response) {
          this.$emit("updatePeso");
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
  emits: ["updatePeso"],
});
</script>
