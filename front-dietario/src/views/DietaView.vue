<template>
  <div class="container m-0">
    <div class="row justify-content-md-center">
      <div class="col-12 text-center">
        <HeaderDieta :usuario="usuario" :fecha="fecha"></HeaderDieta>
      </div>
    </div>
    <div class="float-end my-3">
      <button class="btn btn-primary btn-round" data-bs-toggle="modal" data-bs-target="#deleteDieta">
        <span class="material-symbols-outlined"> delete </span>
      </button>
    </div>
    <div class="row my-3 justify-content-md-center">
      <div class="col-md-12 col-lg-10 text-start offset-lg-4">
        <h5>Objetivo del día</h5>
      </div>
    </div>
    <div class="row my-3 justify-content-md-center">
      <div class="col-6 text-end gx-2">
        <h3 contenteditable="true" @focusout="updateDieta" v-if="objetivoKcal">
          {{ objetivoKcal.toFixed(0) }}
        </h3>
      </div>
      <div class="col-6 text-start gx-0">
        <h3>- {{ realKcal.toFixed(0) }} = {{ diffKcall.toFixed(0) }}</h3>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-md-12 col-lg-10">
        <div class="container">
          <div class="row text-center justify-content-md-center">
            <div class="col-4 col-md-3 col-lg-2">
              Grasas
              <GraficoIngesta id_grafico="graficoLipidos" :chartData="dataLip"></GraficoIngesta>
            </div>
            <div class="col-4 col-md-3 col-lg-2">
              HdC
              <GraficoIngesta id_grafico="graficoHdc" :chartData="dataHdc"></GraficoIngesta>
            </div>
            <div class="col-4 col-md-3 col-lg-2">
              Proteínas
              <GraficoIngesta id_grafico="graficoProteinas" :chartData="dataProte"></GraficoIngesta>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-3 justify-content-md-center">
      <div class="col-md-12 col-lg-6">
        <div class="accordion accordion-flush" id="ingestas">
          <div class="accordion-item" v-for="ingesta in ingestas">
            <IngestaAccordeon :ingesta="ingesta" :key="`ingesta-${ingesta.id_ingesta}`"
              @update-ingesta="getData">
            </IngestaAccordeon>
          </div>
        </div>
      </div>
      <div class="row my-3 justify-content-md-center">
        <div class="col-md-12 col-lg-5 text-center">
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addIngesta">
            Añadir Ingesta
          </button>
        </div>

        <!-- ver como referescar los componentes esta es una muy mala aprximacion -->
        <!-- <AddIngesta @update-ingesta="$router.go" /> -->
        <AddIngesta @update-ingesta="getData" />
        <DeleteDieta />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// Componentes
import HeaderDieta from "@/components/dietas/HeaderDieta.vue";
import IngestaAccordeon from "@/components/ingesta/IngestaAccordeon.vue";
import AddIngesta from "@/components/ingesta/modal/AddIngesta.vue";
import DeleteDieta from "@/components/dietas/modal/DeleteDieta.vue";
// Servicios
import DietaService from "@/services/dieta.service";
import ClienteService from "@/services/cliente.service";
import IngestaService from "@/services/ingesta.service";
import GraficoIngesta from "@/components/ingesta/grafico/GraficoIngesta.vue";
import dietaService from "@/services/dieta.service";
// Tipos
import type Dieta from "@/types/Dieta";
import type Cliente from "@/types/Cliente";
import type Ingesta from "@/types/Ingesta";
import type Macronutrientes from "@/types/Macronutrientes";
import type ResponseData from "@/types/ResponseData";
// Constantes
import {
  ENERGIA_LIPIDO,
  ENERGIA_HDC,
  ENERGIA_PROTEINA,
} from "@/util/constants";

