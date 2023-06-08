<template>
  <div
    id="deleteDieta"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="deleteDieta-label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          ¿Está seguro de que desea eliminar la dieta?
        </div>
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-primary"
            @click="deleteDieta"
            data-bs-dismiss="modal"
          >
            Borrar
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
import dietaService from "@/services/dieta.service";
// Tipos
import type ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "DeleteDieta",

  methods: {
    deleteDieta() {
      dietaService
        .delete(
          Number(this.$route.params.id_dieta),
          Number(this.$route.params.id_cliente)
        )
        .then((response: ResponseData) => {
          if (response) {
            // Volvemos al usuario
            this.$router.push({
              name: "cliente",
              params: { id_cliente: this.$route.params.id_cliente },
            });
          }
          // Emitir evento para que se recargue todo
          // Como ya somos el padre no tenemos que emitir nada, redireccionamos cliente
        });
    },
  },
});
</script>
