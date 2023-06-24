<template>
  <div :id="'addIngesta' + id_ingesta" class="modal fade" tabindex="-1"
    :aria-labelledby="'addIngesta' + id_ingesta + '-label'" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div> -->
        <div class="modal-body">
          <form>
            <!-- Grupo Alimentario -->
            <div class="mb-3">
              <label :for="`select-grupo-${id_ingesta}`" class="form-label">Grupo Alimentario</label>
              <select :id="`select-grupo-${id_ingesta}`" class="form-select" aria-label="Select de grupo Alimentario"
                @change="getIngredientesGrupo">
                <option value="0">Seleccione un grupo</option>
                <option v-for="grupo in grupos" :value="grupo.id_grupo">{{ grupo.nombre_grupo }}
                </option>
              </select>
            </div>
            <!-- Ingrediente -->
            <div class="mb-3">
              <label :for="`select-ingrediente-${id_ingesta}`" class="form-label">Ingrediente</label>
              <select :id="`select-ingrediente-${id_ingesta}`" class="form-select"
                :class="{ 'form-error': v$.form.id_ingrediente.$errors.length }" aria-label="Select de grupo ingrediente"
                v-model="v$.form.id_ingrediente.$model">
                <option selected>Seleccione un ingrediente</option>
                <option v-for="ingrediente in ingredientes" :value="ingrediente.id_ingrediente">{{ ingrediente.nombre }}
                </option>
              </select>
            </div>
            <!-- error message -->
            <div class="input-errors" v-for="(error, index) of v$.form.id_ingrediente.$errors" :key="index">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Cantidad -->
            <div class="mb-3">
              <label :for="'cantidad' + id_ingesta" class="form-label">Cantidad (gr)</label>
              <input type="number" class="form-control" :class="{ 'form-error': v$.form.id_ingrediente.$errors.length }"
                :id="'cantidad' + id_ingesta" v-model="v$.form.cantidad.$model" />
            </div>
            <!-- error message -->
            <div class="input-errors" v-for="(error, index) of v$.form.cantidad.$errors" :key="index">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </form>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-primary" @click="postIngrediente" :disabled="v$.form.$invalid"
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
// Componentes
import GraficoIngesta from "@/components/ingesta/grafico/GraficoIngesta.vue";
// Servicios
import ingestaIngredienteService from "@/services/ingestaIngrediente.service";
import grupo_alimentarioService from "@/services/grupo_alimentario.service";
import ingredienteService from "@/services/ingrediente.service";
// Tipos
import type Ingrediente from "@/types/Ingrediente";
import type IngestaIngrediente from "@/types/IngestaIngrediente";
import type GrupoAlimentario from "@/types/GrupoAlimentario";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Store
import { useMessageStore } from "@/stores/messages";
// Validators
import useVuelidate from '@vuelidate/core'
import { required, helpers, maxValue, minValue } from '@vuelidate/validators'

export default defineComponent({
  name: "AddIngrediente",
  data() {
    return {
      v$: useVuelidate(),
      form: {
        cantidad: 0,
        id_ingrediente: 0,
      },
      // cantidad: 0,
      ingredientes: [] as Ingrediente[],
      // id_ingrediente: 0,
      grupos: [] as GrupoAlimentario[]
    };
  },
  props: {
    id_ingesta: Number,
  },
  components: { GraficoIngesta },
  validations() {
    return {
      form: {
        cantidad: {
          required: helpers.withMessage("Indique una cantidad.", required),
          max: helpers.withMessage("Indique una cantidad menor de 20.000 gr.", maxValue(20000)),
          min: helpers.withMessage("Indique una cantidad mayor de 0 gr.", minValue(1))
        },
        id_ingrediente: {
          required: helpers.withMessage("Seleccione un ingrediente.", required),
        },
      }
    }
  },
  methods: {
    getIngredientes(): void {
      ingredienteService.getAll().then((ingredientes: Ingrediente[]) => {
        this.ingredientes = ingredientes;
      }).catch((err) => {
        const store = useMessageStore()
        if (err.response && err.response.status == 403) {
          store.message = "Necesitas estar logueado."
          return
        }
        store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
      });
    },
    postIngrediente(): void {
      if (!this.v$.$validate()) return
      if (this.v$.$error) return
      if (this.form.id_ingrediente == 0) return
      if (!this.form.id_ingrediente || !this.id_ingesta) return;
      const data: IngestaIngrediente = {
        id_ingrediente: this.form.id_ingrediente,
        id_ingesta: this.id_ingesta,
        cantidad: this.form.cantidad,
      };
      ingestaIngredienteService.post(data).then((response) => {
        if (response) {
          this.$emit("addIngrediente");
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
    getGrupos() {
      grupo_alimentarioService.getAll().then((grupos: GrupoAlimentario[]) => {
        if (grupos) {
          this.grupos = grupos
        }
      }).catch((err) => {
        const store = useMessageStore()
        if (err.response && err.response.status == 403) {
          store.message = "Necesitas estar logueado."
          return
        }
        store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
      })
    },
    getIngredientesGrupo(event: Event) {
      const id_grupo = Number((event.target as HTMLSelectElement).value)
      if (id_grupo != 0) {
        ingredienteService.getAll({ params: { id_grupo: id_grupo } }).then((ingredientes: Ingrediente[]) => {
          this.ingredientes = ingredientes;
        }).catch((err) => {
          const store = useMessageStore()
          if (err.response && err.response.status == 403) {
            store.message = "Necesitas estar logueado."
            return
          }
          store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
        })
      } else {
        this.getIngredientes()
      }
    }
  },
  beforeMount() {
    this.getIngredientes();
    this.getGrupos()
  },
  emits: ["addIngrediente"],
});
</script>
