<template>
  <!-- Encabezado del accordeon -->
  <h2 class="accordion-header" :id="'headingIngesta' + ingesta.id_ingesta" v-if="ingesta">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
      :data-bs-target="'#collapse' + ingesta.id_ingesta" aria-expanded="false"
      :aria-controls="'collapse' + ingesta.id_ingesta">
      <div class="container">
        <div class="row justify-content-start">
          <div class="col-5">
            <h6>{{ ingesta.nombre }}</h6>
          </div>
          <div class="col-5 text-center" v-if="ingesta.energiaTotal">
            <h6>{{ ingesta.energiaTotal.toFixed(0) }} Kcal</h6>
          </div>
        </div>
      </div>
    </button>
  </h2>
  <!-- Interior del acordeon -->
  <div v-if="ingesta" :id="`collapse${ingesta.id_ingesta}`" class="accordion-collapse collapse"
    :aria-labelledby="'#headingIngesta' + ingesta.id_ingesta" data-bs-parent="#ingestas">
    <div class="accordion-body">
      <DatosIngesta :key="`ingesta-${ingesta.id_ingesta}`" :id_ingesta="ingesta.id_ingesta" :ingestaProp="ingesta"
        @emit-kcal="getKcal" @update-ingesta="$emit('updateIngesta')" @delete-ingesta="$emit('updateIngesta')">
      </DatosIngesta>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// Componentes
import DatosIngesta from "./DatosIngesta.vue";
// Servicios
import type Macronutrientes from "@/types/Macronutrientes";

export default defineComponent({
  name: "IngestaAccordeon",
  props: {
    ingesta: Object,
  },
  components: {
    DatosIngesta,
  },
  methods: {
    getKcal(macros: Macronutrientes) {
      this.$emit("emitDatosIngesta", macros);
    },
  },
  emits: ["emitDatosIngesta", "updateIngesta"],
});
</script>
