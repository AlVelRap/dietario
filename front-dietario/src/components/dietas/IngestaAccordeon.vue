<template>
  <h2 class="accordion-header" :id="'headingIngesta'+ ingesta.id_ingesta" v-if="ingesta">
    <button
      class="accordion-button"
      type="button"
      data-bs-toggle="collapse"
      :data-bs-target="'#collapse' + ingesta.id_ingesta"
      aria-expanded="false"
      :aria-controls="'collapse' + ingesta.id_ingesta"
    >
      <div class="container">
        <div class="row justify-content-start">
          <div class="col-5">
            <h6>{{ ingesta.nombre }}</h6>
          </div>
          <div class="col-5 text-center" v-if="totalKcal">
            <h6>{{ totalKcal.toFixed(0) }} Kcal</h6>
          </div>
        </div>
      </div>
    </button>
  </h2>
  <div
    v-if="ingesta"
    :id="'collapse' + ingesta.id_ingesta"
    class="accordion-collapse collapse"
    :aria-labelledby="'#headingIngesta'+ ingesta.id_ingesta"
    data-bs-parent="#ingestas"
  >
    <div class="accordion-body">
      <DatosIngesta
        :key="`ingesta-${ingesta.id_ingesta}`"
        :id_ingesta="ingesta.id_ingesta"
        @emit-kcal="getKcal"
        @delete-ingesta="$router.go"
      ></DatosIngesta>
      
    </div>
  </div>
</template>

<script lang="ts">
import DatosIngesta from "./DatosIngesta.vue";

import type Macronutrientes from "@/types/Macronutrientes";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IngestaAccordeon",
  props: {
    ingesta: Object,
  },
  data() {
    return {
      totalKcal: 0,
    };
  },
  watch:{
    ingesta(){
      this.totalKcal=0
    }
  },
  components: {
    DatosIngesta,
  },
  methods: {
    getKcal(macros: Macronutrientes) {
      this.totalKcal = macros.energia;
      this.$emit("emitDatosIngesta", macros);
    },
  },
  emits: ["emitDatosIngesta"],
});
</script>
