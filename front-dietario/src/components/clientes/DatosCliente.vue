<template>
  <div class="container-fluid m-0 p-0 my-4">
    <!-- boton de borrar Cliente -->
    <div class="float-end mt-3 me-3">
      <button class="btn btn-primary btn-round" data-bs-toggle="modal" data-bs-target="#deleteCliente">
        <span class="material-symbols-outlined"> delete </span>
      </button>
    </div>
    <div class="row">
      <!-- Imagen del Cliente -->
      <div class="col text-center">
        <img v-if="dataCliente" alt="imagen del usuario" :src="dataCliente.imagen" class="" style="width: 100px"
          data-bs-toggle="modal" data-bs-target="#editCliente" />
      </div>
    </div>
    <div class="row my-3 justify-content-center p-0 m-0">
      <!-- Nombre y apellidos del Cliente -->
      <div class="col text-center">
        <h1 v-if="dataCliente" data-bs-toggle="modal" data-bs-target="#editCliente">
          {{ dataCliente.nombre }} {{ dataCliente.apellidos }}
        </h1>
      </div>
    </div>
    <div class="row my-3 p-0 m-0">
      <!-- Edad del cliente -->
      <div class="col text-center" data-bs-toggle="modal" data-bs-target="#editCliente">
        <h4>{{ edad }} Años</h4>
      </div>
    </div>
  </div>

  <div class="row text-center justify-content-center my-3 p-0 m-0">
    <!-- Ultimo peso del cliente -->
    <div class="col-md-2 col-sm-4" v-if="ultimoPeso">
      <h5>{{ ultimoPeso.peso }} kg</h5>
      <p>{{ fechaUltPeso }}</p>
    </div>
    <div class="col-md-2 col-sm-4" v-else>
      <h5>añada un peso</h5>
    </div>
    <div class="col-md-1 ">
      <button class="btn btn-primary btn-round" data-bs-toggle="modal" data-bs-target="#addPeso">
        <span class="material-symbols-outlined"> add </span>
      </button>
    </div>
    <!-- Modal de añadir peso al cliente -->
    <AddPeso @update-peso="$router.go"></AddPeso>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="container my-3">
          <!-- Seccion del peso -->
          <div class="my-3">
            <h3>Peso</h3>
          </div>
          <div class="row justify-content-center">
            <div class="col-12">
              <GraficoPeso id_grafico="graficoPeso" :data-peso="dataGrafico"></GraficoPeso>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="container my-3">
          <!-- Seccion de las dietas -->
          <div>
            <h3>Dietas</h3>
            <!-- <button>Filtrar</button> -->
          </div>
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="container">
                <hr />
                <div class="row justify-content-between" v-for="dieta in dietasCliente">
                  <router-link :to="{
                    path:
                      '/cliente/' +
                      $route.params.id_cliente +
                      '/dieta/' +
                      dieta.id_dieta,
                  }" style="text-decoration: none; color: black">
                    <div class="col text-center">
                      <h5>
                        {{ formatFecha(dieta.fecha_dieta.toString()) }}
                      </h5>
                      <hr />
                    </div>
                  </router-link>
                </div>
                <div class="row">
                  <div class="col text-center">
                    <button class="btn btn-primary btn-round" data-bs-toggle="modal" data-bs-target="#addDieta">
                      <span class="material-symbols-outlined"> add </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Los modales -->
          <AddDieta @update-dieta="getDietas"></AddDieta>
          <EditCliente :cliente="dataCliente" @update-cliente="getClientes"></EditCliente>
          <DeleteCliente></DeleteCliente>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// Componentes
import GraficoPeso from "../peso/grafico/GraficoPeso.vue";
import AddPeso from "../peso/modal/AddPeso.vue";
import AddDieta from "../dietas/modal/AddDieta.vue";
import EditCliente from "./modal/EditCliente.vue";
import DeleteCliente from "./modal/DeleteCliente.vue";
// Servicios
import ClienteService from "@/services/cliente.service";
import DietaService from "@/services/dieta.service";
import PesoService from "@/services/peso.service";
// Tipos
import type Cliente from "@/types/Cliente";
import type Peso from "@/types/Peso";
import type Dieta from "@/types/Dieta";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Store
import { useMessageStore } from "@/stores/messages";

