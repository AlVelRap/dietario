<template>
  <div
    id="addPeso"
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
              <label for="input-peso" class="form-label">Peso</label>
              <div class="input-group mb-3">
                <input
                  type="number"
                  class="form-control"
                  id="nombre-peso"
                  aria-describedby="icon-input-peso"
                  aria-label="Añadir peso"
                  v-model="peso"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="fecha-peso" class="form-label">Fecha</label>
              <div class="input-group mb-3">
                <input
                  type="date"
                  class="form-control"
                  id="fecha-peso"
                  aria-describedby="icon-input-peso"
                  aria-label="Añadir fecha del peso del cliente"
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
            @click="postPeso"
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
import pesoService from "@/services/peso.service";
import type Peso from "@/types/Peso";
// Tipos

export default defineComponent({
  name: "AddPeso",

  data() {
    return {
      fecha: "",
      peso: 0,
    };
  },

  methods: {
    postPeso() {
        // Modificamos el formato de la fecha
      const fecha_nacimiento: Date = new Date(this.fecha);
      const year = fecha_nacimiento.getFullYear();
      const month = ("0" + (fecha_nacimiento.getMonth() + 1)).slice(-2);
      const day = ("0" + fecha_nacimiento.getDate()).slice(-2);
      const cadenaFecha = `${year}-${month}-${day}`;

      const data: Peso = {
        id_peso: undefined,
        id_cliente: Number(this.$route.params.id_cliente),
        fecha: cadenaFecha,
        peso: this.peso,
      };

      pesoService.post(data).then((response) => {
        if (response) {
          this.$emit("updatePeso");
        }
      });
    },
  },
  emits: ["updatePeso"],
});
</script>
