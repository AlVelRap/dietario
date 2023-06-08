<template>
  <div
    id="CambiarPassword"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="CambiarPassword-label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="passActual">Contraseña Actual</label>
              <input
                type="password"
                class="form-control"
                id="passActual"
                v-model="passActual"
              />
            </div>
            <div class="mb-3">
              <label for="nuevoPass">Nueva contraseña</label>
              <input
                type="password"
                class="form-control"
                id="nuevoPass"
                v-model="nuevoPass"
              />
            </div>
            <div class="mb-3">
              <label for="repetirPass">Repita la contraseña</label>
              <input
                type="password"
                class="form-control"
                id="repetirPass"
                v-model="repetirPass"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-primary"
            @click="cambiarPass"
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
import type Usuario from "@/types/Usuario";
import { defineComponent } from "vue";
// Servicios
// Tipos

export default defineComponent({
  name: "CambiarPassword",
  data() {
    return {
      passActual: "",
      nuevoPass: "",
      repetirPass: "",
    };
  },
  methods: {
    cambiarPass() {
      const data: any = {
        passActual: this.passActual,
        nuevoPass: this.nuevoPass,
      };
      usuarioService.updatePass(data).then((data)=>{
        console.log(data)
      })
      
    },
  },
});
</script>