export default defineComponent({
  name: "ListaClientes",
  data() {
    return {
      edad: 0,
      dataCliente: {} as Cliente,
      pesosCliente: [] as Peso[],
      dietasCliente: [] as Dieta[],
      ultimoPeso: {} as Peso | null,
      fechaUltPeso: "",
      dataGrafico: {
        labels: [""],
        datasets: [
          {
            data: [0],
            borderWidth: 1,
            borderColor: "#586249",
            fill: false,
            cubicInterpolationMode: "monotone",
            tension: 0.4,
          },
        ],
      },
    };
  },
  components: { GraficoPeso, AddPeso, AddDieta, EditCliente, DeleteCliente },
  methods: {
    getClientes(id_cliente?: number) {
      id_cliente = id_cliente
        ? id_cliente
        : Number(this.$route.params.id_cliente);
      ClienteService.getOne(id_cliente).then((data) => {
        this.dataCliente = data;
        this.getEdad();
      }).catch((err) => {
        const store = useMessageStore()
        if (err.response && err.response.status == 403) {
          store.message = "Necesitas estar logueado."
          return
        }
        store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
      });
    },
    getDietas(id_cliente?: number) {
      id_cliente = id_cliente
        ? id_cliente
        : Number(this.$route.params.id_cliente);
      DietaService.getAll(id_cliente).then((data) => {
        this.dietasCliente = data;
      }).catch((err) => {
        const store = useMessageStore()
        if (err.response && err.response.status == 403) {
          store.message = "Necesitas estar logueado."
          return
        }
        store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
      });
    },
    getPesos(id_cliente?: number) {
      id_cliente = id_cliente
        ? id_cliente
        : Number(this.$route.params.id_cliente);
      PesoService.getAll(id_cliente).then((data) => {
        this.pesosCliente = data;
        this.getLastPeso();
        this.graphicPeso();
      }).catch((err) => {
        const store = useMessageStore()
        if (err.response && err.response.status == 403) {
          store.message = "Necesitas estar logueado."
          return
        }
        store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
      });
    },
    formatFecha(fecha: string): string {
      const fecha_nacimiento: Date = new Date(fecha);
      const year = fecha_nacimiento.getFullYear();
      const month = ("0" + (fecha_nacimiento.getMonth() + 1)).slice(-2);
      const day = ("0" + fecha_nacimiento.getDate()).slice(-2);
      const cadenaFecha = `${day}-${month}-${year}`;
      return cadenaFecha;
    },

    getLastPeso() {
      if (this.pesosCliente.length == 0) {
        this.ultimoPeso = null;
        return;
      }
      this.ultimoPeso = this.pesosCliente[this.pesosCliente.length - 1];
      this.fechaUltPeso = this.formatFecha(this.ultimoPeso.fecha.toString());
    },
    graphicPeso() {
      // Obtenemos de los datos del peso, la fecha y el peso para
      // guardarlos en los dos arrays
      const etiquetas = this.pesosCliente.map((peso: Peso) => {
        let fecha = new Date(peso.fecha);
        return fecha.toLocaleDateString("es-ES");
      });
      const pesos = this.pesosCliente.map((peso: Peso) => {
        return peso.peso;
      });
      // Los datos que le vamos a pasar al gráfico
      this.dataGrafico = {
        labels: etiquetas,
        datasets: [
          {
            data: pesos,
            borderWidth: 2,
            borderColor: "#586249",
            fill: false,
            cubicInterpolationMode: "monotone",
            tension: 0.4,
          },
        ],
      };
    },
    getEdad(): void {
      const ahora = new Date();
      const fechaNacimiento = new Date(this.dataCliente.fecha_nacimiento);

      let edad: number =
        ahora.getUTCFullYear() - fechaNacimiento.getUTCFullYear();

      const monthDiff = ahora.getMonth() - fechaNacimiento.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && ahora.getDate() < fechaNacimiento.getDate())
      ) {
        edad--;
      }
      this.edad = edad;
    },
  },
  beforeMount() {
    this.getClientes();
    this.getDietas();
    this.getPesos();
  },
  beforeRouteUpdate(to, from) {
    this.getClientes(Number(to.params.id_cliente));
    this.getDietas(Number(to.params.id_cliente));
    this.getPesos(Number(to.params.id_cliente));
  },
});
</script>
