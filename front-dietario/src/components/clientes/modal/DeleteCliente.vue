<template>
  <div id="deleteCliente" class="modal fade" tabindex="-1" aria-labelledby="deleteCliente-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          ¿Está seguro de que desea eliminar el cliente?
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-primary" @click="deleteCliente" data-bs-dismiss="modal">
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
import clienteService from "@/services/cliente.service";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Store
import { useMessageStore } from "@/stores/messages";

export default defineComponent({
  name: "DeleteCliente",

  methods: {
    deleteCliente() {
      clienteService
        .delete(Number(this.$route.params.id_cliente))
        .then((response: any) => {
          if (response) {
            // Volvemos a la lista de clientes
            // this.$router.push({
            //   name: "listaClientes",
            // }) // Falta refrescar los componentes
            return window.location.pathname="/cliente"
          }
          // Emitir evento para que se recargue todo
          // Como ya somos el padre no tenemos que emitir nada, redireccionamos cliente
        })
        .catch((err) => {
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
