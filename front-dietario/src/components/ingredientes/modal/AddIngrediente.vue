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
            <div class="mb-3">
              <label :for="`select-grupo-${id_ingesta}`" class="form-label">Grupo Alimentario</label>
              <select :id="`select-grupo-${id_ingesta}`" class="form-select" aria-label="Select de grupo Alimentario"
                @change="getIngredientesGrupo">
                <option value="0">Seleccione un grupo</option>
                <option v-for="grupo in grupos" :value="grupo.id_grupo">{{ grupo.nombre_grupo }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label :for="`select-ingrediente-${id_ingesta}`" class="form-label">Grupo Alimentario</label>
              <select :id="`select-ingrediente-${id_ingesta}`" class="form-select"
                aria-label="Select de grupo ingrediente" v-model="id_ingrediente">
                <option value="0">Seleccione un ingrediente</option>
                <option v-for="ingrediente in ingredientes" :value="ingrediente.id_ingrediente">{{ ingrediente.nombre }}
                </option>
              </select>
            </div>
            <!-- <div class="mb-3">
              <label :for="'input-ingrediente-' + id_ingesta" class="form-label">Ingrediente</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" :id="'input-ingrediente-' + id_ingesta"
                  :aria-describedby="'search-ingrediente' + id_ingesta" aria-label="Buscar Ingrediente"
                  :list="'data-ingredientes' + id_ingesta" v-model="id_ingrediente" />
                <span class="input-group-text material-symbols-outlined"
                  :id="'search-ingrediente' + id_ingesta">search</span>
                <datalist :id="'data-ingredientes' + id_ingesta">
                  <option v-for="ingrediente in ingredientes" :value="ingrediente.id_ingrediente">
                    {{ ingrediente.nombre }}
                  </option>
                </datalist>
              </div>
            </div> -->
            <div class="mb-3">
              <label :for="'cantidad' + id_ingesta" class="form-label">Cantidad</label>
              <input type="number" class="form-control" :id="'cantidad' + id_ingesta" v-model="cantidad" />
              gr
            </div>
          </form>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-primary" @click="postIngrediente" data-bs-dismiss="modal">
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
import GraficoIngesta from "@/components/ingesta/grafico/GraficoIngesta.vue";
import IngredienteService from "@/services/ingrediente.service";
import type Ingrediente from "@/types/Ingrediente";
import ingestaIngredienteService from "@/services/ingestaIngrediente.service";
import type IngestaIngrediente from "@/types/IngestaIngrediente";
import type GrupoAlimentario from "@/types/GrupoAlimentario";
import grupo_alimentarioService from "@/services/grupo_alimentario.service";
import ingredienteService from "@/services/ingrediente.service";

export default defineComponent({
  name: "AddIngrediente",
  data() {
    return {
      cantidad: 0,
      ingredientes: [] as Ingrediente[],
      id_ingrediente: 0,
      grupos: [] as GrupoAlimentario[]
    };
  },
  props: {
    id_ingesta: Number,
  },
  components: { GraficoIngesta },
  watch: {},
  methods: {
    getIngredientes(): void {
      IngredienteService.getAll().then((ingredientes: Ingrediente[]) => {
        this.ingredientes = ingredientes;
      });
    },
    postIngrediente(): void {
      if (this.id_ingrediente == 0) return
      if (!this.id_ingrediente || !this.id_ingesta) return;
      const data: IngestaIngrediente = {
        id_ingrediente: this.id_ingrediente,
        id_ingesta: this.id_ingesta,
        cantidad: this.cantidad,
      };
      console.log(data)
      ingestaIngredienteService.post(data).then((response) => {
        console.log(response)
        if (response) {
          this.$emit("addIngrediente");
        }
      });
    },
    getGrupos() {
      grupo_alimentarioService.getAll().then((grupos: GrupoAlimentario[]) => {
        if (grupos) {
          this.grupos = grupos
        }
      })
    },
    getIngredientesGrupo(event: Event) {
      const id_grupo = event.target.value
      console.log(id_grupo)
      if (id_grupo != 0) {
        ingredienteService.getAll({ params: { id_grupo: id_grupo } }).then((ingredientes: Ingrediente[]) => {
          this.ingredientes = ingredientes;
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
