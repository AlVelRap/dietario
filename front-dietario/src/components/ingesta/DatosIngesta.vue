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
          this.ingesta = data;
        }
      );
    },
    getaddIngrediente() {
      this.getIngestaData()
      this.$emit("updateIngesta")
    }
  },
  emits: ["emitKcal", "deleteIngesta", "updateIngesta"],
  mounted() {
    this.getIngestaData();
  },
});
</script>
