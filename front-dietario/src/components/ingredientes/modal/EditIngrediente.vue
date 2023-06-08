<template>
  <div
    :id="'ingrediente' + id_ingrediente + '-' + id_ingesta"
    class="modal fade"
    tabindex="-1"
    :aria-labelledby="
      'ingrediente' + id_ingrediente + '-' + id_ingesta + '-label'
    "
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <DeleteIngrediente
          :id_ingesta="id_ingesta"
          :id_ingrediente="id_ingrediente"
          @delete-ingrediente="$emit('deleteIngrediente',cantidad)"
          @show-edit-ingrediente="showEditIngredienteFunction"
          v-if="showDeleteIngrediente"
        ></DeleteIngrediente>
        <div class="modal-header" v-if="!showDeleteIngrediente">
          <button
            type="button"
            class="btn btn-default"
            aria-label="Borrar"
            @click="deleteIngrediente"
          >
            <span class="material-symbols-outlined"> delete </span>
          </button>
          <h5 class="modal-title text-center w-100">
            {{ ingrediente.nombre }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="!showDeleteIngrediente">
          <div class="container">
            <div class="row my-2">
              <div class="col-12 text-center">
                <h3>{{ energiaTotal.toFixed(0) }} kcal</h3>
              </div>
            </div>
            <div class="row my-4">
              <div class="col-12 text-center">
                <form action="">
                  <input type="number" class="form-control-lg text-center" v-model="cantidad" /> gr
                </form>
              </div>
            </div>
            <div class="row my-4">
              <div class="container">
                <div class="row text-center">
                  <div class="col-4">
                    Grasas
                    <GraficoIngesta
                      id_grafico="graficoLipidosIngrediente"
                      :chartData="dataLip"
                    ></GraficoIngesta>
                    {{ cantidadLipidos.toFixed(0) }} gr
                  </div>
                  <div class="col-4">
                    HdC
                    <GraficoIngesta
                      id_grafico="graficoHdcIngrediente"
                      :chartData="dataHdc"
                    ></GraficoIngesta>
                    {{ cantidadHdc.toFixed(0) }} gr
                  </div>
                  <div class="col-4">
                    Proteínas
                    <GraficoIngesta
                      id_grafico="graficoProteinasIngrediente"
                      :chartData="dataProte"
                    ></GraficoIngesta>
                    {{ cantidadProteinas.toFixed(0) }} gr
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12" @click="mostrarDetalles = !mostrarDetalles">
              <span class="material-symbols-outlined" v-show="mostrarDetalles">
                remove
              </span>
              <span class="material-symbols-outlined" v-show="!mostrarDetalles">
                add
              </span>
              Detalles
            </div>
          </div>
          <div class="row mt-2" v-show="mostrarDetalles">
            <div class="col-12">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    :id="'macros-tab' + id_ingrediente + '-' + id_ingesta"
                    data-bs-toggle="tab"
                    :data-bs-target="
                      '#macros' + id_ingrediente + '-' + id_ingesta
                    "
                    type="button"
                    role="tab"
                    :aria-controls="
                      'macros' + id_ingrediente + '-' + id_ingesta
                    "
                    aria-selected="true"
                  >
                    Macros
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    :id="'a-grasos-tab' + id_ingrediente + '-' + id_ingesta"
                    data-bs-toggle="tab"
                    :data-bs-target="
                      '#a-grasos' + id_ingrediente + '-' + id_ingesta
                    "
                    type="button"
                    role="tab"
                    :aria-controls="
                      'a-grasos' + id_ingrediente + '-' + id_ingesta
                    "
                    aria-selected="false"
                  >
                    A. Grasos
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    :id="'minerales-tab' + id_ingrediente + '-' + id_ingesta"
                    data-bs-toggle="tab"
                    :data-bs-target="
                      '#minerales' + id_ingrediente + '-' + id_ingesta
                    "
                    type="button"
                    role="tab"
                    :aria-controls="
                      'minerales' + id_ingrediente + '-' + id_ingesta
                    "
                    aria-selected="false"
                  >
                    Minerales
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    :id="'vitaminas-tab' + id_ingrediente + '-' + id_ingesta"
                    data-bs-toggle="tab"
                    :data-bs-target="
                      '#vitaminas' + id_ingrediente + '-' + id_ingesta
                    "
                    type="button"
                    role="tab"
                    :aria-controls="
                      'vitaminas' + id_ingrediente + '-' + id_ingesta
                    "
                    aria-selected="false"
                  >
                    Vitaminas
                  </button>
                </li>
              </ul>
              <div
                class="tab-content border border-top-0 p-2"
                id="myTabContent"
              >
                <div
                  class="tab-pane fade show active"
                  :id="'macros' + id_ingrediente + '-' + id_ingesta"
                  role="tabpanel"
                  :aria-labelledby="
                    'macros' + id_ingrediente + '-' + id_ingesta + '-label'
                  "
                  tabindex="0"
                >
                  Por cada 100 gr.
                  <ul>
                    <li>Porción Comestible: {{ macros.porcion_comestible }}</li>
                    <li>Energía: {{ macros.energia }} Kcal</li>
                    <li>Proteinas: {{ macros.proteinas }} gr</li>
                    <li>Hdc: {{ macros.hdc }} gr</li>
                    <li>Lípidos: {{ macros.lipidos }} gr</li>
                    <li>Fibra Alimentaria: {{ macros.fibra }} gr</li>
                  </ul>
                </div>
                <div
                  class="tab-pane fade"
                  :id="'a-grasos' + id_ingrediente + '-' + id_ingesta"
                  role="tabpanel"
                  :aria-labelledby="
                    'a-grasos' + id_ingrediente + '-' + id_ingesta + '-label'
                  "
                  tabindex="0"
                >
                  Por cada 100 gr.
                  <ul>
                    <li>Ac. G Saturados: {{ acGrasos.ac_g_saturado }} gr</li>
                    <li>C14:0: {{ acGrasos.c14_0 }} gr</li>
                    <li>C16:0: {{ acGrasos.c16_0 }} gr</li>
                    <li>
                      Ac. G. Monoinsaturados:
                      {{ acGrasos.ac_g_monoinsaturado }} gr
                    </li>
                    <li>C16:1: {{ acGrasos.c16_1 }} gr</li>
                    <li>C18:1: {{ acGrasos.c18_1 }} gr</li>
                    <li>
                      Ac. G. Poliinsaturados:
                      {{ acGrasos.ac_g_polinsaturado }} gr
                    </li>
                    <li>C18:2: {{ acGrasos.c18_2 }} gr</li>
                    <li>C18:3: {{ acGrasos.c18_3 }} gr</li>
                    <li>Colesterol: {{ acGrasos.colesterol }} gr</li>
                    <li>Etanol: {{ acGrasos.etanol }} gr</li>
                  </ul>
                </div>
                <div
                  class="tab-pane fade"
                  :id="'minerales' + id_ingrediente + '-' + id_ingesta"
                  role="tabpanel"
                  :aria-labelledby="
                    'macros' + id_ingrediente + '-' + id_ingesta + 'label'
                  "
                  tabindex="0"
                >
                  Por cada 100 gr.
                  <ul>
                    <li>Sodio: {{ minerales.sodio }} mg</li>
                    <li>Potasio: {{ minerales.potasio }} mg</li>
                    <li>Calcio: {{ minerales.calcio }} mg</li>
                    <li>Magnesio: {{ minerales.magnesio }} mg</li>
                    <li>Hierro: {{ minerales.hierro }} mg</li>
                    <li>Zinc: {{ minerales.zinc }} mg</li>
                    <li>Fósforo: {{ minerales.fosforo }} mg</li>
                    <li>Iodo: {{ minerales.iodo }} μg</li>
                    <li>Flúor: {{ minerales.fluor }} μg</li>
                    <li>Cobre: {{ minerales.cobre }} μg</li>
                    <li>Selenio: {{ minerales.selenio }} μg</li>
                  </ul>
                </div>
                <div
                  class="tab-pane fade"
                  :id="'vitaminas' + id_ingrediente + '-' + id_ingesta"
                  role="tabpanel"
                  :aria-labelledby="
                    'vitaminas' + id_ingrediente + '-' + id_ingesta + '-label'
                  "
                  tabindex="0"
                >
                  Por cada 100 gr.
                  <ul>
                    <li>Vit. A: {{ vitaminas.vit_a }} μgeq</li>
                    <li>Vit. D: {{ vitaminas.vit_d }} μg</li>
                    <li>Vit. E: {{ vitaminas.vit_e }} μgeq</li>
                    <li>Vit. C: {{ vitaminas.vit_c }} mg</li>
                    <li>Vit B1: {{ vitaminas.vit_b1 }} mg</li>
                    <li>Vit. B2: {{ vitaminas.vit_b12 }} mg</li>
                    <li>Niacina: {{ vitaminas.naicina }} mg</li>
                    <li>Vit. B6: {{ vitaminas.vit_b6 }} mg</li>
                    <li>Vit. B12: {{ vitaminas.vit_b12 }} μg</li>
                    <li>Ac. Fólico: {{ vitaminas.ac_folico }} μg</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer" v-if="!showDeleteIngrediente">
          <div class="container text-center">
            <button
              type="button"
              class="btn btn-primary mx-2"
              @click="updateIngrediente"
              data-bs-dismiss="modal"
            >
              Actualizar
            </button>
            <button
              type="button"
              class="btn btn-secondary mx-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import GraficoIngesta from "@/components/ingesta/grafico/GraficoIngesta.vue";
import IngredienteService from "@/services/ingrediente.service";
import IngestaIngredienteService from "@/services/ingestaIngrediente.service";
import MacronutrienteService from "@/services/macronutrientes.service";
import Acidos_GrasosService from "@/services/acidos_grasos.service";
import MineralesService from "@/services/minerales.service";
import VitaminasService from "@/services/vitaminas.service";
import type Ingrediente from "@/types/Ingrediente";
import {
  ENERGIA_HDC,
  ENERGIA_LIPIDO,
  ENERGIA_PROTEINA,
} from "@/util/constants";
import type Macronutrientes from "@/types/Macronutrientes";
import type AcidosGrasos from "@/types/AcidosGrasos";
import type Minerales from "@/types/Minerales";
import type Vitaminas from "@/types/Vitaminas";
import type ResponseData from "@/types/ResponseData";
import DeleteIngrediente from "@/components/ingredientes/modal/DeleteIngrediente.vue";

export default defineComponent({
  name: "EditIngrediente",
  data() {
    return {
      showDeleteIngrediente: false,
      cantidad: 0,
      cantidadLipidos: 0,
      cantidadHdc: 0,
      cantidadProteinas: 0,
      energiaTotal: 0,
      mostrarDetalles: false,
      ingrediente: {} as Ingrediente,
      macros: {} as Macronutrientes,
      acGrasos: {} as AcidosGrasos,
      minerales: {} as Minerales,
      vitaminas: {} as Vitaminas,
      dataLip: {
        datasets: [
          {
            label: "% Grasa",
            borderWidth: 0,
            backgroundColor: ["#F6ED01", "#D9D9D9"],
            data: [0, 100],
          },
        ],
      },
      dataHdc: {
        datasets: [
          {
            label: "% HdC",
            borderWidth: 0,
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
            borderWidth: 0,
            data: [0, 100],
          },
        ],
      },
    };
  },
  props: {
    id_ingesta: Number,
    id_ingrediente: Number,
    pesoIngrediente: Number,
  },
  components: { GraficoIngesta, DeleteIngrediente },
  watch: {
    id_ingrediente: function () {
      this.getIngrediente();
    },
    cantidad: function (newCantidad: number) {
      this.cantidadLipidos = (newCantidad * this.macros.lipidos) / 100;
      this.cantidadHdc = (newCantidad * this.macros.hdc) / 100;
      this.cantidadProteinas = (newCantidad * this.macros.proteinas) / 100;
      this.energiaTotal = (newCantidad * this.macros.energia) / 100;
    },
    macros: function (newMacros: Macronutrientes) {
      this.cantidadLipidos = (this.cantidad * newMacros.lipidos) / 100;
      this.cantidadHdc = (this.cantidad * newMacros.hdc) / 100;
      this.cantidadProteinas = (this.cantidad * newMacros.proteinas) / 100;
      this.energiaTotal = (this.cantidad * newMacros.energia) / 100;
    },
  },
  methods: {
    getIngrediente(): void {
      if (!this.id_ingrediente) return;
      MacronutrienteService.getOne(this.id_ingrediente).then(
        (macros: Macronutrientes) => {
          this.macros = macros;

          this.dataLip = {
            datasets: [
              {
                label: "% Grasa",
                backgroundColor: ["#F6ED01", "#D9D9D9"],
                borderWidth: 0,
                data: [
                  ((macros.lipidos * ENERGIA_LIPIDO) / macros.energia) * 100,
                  (1 - (macros.lipidos * ENERGIA_LIPIDO) / macros.energia) *
                    100,
                ],
              },
            ],
          };

          this.dataHdc = {
            datasets: [
              {
                label: "% HdC",
                backgroundColor: ["#44B81B", "#D9D9D9"],
                borderWidth: 0,
                data: [
                  ((macros.hdc * ENERGIA_HDC) / macros.energia) * 100,
                  (1 - (macros.hdc * ENERGIA_HDC) / macros.energia) * 100,
                ],
              },
            ],
          };

          this.dataProte = {
            datasets: [
              {
                label: "% Proteinas",
                backgroundColor: ["#B81B1B", "#D9D9D9"],
                borderWidth: 0,
                data: [
                  ((macros.proteinas * ENERGIA_PROTEINA) / macros.energia) *
                    100,
                  (1 - (macros.proteinas * ENERGIA_PROTEINA) / macros.energia) *
                    100,
                ],
              },
            ],
          };
        }
      );

      IngredienteService.getOne(this.id_ingrediente).then(
        (ingrediente: Ingrediente) => {
          this.ingrediente = ingrediente;
        }
      );
      Acidos_GrasosService.getOne(this.id_ingrediente).then(
        (acGrasos: AcidosGrasos) => {
          this.acGrasos = acGrasos;
        }
      );
      MineralesService.getOne(this.id_ingrediente).then(
        (minerales: Minerales) => {
          this.minerales = minerales;
        }
      );
      VitaminasService.getOne(this.id_ingrediente).then(
        (vitaminas: Vitaminas) => {
          this.vitaminas = vitaminas;
        }
      );
    },
    updateIngrediente(): void {
      if (!this.id_ingrediente || !this.id_ingesta) return;
      const data = {
        id_ingesta: this.id_ingesta,
        id_ingrediente: this.id_ingrediente,
        cantidad: this.cantidad,
      };
      IngestaIngredienteService.update(
        this.id_ingrediente,
        this.id_ingesta,
        data
      ).then((response: ResponseData) => {
        if (response) {
          this.$emit("updateIngesta",this.cantidad);
        }
        // Emitir evento para que se recargue la ingesta
      });
    },
    deleteIngrediente() {
      this.showDeleteIngrediente = true;
    },
    showEditIngredienteFunction(valor: boolean) {
      this.showDeleteIngrediente = valor;
    },
  },
  beforeMount() {
    this.getIngrediente();
    if (this.pesoIngrediente) {
      this.cantidad = this.pesoIngrediente;
    }
  },
  emits: ["updateIngesta","deleteIngrediente"],
});
</script>
