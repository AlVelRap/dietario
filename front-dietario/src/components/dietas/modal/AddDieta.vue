<template>
  <div
    id="addDieta"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="addPeso-label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="objetivo-dieta" class="form-label">Objetivo</label>
              <div class="input-group mb-3">
                <input
                  type="number"
                  class="form-control"
                  id="objetivo-dieta"
                  aria-describedby="icon-input-dieta"
                  aria-label="Añadir objetivo dieta"
                  v-model="objetivo"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="fecha-dieta" class="form-label">Fecha</label>
              <div class="input-group mb-3">
                <input
                  type="date"
                  class="form-control"
                  id="fecha-dieta"
                  aria-describedby="icon-input-dieta"
                  aria-label="Añadir fecha de la dieta del cliente"
                  v-model="fecha"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-primary"
            @click="postDieta"
            data-bs-dismiss="modal"
          >
            Añadir
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
import { defineComponent } from "vue";
// Servicios
import DietaService from "@/services/dieta.service";
import type Peso from "@/types/Peso";
import type Dieta from "@/types/Dieta";
// Tipos

export default defineComponent({
  name: "AddDieta",

  data() {
    return {
      fecha: "",
      peso: 0,
      objetivo: 0,
    };
  },

  methods: {
    postDieta() {
      // Modificamos el formato de la fecha
      const fecha_nacimiento: Date = new Date(this.fecha);
      const year = fecha_nacimiento.getFullYear();
      const month = ("0" + (fecha_nacimiento.getMonth() + 1)).slice(-2);
      const day = ("0" + fecha_nacimiento.getDate()).slice(-2);
      const cadenaFecha = `${year}-${month}-${day}`;

      const data: Dieta = {
        id_dieta: undefined,
        id_cliente: Number(this.$route.params.id_cliente),
        fecha_dieta: cadenaFecha,
        objetivo: this.objetivo,
      };

      DietaService.post(data).then((response) => {
        // console.log(response);
        if (response) {
          this.$emit("updateDieta");
        }
      });
    },
  },
  emits: ["updateDieta"],
});
</script>
