<template>
  <div id="addCliente" class="modal fade" tabindex="-1" aria-labelledby="addCliente-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <!-- Nombre -->
            <div class="mb-3">
              <label for="add-nombre-cliente" class="form-label">Nombre</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" :class="{ 'form-error': v$.form.nombre.$errors.length }"
                  id="add-nombre-cliente" aria-describedby="icon-input-cliente" aria-label="Añadir nombre cliente"
                  v-model="v$.form.nombre.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.nombre.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <!-- Apellidos -->
            <div class="mb-3">
              <label for="add-apellidos-cliente" class="form-label">Apellidos</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" :class="{ 'form-error': v$.form.apellidos.$errors.length }"
                  id="add-apellidos-cliente" aria-describedby="icon-input-cliente" aria-label="Añadir apellidos cliente"
                  v-model="v$.form.apellidos.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.apellidos.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <!-- Fecha nacimiento -->
            <div class="mb-3">
              <label for="add-fecha-nac-cliente" class="form-label">Fecha Nacimiento</label>
              <div class="input-group mb-3">
                <input type="date" class="form-control" :class="{ 'form-error': v$.form.fecha_nac.$errors.length }"
                  id="add-fecha-nac-cliente" aria-describedby="icon-input-cliente"
                  aria-label="Añadir fecha nacimiento cliente" v-model="v$.form.fecha_nac.$model" />
              </div>
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.fecha_nac.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <!-- Imagen de perfil -->
            <div class="mb-3">
              <label for="imagen-cliente" class="form-label">Imagen de perfil</label>
              <!-- Esto lo tengo que cambiar mas adelante de momento lo voy a dejar
              como si fuera un texto, mas adelante lo pondre como una imagen que
              se suba al servidor -->
              <div class="input-group mb-3">
                <input type="text" class="form-control" :class="{ 'form-error': v$.form.imagen.$errors.length }"
                  id="add-imagen-cliente" aria-describedby="icon-input-cliente"
                  aria-label="Añadir imagen de perfil del cliente" v-model="v$.form.imagen.$model" />
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
              <!-- error message -->
              <div class="input-errors" v-for="(error, index) of v$.form.imagen.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-primary" @click="postCliente" :disabled="v$.form.$invalid"
            data-bs-dismiss="modal">
            Añadir
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
import ClienteService from "@/services/cliente.service";
// Tipos
import type Cliente from "@/types/Cliente";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Store
import { useMessageStore } from "@/stores/messages";
// Validators
import useVuelidate from '@vuelidate/core'
import { required, helpers, maxLength } from '@vuelidate/validators'

// const fileInput = ref<HTMLInputElement | null>(null);
// const files = ref();

export default defineComponent({
  name: "AddCliente",

  data() {
    return {
      v$: useVuelidate(),
      form: {
        nombre: "",
        apellidos: "",
        fecha_nac: "",
        imagen: "https://c8.alamy.com/zooms/9/80d94c5b96c54446b2dc609a62b9f61b/2c5xkmf.jpg",
      },
    };
  },
  validations() {
    return {
      form: {
        nombre: {
          required: helpers.withMessage("Escriba un nombre.", required),
          max: helpers.withMessage("El nombre debe tener menos de 64 caracteres.", maxLength(64))
        },
        apellidos: {
          required: helpers.withMessage("Escriba los apellidos.", required),
          max: helpers.withMessage("Los apellidos deben tener menos de 64 caracteres.", maxLength(64))
        },
        fecha_nac: {
          required: helpers.withMessage("Escriba una fecha de nacimiento.", required),
        },
        imagen: {
          // required: helpers.withMessage("Escriba un cd a.", required),
          max: helpers.withMessage("La ruta debe tener menos de 255 caracteres.", maxLength(255))
        },
      }
    }
  },
  methods: {
    postCliente() {
      if (!this.v$.$validate()) return
      if (this.v$.$error) return
      // Modificamos el formato de la fecha
      const fecha_nacimiento: Date = new Date(this.form.fecha_nac);
      const year = fecha_nacimiento.getFullYear();
      const month = ("0" + (fecha_nacimiento.getMonth() + 1)).slice(-2);
      const day = ("0" + fecha_nacimiento.getDate()).slice(-2);
      const cadenaFecha = `${year}-${month}-${day}`;

      const data: Cliente = {
        id_cliente: undefined,
        id_user: undefined,
        nombre: this.form.nombre,
        apellidos: this.form.apellidos,
        fecha_nacimiento: cadenaFecha,
        imagen: this.form.imagen,
      };
      ClienteService.post(data).then((response) => {
        if (response) {
          this.$emit("updateCliente");
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
  emits: ["updateCliente"],
});
</script>
