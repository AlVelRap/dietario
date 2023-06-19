<template>
  <div class="container-fluid bg-primary-container border border-dark p-0 m-0">
    {{ usuario }}
  </div>
  <div class="container-fluid bg-primary-container border border-top-0 border-dark p-0 m-0">
    <div class="row p-0 m-0">
      <div class="col p-0 m-0">
        <router-link v-if="idPrevDieta > -1" :to="{
          path:
            '/cliente/' + $route.params.id_cliente + '/dieta/' + idPrevDieta,
        }">
          <span type="button" class="material-symbols-outlined float-start">
            chevron_left
          </span>
        </router-link>
      </div>
      <div class="col p-0 m-0">
        {{ fecha }}
      </div>
      <div class="col p-0 m-0">
        <router-link v-if="idNextDieta > -1" :to="{
          path:
            '/cliente/' + $route.params.id_cliente + '/dieta/' + idNextDieta,
        }">
          <span class="material-symbols-outlined float-end">
            chevron_right
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// Servicios
import dietaService from "@/services/dieta.service";
// Tipos
import type Dieta from "@/types/Dieta";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Store
import { useMessageStore } from "@/stores/messages";

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
              this.idNextDieta = index > 0 ? Number(dietas[index - 1].id_dieta) : -1;
              this.idPrevDieta = index < dietas.length - 1 ? Number(dietas[index + 1].id_dieta) : -1;
            }
          });
        }).catch((err) => {
          const store = useMessageStore()
          if (err.response && err.response.status == 403) {
            store.message = "Necesitas estar logueado."
            return
          }
          store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
        });
    },
  },
  mounted() {
    this.getDietas();
  },
});
</script>
