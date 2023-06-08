<template>
  <div class="float-end">
    <button
      class="btn btn-primary btn-round"
      data-bs-toggle="modal"
      data-bs-target="#deleteIngesta"
    >
      <span class="material-symbols-outlined"> delete </span>
    </button>
  </div>
  <div class="container">
    <div class="row">
      <div class="col text-center">
        <div>
          <h3>{{ totalKcal.toFixed(0) }} Kcal</h3>
        </div>
        <div>
          {{ totalLipidos.toFixed(0) }}/{{ totalHdC.toFixed(0) }}/{{
            totalProteinas.toFixed(0)
          }}
        </div>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div v-for="ingrediente in ingesta">
          <DataIngrediente
            :key="`ingrediente-${ingrediente.id_ingesta}-${ingrediente.id_ingrediente}-${ingrediente.cantidad}`"
            :id_ingesta="ingrediente.id_ingesta"
            :id_ingrediente="ingrediente.id_ingrediente"
            :cantidad="ingrediente.cantidad"
            @evento-ingrediente="getDataIngredientes"
            @update-ingesta="getIngestaData"
            @delete-ingrediente="getIngestaData"
          ></DataIngrediente>
          <hr />
        </div>
      </div>
    </div>
    <div class="row text-center">
      <div class="col">
        <button
          class="btn btn-primary btn-round"
          data-bs-toggle="modal"
          :data-bs-target="'#addIngesta' + id_ingesta"
        >
          <span class="material-symbols-outlined"> add </span>
        </button>
      </div>
      <AddIngrediente
        :id_ingesta="id_ingesta"
        @update-ingesta="getIngestaData"
      />
      <!-- <DeleteIngesta
        :id_ingesta="id_ingesta"
        @delete-ingesta="$emit('deleteIngesta')"
      ></DeleteIngesta> -->
      <DeleteIngesta
        :id_ingesta="id_ingesta"
        @delete-ingesta="getIngestaData"
      ></DeleteIngesta>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DataIngrediente from "./ingredientes/DataIngrediente.vue";
import AddIngrediente from "../ingredientes/modal/AddIngrediente.vue";
import IngestaIngredienteService from "@/services/ingestaIngrediente.service";
import type IngestaIngrediente from "@/types/IngestaIngrediente";
import type Macronutrientes from "@/types/Macronutrientes";
import DeleteIngesta from "@/components/ingesta/modal/DeleteIngesta.vue";
import type Ingrediente from "@/types/Ingrediente";
import ingredienteService from "@/services/ingrediente.service";
import macronutrientesService from "@/services/macronutrientes.service";

export default defineComponent({
  name: "DatosIngesta",
  props: {
    id_ingesta: Number,
  },
  data() {
    return {
      ingesta: [] as IngestaIngrediente[],
      totalKcal: 0,
      totalLipidos: 0,
      totalHdC: 0,
      totalProteinas: 0,
      totalFibra: 0,
    };
  },
  watch: {
    id_ingesta() {
      this.getIngestaData();
    },
  },
  components: {
    DataIngrediente,
    AddIngrediente,
    DeleteIngesta,
  },
  methods: {
    getIngestaData() {
      IngestaIngredienteService.getAll(Number(this.id_ingesta)).then(
        (data: IngestaIngrediente[]) => {
          // console.log(data);
          if (!data) return;
          // this.totalKcal = 0;
          // this.totalLipidos = 0;
          // this.totalHdC = 0;
          // this.totalProteinas = 0;
          this.ingesta = data;
          // this.getDataIngredientes();
        }
      );
    },
    getDataIngredientes(macros: Macronutrientes) {
    // getDataIngredientes() {
      // this.totalKcal = 0;
      // this.totalFibra = 0;
      // this.totalLipidos = 0;
      // this.totalHdC = 0;
      // this.totalProteinas = 0;
      
      // IngestaIngredienteService.getAll(Number(this.id_ingesta)).then(
      //   (data: IngestaIngrediente[]) => {
      //     console.log(data)
      //     data.forEach((ingestaIngrediente: IngestaIngrediente) => {
      //       // console.log(ingestaIngrediente)
      //       macronutrientesService
      //         .getOne(ingestaIngrediente.id_ingrediente)
      //         .then((ingrediente: Macronutrientes) => {
      //           this.totalKcal +=
      //             (ingrediente.energia * ingestaIngrediente.cantidad) / 100;
      //           this.totalFibra +=
      //             (ingrediente.fibra * ingestaIngrediente.cantidad) / 100;
      //           this.totalLipidos +=
      //             (ingrediente.lipidos * ingestaIngrediente.cantidad) / 100;
      //           this.totalHdC +=
      //             (ingrediente.hdc * ingestaIngrediente.cantidad) / 100;
      //           this.totalProteinas +=
      //             (ingrediente.proteinas * ingestaIngrediente.cantidad) / 100;
      //           const macrosEmitir: Macronutrientes = {
      //             id_ingrediente: undefined,
      //             porcion_comestible: undefined,
      //             fibra: this.totalFibra,
      //             energia: this.totalKcal,
      //             lipidos: this.totalLipidos,
      //             hdc: this.totalHdC,
      //             proteinas: this.totalProteinas,
      //           };
      //           // console.log(this.totalKcal)
      //           this.$emit("emitKcal", macrosEmitir);
      //         });
      //     });
      //   }
      // );
      // Recuerda, estas macros que recibes no son las de la DB,
      // son las calculadas
      // console.log(macros.energia)
      this.totalKcal += macros.energia;
      this.totalLipidos += macros.lipidos;
      this.totalHdC += macros.hdc;
      this.totalProteinas += macros.proteinas;
      const macrosEmitir: Macronutrientes = {
        id_ingrediente: undefined,
        porcion_comestible: undefined,
        fibra: this.totalFibra,
        energia: this.totalKcal,
        lipidos: this.totalLipidos,
        hdc: this.totalHdC,
        proteinas: this.totalProteinas,
      };
      this.$emit("emitKcal", macrosEmitir);
    },
  },
  emits: ["emitKcal", "deleteIngesta"],
  mounted() {
    this.getIngestaData();
  },
});
</script>
