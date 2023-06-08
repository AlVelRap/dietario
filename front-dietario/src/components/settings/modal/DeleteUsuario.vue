<template>
  <div
    id="DeleteUsuario"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="DeleteUsuario-label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          ¿Está seguro de que desea eliminar su cuenta? Una vez eliminada su
          cuenta sus datos no se podrán recuperar.
        </div>
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-primary"
            @click="deleteUsuario"
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
import usuarioService from "@/services/usuario.service";
import { defineComponent } from "vue";
// Servicios
// Tipos

export default defineComponent({
  name: "DeleteUsuario",
  methods: {
    deleteUsuario() {
      usuarioService.delete().then((data) => {
        if (data) {
          localStorage.removeItem("token-dietario");
          // this.$router.push({ name: "home" });
          this.$router.go(0)

        }
      });
    },
  },
});
</script>