export default defineComponent({
  name: "DietaView",

  data() {
    return {
      usuario: "",
      fecha: "",
      objetivoKcal: 0,
      realKcal: 0,
      diffKcall: 0,
      ingestas: [] as Ingesta[],
      totalLipidos: 0,
      totalHdC: 0,
      totalProteinas: 0,
      dataLip: {
        datasets: [
          {
            label: "% Grasa",
            backgroundColor: ["#F6ED01", "#D9D9D9"],
            data: [0, 100],
          },
        ],
      },
      dataHdc: {
        datasets: [
          {
            label: "% HdC",
            backgroundColor: ["#44B81B", "#D9D9D9"],
            data: [0, 100],
          },
        ],
      },
      dataProte: {
        datasets: [
          {
            label: "% Proteinas",
            backgroundColor: ["#B81B1B", "#D9D9D9"],
            data: [0, 100],
          },
        ],
      },
    };
  },
  components: {
    HeaderDieta,
    IngestaAccordeon,
    GraficoIngesta,
    AddIngesta,
    DeleteDieta,
  },
  watch: {
    $route() {
      if(!this.$route.params.id_dieta) return
      this.getData();
    },

  },
  methods: {
    getData() {
      DietaService.getOne(
        Number(this.$route.params.id_cliente),
        Number(this.$route.params.id_dieta)
      ).then((dieta: Dieta) => {
        if (!dieta) return;
        // console.log(dieta)
        const fechaString = new Date(dieta.fecha_dieta);
        this.fecha = fechaString.toLocaleDateString("es-ES");
        this.objetivoKcal = dieta.objetivo;
        this.realKcal = dieta.energiaTotal ? dieta.energiaTotal : 0
        this.diffKcall = this.objetivoKcal - this.realKcal
        this.totalLipidos = dieta.lipidosTotal ? dieta.lipidosTotal : 0
        this.totalHdC = dieta.hdcTotal ? dieta.hdcTotal : 0
        this.totalProteinas = dieta.proteinasTotal ? dieta.proteinasTotal : 0
        this.dataLip = {
          datasets: [
            {
              label: "% Grasa",
              backgroundColor: ["#F6ED01", "#D9D9D9"],
              data: [
                ((this.totalLipidos * ENERGIA_LIPIDO) / this.realKcal) * 100,
                (1 - (this.totalLipidos * ENERGIA_LIPIDO) / this.realKcal) * 100,
              ],
            },
          ],
        };
        this.dataHdc = {
          datasets: [
            {
              label: "% HdC",
              backgroundColor: ["#44B81B", "#D9D9D9"],
              data: [
                ((this.totalHdC * ENERGIA_HDC) / this.realKcal) * 100,
                (1 - (this.totalHdC * ENERGIA_HDC) / this.realKcal) * 100,
              ],
            },
          ],
        };
        this.dataProte = {
          datasets: [
            {
              label: "% Proteinas",
              backgroundColor: ["#B81B1B", "#D9D9D9"],
              data: [
                ((this.totalProteinas * ENERGIA_PROTEINA) / this.realKcal) * 100,
                (1 - (this.totalProteinas * ENERGIA_PROTEINA) / this.realKcal) *
                100,
              ],
            },
          ],
        };
        ClienteService.getOne(dieta.id_cliente).then((cliente: Cliente) => {
          this.usuario = cliente.nombre;
        });
      });

      IngestaService.getAll(Number(this.$route.params.id_dieta)).then(
        (ingestas: Ingesta[]) => {
          console.log(ingestas)
          this.ingestas = ingestas;
        }
      );
    },
    // getDatosIngestas(macros: Macronutrientes) {
    //   this.realKcal += macros.energia;
    //   this.diffKcall = this.objetivoKcal - this.realKcal;
    //   this.totalLipidos += macros.lipidos;
    //   this.dataLip = {
    //     datasets: [
    //       {
    //         label: "% Grasa",
    //         backgroundColor: ["#F6ED01", "#D9D9D9"],
    //         data: [
    //           ((this.totalLipidos * ENERGIA_LIPIDO) / this.realKcal) * 100,
    //           (1 - (this.totalLipidos * ENERGIA_LIPIDO) / this.realKcal) * 100,
    //         ],
    //       },
    //     ],
    //   };
    //   this.totalHdC += macros.hdc;
    //   this.dataHdc = {
    //     datasets: [
    //       {
    //         label: "% HdC",
    //         backgroundColor: ["#44B81B", "#D9D9D9"],
    //         data: [
    //           ((this.totalHdC * ENERGIA_HDC) / this.realKcal) * 100,
    //           (1 - (this.totalHdC * ENERGIA_HDC) / this.realKcal) * 100,
    //         ],
    //       },
    //     ],
    //   };
    //   this.totalProteinas += macros.proteinas;
    //   this.dataProte = {
    //     datasets: [
    //       {
    //         label: "% Proteinas",
    //         backgroundColor: ["#B81B1B", "#D9D9D9"],
    //         data: [
    //           ((this.totalProteinas * ENERGIA_PROTEINA) / this.realKcal) * 100,
    //           (1 - (this.totalProteinas * ENERGIA_PROTEINA) / this.realKcal) *
    //           100,
    //         ],
    //       },
    //     ],
    //   };
    // },
    deleteDieta() {
      dietaService
        .delete(
          Number(this.$route.params.id_dieta),
          Number(this.$route.params.id_cliente)
        )
        .then((response: ResponseData) => {
          if (response) {
            // Volvemos al usuario
            this.$router.push({
              name: "cliente",
              params: { id_cliente: this.$route.params.id_cliente },
            });
          }
          // Emitir evento para que se recargue todo
          // Como ya somos el padre no tenemos que emitir nada, redireccionamos cliente
        });
    },
    updateDieta(e: Event) {
      if (!e.target) return;
      if (!Number(e.target.innerText)) return;

      const objetivo = Number(e.target.innerText);
      const idDieta = Number(this.$route.params.id_dieta);
      const idCliente = Number(this.$route.params.id_cliente);

      const fecha_dieta: Date = new Date(this.fecha);
      const year = fecha_dieta.getFullYear();
      const month = ("0" + (fecha_dieta.getMonth() + 1)).slice(-2);
      const day = ("0" + fecha_dieta.getDate()).slice(-2);
      const cadenaFecha = `${year}-${month}-${day}`;

      const data: Dieta = {
        id_dieta: idDieta,
        id_cliente: idCliente,
        fecha_dieta: cadenaFecha,
        objetivo: objetivo,
      };
      dietaService.update(idDieta, data).then((response: ResponseData) => {
        // console.log(response)
        if (response) {
          // Ver para actualizar los componentes
        }
      });
    },
  },
  // emits: ["deleteDieta"],
  mounted() {
    this.getData();
  },
});
</script>
