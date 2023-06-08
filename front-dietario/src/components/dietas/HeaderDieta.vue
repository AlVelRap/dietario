<template>
  <div class="container bg-primary-container border border-dark m-0">
    {{ usuario }}
  </div>
  <div
    class="container bg-primary-container border border-top-0 border-dark m-0"
  >
    <div class="row">
      <div class="col">
        <router-link
          v-if="idPrevDieta > -1"
          :to="{
            path:
              '/cliente/' + $route.params.id_cliente + '/dieta/' + idPrevDieta,
          }"
        >
          <span type="button" class="material-symbols-outlined float-start">
            chevron_left
          </span>
        </router-link>
      </div>
      <div class="col">
        {{ fecha }}
      </div>
      <div class="col">
        <router-link
          v-if="idNextDieta > -1"
          :to="{
            path:
              '/cliente/' + $route.params.id_cliente + '/dieta/' + idNextDieta,
          }"
        >
          <span class="material-symbols-outlined float-end">
            chevron_right
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import dietaService from "@/services/dieta.service";
import type Dieta from "@/types/Dieta";
import { defineComponent } from "vue";
import { ref } from "vue";
// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'
const date = ref(new Date());
const format = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default defineComponent({
  name: "HeaderDieta",
  data() {
    return {
      date: new Date(),
      idNextDieta: -1,
      idPrevDieta: -1,
    };
  },
  props: {
    usuario: String,
    fecha: String,
  },
  watch: {
    $route() {
      this.getDietas();
    },
  },
  methods: {
    getDietas() {
      dietaService
        .getAll(Number(this.$route.params.id_cliente))
        .then((dietas: Dieta[]) => {
          dietas.forEach((dieta, index) => {
            if (dieta.id_dieta == Number(this.$route.params.id_dieta)) {
              this.idNextDieta = index > 0 ? dietas[index - 1].id_dieta : -1;
              this.idPrevDieta =
                index < dietas.length - 1 ? dietas[index + 1].id_dieta : -1;
            }
          });
        });
    },
  },
  mounted() {
    // this.date = this.fecha;
    this.getDietas();
  },
});
</script>
