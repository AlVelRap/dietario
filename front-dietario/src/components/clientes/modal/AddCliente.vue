<template>
  <div
    id="addCliente"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="addCliente-label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="input-cliente" class="form-label">Nombre</label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="nombre-cliente"
                  aria-describedby="icon-input-cliente"
                  aria-label="Añadir nombre cliente"
                  v-model="nombre"
                />
                <!-- <span
                  class="input-group-text material-symbols-outlined"
                  id="icon-input-ingesta"
                  >restaurant_menu</span
                > -->
              </div>
            </div>
            <div class="mb-3">
              <label for="apellidos-cliente" class="form-label"
                >Apellidos</label
              >
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="apellidos-cliente"
                  aria-describedby="icon-input-cliente"
                  aria-label="Añadir apellidos cliente"
                  v-model="apellidos"
                />
                <!-- <span
                  class="input-group-text material-symbols-outlined"
                  id="icon-input-ingesta"
                  >restaurant_menu</span
                > -->
              </div>
            </div>
            <div class="mb-3">
              <label for="fecha-nac-cliente" class="form-label"
                >Fecha Nacimiento</label
              >
              <div class="input-group mb-3">
                <input
                  type="date"
                  class="form-control"
                  id="fecha-nac-cliente"
                  aria-describedby="icon-input-cliente"
                  aria-label="Añadir fecha nacimiento cliente"
                  v-model="fecha_nac"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="imagen-cliente" class="form-label"
                >Imagen de perfil</label
              >
              <!-- Esto lo tengo que cambiar mas adelante de momento lo voy a dejar
              como si fuera un texto, mas adelante lo pondre como una imagen que
              se suba al servidor -->
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="imagen-cliente"
                  aria-describedby="icon-input-cliente"
                  aria-label="Añadir imagen de perfil del cliente"
                  v-model="url"
                />
                <!-- <div class="input-group mb-3">
                <input
                  type="file"
                  class="form-control"
                  id="imagen-cliente"
                  aria-describedby="icon-input-cliente"
                  aria-label="Añadir imagen de perfil del cliente"
                  ref="fileInput"
                  @change="handleFileChange"
                /> -->
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-primary"
            @click="postCliente"
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
import ClienteService from "@/services/cliente.service";
// Tipos
import type Ingesta from "@/types/Ingesta";
import type Cliente from "@/types/Cliente";
// Constantes
import { ref } from "vue";

// const fileInput = ref<HTMLInputElement | null>(null);
// const files = ref();

export default defineComponent({
  name: "AddCliente",

  data() {
    return {
      nombre: "",
      apellidos: "",
      fecha_nac: "",
      url: "",
    };
  },

  methods: {
    postCliente() {
      // Modificamos el formato de la fecha
      const fecha_nacimiento: Date = new Date(this.fecha_nac);
      const year = fecha_nacimiento.getFullYear();
      const month = ("0" + (fecha_nacimiento.getMonth() + 1)).slice(-2);
      const day = ("0" + fecha_nacimiento.getDate()).slice(-2);
      const cadenaFecha = `${year}-${month}-${day}`;

      const data: Cliente = {
        id_cliente: undefined,
        id_user: 5, // temporaly
        nombre: this.nombre,
        apellidos: this.apellidos,
        fecha_nacimiento: cadenaFecha,
        imagen: this.url,
      };
      ClienteService.post(data).then((response) => {
        if (response) {
          this.$emit("updateCliente");
        }
      });
    },
  },
  emits: ["updateCliente"],
});
</script>
