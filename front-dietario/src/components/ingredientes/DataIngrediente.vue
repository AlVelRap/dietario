<template>
  <div v-if="ingestaIngrediente" class="container" data-bs-toggle="modal"
  :data-bs-target="'#ingrediente' + ingestaIngrediente.id_ingrediente + '-' + ingestaIngrediente.id_ingesta">
  <div class="row">
    <div class="col" v-if="ingrediente">{{ ingrediente.nombre }}</div>
      <div class="col text-center" v-if="macros.energia">
        {{ macros.energia.toFixed(0) }} kcal
      </div>
    </div>
    <div class="row">
      <div class="col" v-if="ingestaIngrediente">{{ ingestaIngrediente.cantidad.toFixed(0) }} gr</div>
      <div class="col text-center" v-if="macros.lipidos">
        {{ macros.lipidos.toFixed(0) }}/{{ macros.hdc.toFixed(0) }}/{{
          macros.proteinas.toFixed(0)
        }}
      </div>
    </div>
  </div>
  <EditIngrediente v-if="ingestaIngrediente"
    :key="`edit-ingrediente-${ingestaIngrediente.id_ingesta}-${ingestaIngrediente.id_ingrediente}`"
    :id_ingesta="ingestaIngrediente.id_ingesta" :id_ingrediente="ingestaIngrediente.id_ingrediente"
    :peso-ingrediente="ingestaIngrediente.cantidad" :ingestaIngrediente="ingestaIngrediente" @update-ingesta="updateIngesta"
    @delete-ingrediente="$emit('updateIngesta')">
  </EditIngrediente>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import EditIngrediente from "@/components/ingredientes/modal/EditIngrediente.vue";
import IngredienteService from "@/services/ingrediente.service";
import type Ingrediente from "@/types/Ingrediente";
import MacronutrienteService from "@/services/macronutrientes.service";
import type Macronutrientes from "@/types/Macronutrientes";

export default defineComponent({
  name: "DatosIngesta",
  props: {
    ingestaIngrediente: Object,
  },
  data() {
    return {
      ingrediente: {} as Ingrediente,
      macros: {} as Macronutrientes,
      // cantidadVigilada: 0,
    };
  },
  components: {
    EditIngrediente,
  },
  watch: {
    // cantidadVigilada: function (newCantidad, oldCantidad) {
    //   this.getIngrediente(oldCantidad, newCantidad);
    // },
    ingestaIngrediente(){
      this.getIngrediente()
    }
  },
  methods: {
    getIngrediente(): void {
      // inicializamos las variables
      // const vieja = oldCantidad ? oldCantidad : 0;
      // const nueva = newCantidad ? newCantidad : this.cantidadVigilada;
      if (!this.ingestaIngrediente) return
      const cantidad = this.ingestaIngrediente.cantidad;
      IngredienteService.getOne(Number(this.ingestaIngrediente.id_ingrediente)).then(
        (ingrediente: Ingrediente) => {
          this.ingrediente = ingrediente;
          MacronutrienteService.getOne(ingrediente.id_ingrediente).then(
            (macros: Macronutrientes) => {
              if (cantidad) {
                // Creamos el objeto con las macros a emitir
                // const macrosEmitir: Macronutrientes = {
                //   id_ingrediente: macros.id_ingrediente,
                //   porcion_comestible: macros.porcion_comestible,
                //   fibra: macros.fibra,
                //   energia: (macros.energia * cantidad) / 100,
                //   lipidos: (macros.lipidos * cantidad) / 100,
                //   hdc: (macros.hdc * cantidad) / 100,
                //   proteinas: (macros.proteinas * cantidad) / 100,
                // };
                // Modificamos las macros nuestras
                this.macros.energia = (macros.energia * cantidad) / 100;
                this.macros.lipidos = (macros.lipidos * cantidad) / 100;
                this.macros.hdc = (macros.hdc * cantidad) / 100;
                this.macros.proteinas = (macros.proteinas * cantidad) / 100;
                // Emitimos las macros actuales
                // console.log(macrosEmitir.energia)
                // this.emitirMacros(macrosEmitir);
                // this.emitirMacros(this.macros);
              }
            }
          );
        }
      );
    },
    // emitirMacros(macros: Macronutrientes) {
    //   this.$emit("eventoIngrediente", macros);
    // },
    updateIngesta(cantidad: number) {
      // this.cantidadVigilada = cantidad;
      this.$emit("updateIngesta");
    },
    deleteIngrediente(cantidad: number) {
      // this.getIngrediente(0, -cantidad)
      this.$emit('deleteIngrediente')
      // this.cantidadVigilada=-cantidad
    }
  },
  emits: ["eventoIngrediente", "updateIngesta", "deleteIngrediente"],
  mounted() {
    this.getIngrediente()
    // if (this.ingestaIngrediente) this.cantidadVigilada = this.ingestaIngrediente.cantidad;
    // this.getIngrediente();
  },
});
</script>
