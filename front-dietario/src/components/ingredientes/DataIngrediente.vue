<template>
  <!-- Data del ingrediente -->
  <div v-if="ingestaIngrediente" class="container" data-bs-toggle="modal"
    :data-bs-target="'#ingrediente' + ingestaIngrediente.id_ingrediente + '-' + ingestaIngrediente.id_ingesta">
    <!-- Primera Fila -->
    <div class="row">
      <div class="col" v-if="ingrediente">{{ ingrediente.nombre }}</div>
      <div class="col text-center" v-if="macros.energia">
        {{ macros.energia.toFixed(0) }} kcal
      </div>
    </div>
    <!-- Segunda fila -->
    <div class="row">
      <div class="col" v-if="ingestaIngrediente">{{ ingestaIngrediente.cantidad.toFixed(0) }} gr</div>
      <div class="col text-center" v-if="macros.lipidos">
        {{ macros.lipidos.toFixed(0) }}/{{ macros.hdc.toFixed(0) }}/{{
          macros.proteinas.toFixed(0)
        }}
      </div>
    </div>
  </div>
  <!-- Modal de edicion del ingrediente -->
  <EditIngrediente v-if="ingestaIngrediente"
    :key="`edit-ingrediente-${ingestaIngrediente.id_ingesta}-${ingestaIngrediente.id_ingrediente}`"
    :id_ingesta="ingestaIngrediente.id_ingesta" :id_ingrediente="ingestaIngrediente.id_ingrediente"
    :peso-ingrediente="ingestaIngrediente.cantidad" :ingestaIngrediente="ingestaIngrediente"
    @update-ingesta="$emit('updateIngesta')" @delete-ingrediente="$emit('updateIngesta')">
  </EditIngrediente>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// Componentes
import EditIngrediente from "@/components/ingredientes/modal/EditIngrediente.vue";
// Servicios
import IngredienteService from "@/services/ingrediente.service";
import MacronutrienteService from "@/services/macronutrientes.service";
// Tipos
import type Ingrediente from "@/types/Ingrediente";
import type Macronutrientes from "@/types/Macronutrientes";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Stores
import { useMessageStore } from "@/stores/messages";

export default defineComponent({
  name: "DatosIngesta",
  props: {
    ingestaIngrediente: Object,
  },
  data() {
    return {
      ingrediente: {} as Ingrediente,
      macros: {} as Macronutrientes,
    };
  },
  components: {
    EditIngrediente,
  },
  watch: {
    ingestaIngrediente() {
      this.getIngrediente()
    }
  },
  methods: {
    getIngrediente(): void {
      if (!this.ingestaIngrediente) return
      const cantidad = this.ingestaIngrediente.cantidad;
      IngredienteService.getOne(Number(this.ingestaIngrediente.id_ingrediente)).then(
        (ingrediente: Ingrediente) => {
          this.ingrediente = ingrediente;
          MacronutrienteService.getOne(ingrediente.id_ingrediente).then(
            (macros: Macronutrientes) => {
              if (cantidad) {
                // Modificamos las macros nuestras
                this.macros.energia = (macros.energia * cantidad) / 100;
                this.macros.lipidos = (macros.lipidos * cantidad) / 100;
                this.macros.hdc = (macros.hdc * cantidad) / 100;
                this.macros.proteinas = (macros.proteinas * cantidad) / 100;
              }
            }
          ).catch((err) => {
            const store = useMessageStore()
            if (err.response && err.response.status == 403) {
              store.message = "Necesitas estar logueado."
              return
            }
            store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
          });
        }
      ).catch((err) => {
        const store = useMessageStore()
        if (err.response && err.response.status == 403) {
          store.message = "Necesitas estar logueado."
          return
        }
        store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
      });
    },
    deleteIngrediente() {
      this.$emit('deleteIngrediente')
    }
  },
  emits: ["eventoIngrediente", "updateIngesta", "deleteIngrediente"],
  mounted() {
    this.getIngrediente()
  },
});
</script>
