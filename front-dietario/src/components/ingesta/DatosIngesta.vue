<template>
  <div class="float-end">
    <button v-if="ingestaProp" class="btn btn-primary btn-round" data-bs-toggle="modal"
      :data-bs-target="`#deleteIngesta-${ingestaProp.id_ingesta}`">
      <span class="material-symbols-outlined"> delete </span>
    </button>
  </div>
  <div class="container">
    <div class="row">
      <div class="col text-center">
        <div v-if="ingestaProp">
          <h3>{{ ingestaProp.energiaTotal.toFixed(0) }} Kcal</h3>
        </div>
        <div v-if="ingestaProp">
          {{ ingestaProp.lipidosTotal.toFixed(0) }}/{{ ingestaProp.hdcTotal.toFixed(0) }}/{{
            ingestaProp.proteinasTotal.toFixed(0)
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
            :ingestaIngrediente="ingrediente" @update-ingesta="$emit('updateIngesta')"
            @delete-ingrediente="getIngestaData"></DataIngrediente>
          <hr />
        </div>
      </div>
    </div>
    <div class="row text-center">
      <div class="col">
        <button v-if="ingestaProp" class="btn btn-primary btn-round" data-bs-toggle="modal"
          :data-bs-target="'#addIngesta' + ingestaProp.id_ingesta">
          <span class="material-symbols-outlined"> add </span>
        </button>
      </div>
      <AddIngrediente :id_ingesta="id_ingesta" @add-ingrediente="getaddIngrediente" />
      <DeleteIngesta v-if="ingestaProp" :key="`deleteIngesta${ingestaProp.id_ingesta}`"
        :id_ingesta="ingestaProp.id_ingesta" @delete-ingesta="$emit('deleteIngesta')"></DeleteIngesta>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DataIngrediente from "../ingredientes/DataIngrediente.vue";
import AddIngrediente from "../ingredientes/modal/AddIngrediente.vue";
import IngestaIngredienteService from "@/services/ingestaIngrediente.service";
import type IngestaIngrediente from "@/types/IngestaIngrediente";
import DeleteIngesta from "@/components/ingesta/modal/DeleteIngesta.vue";

export default defineComponent({
  name: "DatosIngesta",
  props: {
    id_ingesta: Number,
    ingestaProp: Object,
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
    ingestaProp() {
      this.getIngestaData();
    }
  },
  components: {
    DataIngrediente,
    AddIngrediente,
    DeleteIngesta,
  },
  methods: {
    getIngestaData() {
      if (!this.ingestaProp) return
      IngestaIngredienteService.getAll(Number(this.ingestaProp.id_ingesta)).then(
        (data: IngestaIngrediente[]) => {
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
    getaddIngrediente() {
      this.getIngestaData()
      this.$emit("updateIngesta")
    }
    // getDataIngredientes(macros: Macronutrientes) {
    //   // getDataIngredientes() {
    //   // this.totalKcal = 0;
    //   // this.totalFibra = 0;
    //   // this.totalLipidos = 0;
    //   // this.totalHdC = 0;
    //   // this.totalProteinas = 0;

    //   // IngestaIngredienteService.getAll(Number(this.id_ingesta)).then(
    //   //   (data: IngestaIngrediente[]) => {
    //   //     console.log(data)
    //   //     data.forEach((ingestaIngrediente: IngestaIngrediente) => {
    //   //       // console.log(ingestaIngrediente)
    //   //       macronutrientesService
    //   //         .getOne(ingestaIngrediente.id_ingrediente)
    //   //         .then((ingrediente: Macronutrientes) => {
    //   //           this.totalKcal +=
    //   //             (ingrediente.energia * ingestaIngrediente.cantidad) / 100;
    //   //           this.totalFibra +=
    //   //             (ingrediente.fibra * ingestaIngrediente.cantidad) / 100;
    //   //           this.totalLipidos +=
    //   //             (ingrediente.lipidos * ingestaIngrediente.cantidad) / 100;
    //   //           this.totalHdC +=
    //   //             (ingrediente.hdc * ingestaIngrediente.cantidad) / 100;
    //   //           this.totalProteinas +=
    //   //             (ingrediente.proteinas * ingestaIngrediente.cantidad) / 100;
    //   //           const macrosEmitir: Macronutrientes = {
    //   //             id_ingrediente: undefined,
    //   //             porcion_comestible: undefined,
    //   //             fibra: this.totalFibra,
    //   //             energia: this.totalKcal,
    //   //             lipidos: this.totalLipidos,
    //   //             hdc: this.totalHdC,
    //   //             proteinas: this.totalProteinas,
    //   //           };
    //   //           // console.log(this.totalKcal)
    //   //           this.$emit("emitKcal", macrosEmitir);
    //   //         });
    //   //     });
    //   //   }
    //   // );
    //   // Recuerda, estas macros que recibes no son las de la DB,
    //   // son las calculadas
    //   // console.log(macros.energia)
    //   this.totalKcal += macros.energia;
    //   this.totalLipidos += macros.lipidos;
    //   this.totalHdC += macros.hdc;
    //   this.totalProteinas += macros.proteinas;
    //   const macrosEmitir: Macronutrientes = {
    //     id_ingrediente: undefined,
    //     porcion_comestible: undefined,
    //     fibra: this.totalFibra,
    //     energia: this.totalKcal,
    //     lipidos: this.totalLipidos,
    //     hdc: this.totalHdC,
    //     proteinas: this.totalProteinas,
    //   };
    //   this.$emit("emitKcal", macrosEmitir);
    // },
  },
  emits: ["emitKcal", "deleteIngesta", "updateIngesta"],
  mounted() {
    this.getIngestaData();
  },
});
</script>
