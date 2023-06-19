<template>
  <div :id="`deleteIngesta-${id_ingesta}`" class="modal fade" tabindex="-1" aria-labelledby="deleteIngesta-label"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          ¿Está seguro de que desea eliminar la ingesta?
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-primary" @click="deleteIngesta" data-bs-dismiss="modal">
            Borrar
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
import ingestaService from "@/services/ingesta.service";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Store
import { useMessageStore } from "@/stores/messages";

export default defineComponent({
  name: "DeleteIngesta",
  props: {
    id_ingesta: Number,
  },
  methods: {
    deleteIngesta() {
      if (!this.id_ingesta) return;
      ingestaService
        .delete(Number(this.$route.params.id_dieta), this.id_ingesta)
        .then((response: any) => {
          if (response) {
            this.$emit("deleteIngesta");
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
  emits: ["deleteIngesta"],
});
</script>
