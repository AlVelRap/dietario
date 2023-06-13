<template>
  <div :id="`delete-ingrediente${id_ingrediente}-${id_ingesta}`" class="modal fade" tabindex="-1" :aria-labelledby="
    'ingrediente' + id_ingrediente + '-' + id_ingesta + '-label'
  " aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          ¿Está seguro de que desea eliminar el ingrediente?
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-primary" @click="deleteIngrediente" data-bs-dismiss="modal">
            Borrar
          </button>
          <button type="button" class="btn btn-secondary" :data-bs-target="`#ingrediente${id_ingrediente}-${id_ingesta}`"
            data-bs-toggle="modal">
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
import IngestaIngredienteService from "@/services/ingestaIngrediente.service";
// Tipos
import type ResponseData from "@/types/ResponseData";
import { useMessageStore } from "@/stores/messages";
import { GENERIC_ERR_MESSAGE } from "@/util/constants";

export default defineComponent({
  name: "DeleteIngrediente",
  props: {
    id_ingesta: Number,
    id_ingrediente: Number,
  },
  methods: {
    deleteIngrediente() {
      if (!this.id_ingrediente || !this.id_ingesta) return;
      IngestaIngredienteService.delete(
        this.id_ingrediente,
        this.id_ingesta
      ).then((response: ResponseData) => {
        if (response) {
          this.$emit("deleteIngrediente");
        }
        // Emitir evento para que se recargue todo
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
  emits: ["deleteIngrediente", "showEditIngrediente"],
});
</script>
