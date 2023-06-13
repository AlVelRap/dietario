<template>
  <div
    id="addIngesta"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="addIngesta-label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="input-ingesta" class="form-label"
                >Nombre ingesta</label
              >
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="input-ingesta"
                  aria-describedby="icon-input-ingesta"
                  aria-label="Añadir nombre ingesta"
                  v-model="nombre"
                />
                <span
                  class="input-group-text material-symbols-outlined"
                  id="icon-input-ingesta"
                  >restaurant_menu</span
                >
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-primary"
            @click="postIngesta"
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
// Componentes
// Servicios
import IngestaService from "@/services/ingesta.service";
// Tipos
import type Ingesta from "@/types/Ingesta";
// Constantes

export default defineComponent({
  name: "AddIngesta",

  data() {
    return {
      nombre: "",
    };
  },

  methods: {
    postIngesta() {
      const data: Ingesta = {
        id_ingesta: undefined,
        id_dieta: Number(this.$route.params.id_dieta),
        nombre: this.nombre,
      };
      IngestaService.post(data).then((response) => {
        if (response) {
          this.$emit("updateIngesta");
        }
      });
    },
  },
});
</script>
