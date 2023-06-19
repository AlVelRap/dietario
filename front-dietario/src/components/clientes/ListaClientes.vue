<template>
  <div class="container my-4">
    <!-- Titulo -->
    <div class="row">
      <div class="col text-center">
        <h1>Clientes</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!-- Nombres de los clientes -->
        <div class="container">
          <hr />
          <div class="row justify-content-between" v-for="cliente in listaClientes">
            <router-link :to="{
              path: '/cliente/' + cliente.id_cliente,
            }" style="text-decoration: none; color: black">
              <div class="row ms-3 me-2">
                <div class="col-10">
                  {{ cliente.nombre }} {{ cliente.apellidos }}
                </div>
                <div class="col-1">
                  <span class="material-symbols-outlined"> chevron_right </span>
                </div>
              </div>
              <hr />
            </router-link>
          </div>
          <!-- Boton de añadir clientes -->
          <div class="row">
            <div class="col text-center">
              <button class="btn btn-primary btn-round" data-bs-toggle="modal" data-bs-target="#addCliente">
                <span class="material-symbols-outlined"> add </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// Servicios
import ClienteService from "@/services/cliente.service";
// Tipos
import type Cliente from "@/types/Cliente";
// Constantes
import { GENERIC_ERR_MESSAGE } from "@/util/constants";
// Store
import { useMessageStore } from "@/stores/messages";

export default defineComponent({
  name: "ListaClientes",
  data() {
    return {
      listaClientes: [] as Cliente[],
    };
  },
  methods: {
    getClientes() {
      ClienteService.getAll().then((data) => {
        this.listaClientes = data;
      }).catch((err) => {
        const store = useMessageStore()
        if (err.response && err.response.status == 403) {
          store.message = "Necesitas estar logueado."
          return
        }
        store.message = !err.response ? GENERIC_ERR_MESSAGE : err.response.data.message
      });;
    },
  },
  mounted() {
    this.getClientes();
  },
});
</script>
