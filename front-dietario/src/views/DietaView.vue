<template>
  <div class="container p-0 m-0">
    <div class="row justify-content-md-center p-0 m-0">
      <!-- Header de la Dieta -->
      <div class="col-12 text-center p-0 m-0">
        <HeaderDieta :usuario="usuario" :fecha="fecha"></HeaderDieta>
      </div>
    </div>
    <!-- Boton de borrar la dieta -->
    <div class="float-end my-3" style="z-index: 2000;">
      <button class="btn btn-primary btn-round" data-bs-toggle="modal" data-bs-target="#deleteDieta">
        <span class="material-symbols-outlined"> delete </span>
      </button>
    </div>
    <div class="row my-3 justify-content-md-center p-0 m-0">
      <div class="col-md-12 col-lg-10 text-start p-0 m-0">
        <h5>Objetivo del día</h5>
      </div>
    </div>
    <div class="row my-3 justify-content-md-center p-0 m-0">
      <!-- Data de la dieta -->
      <div class="col-6 text-end gx-2">
        <h3 contenteditable="true" @focusout="updateDieta" v-if="objetivoKcal">
          {{ objetivoKcal.toFixed(0) }}
        </h3>
      </div>
      <div class="col-6 text-start gx-0">
        <h3>- {{ realKcal.toFixed(0) }} = {{ diffKcall.toFixed(0) }}</h3>
      </div>
    </div>
    <div class="row justify-content-md-center p-0 m-0">
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
    <div class="row my-3 justify-content-md-center p-0 m-0">
      <div class="col-md-12 col-lg-6">
        <div class="accordion accordion-flush" id="ingestas">
          <!-- Elementos del acordeon -->
          <div class="accordion-item" v-for="ingesta in ingestas">
            <IngestaAccordeon :ingesta="ingesta" :key="`ingesta-${ingesta.id_ingesta}`" @update-ingesta="getData">
            </IngestaAccordeon>
          </div>
        </div>
      </div>
      <!-- Boton de añadir ingesta -->
      <div class="row my-3 justify-content-md-center">
        <div class="col-md-12 col-lg-5 text-center">
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addIngesta">
            Añadir Ingesta
          </button>
        </div>

        <!-- Modales -->
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
import GraficoIngesta from "@/components/ingesta/grafico/GraficoIngesta.vue";
// Servicios
import ClienteService from "@/services/cliente.service";
import IngestaService from "@/services/ingesta.service";
import dietaService from "@/services/dieta.service";
// Tipos
import type Dieta from "@/types/Dieta";
import type Cliente from "@/types/Cliente";
import type Ingesta from "@/types/Ingesta";
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
      if (!this.$route.params.id_dieta) return
      this.getData();
    },

  },
  methods: {
    getData() {
      dietaService.getOne(
        Number(this.$route.params.id_cliente),
        Number(this.$route.params.id_dieta)
      ).then((dieta: Dieta) => {
        if (!dieta) return;
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
          this.ingestas = ingestas;
        }
      );
    },
    deleteDieta() {
      dietaService
        .delete(
          Number(this.$route.params.id_dieta),
          Number(this.$route.params.id_cliente)
        )
        .then((response: any) => {
          if (response) {
            // Volvemos al usuario
            this.$router.push({
              name: "cliente",
              params: { id_cliente: this.$route.params.id_cliente },
            });
          }
        });
    },
    updateDieta(e: Event) {

      if (!e.target) return;
      if (!Number((e.target as HTMLDataElement).innerText)) return;

      const objetivo = Number((e.target as HTMLDataElement).innerText);
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
      dietaService.update(idDieta, data).then((response: any) => {
        if (response) {
          this.getData()
        }
      });
    },
  },
  mounted() {
    this.getData();
  },
});
</script>
