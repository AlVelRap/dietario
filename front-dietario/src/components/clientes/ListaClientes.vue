<template>
  <div class="container my-4">
    <div class="row">
      <div class="col text-center">
        <h1>Clientes</h1>
      </div>
    </div>
    <div class="row" data-bs-dismiss="offcanvas">
      <div class="col">
        <div class="container">
          <hr />
          <div
            class="row justify-content-between"
            v-for="cliente in listaClientes"
          >
            <router-link
              :to="{
                path: '/cliente/' + cliente.id_cliente,
              }"
              style="text-decoration: none; color: black"
            >
              <div class="row ms-3 me-2">
                <div class="col-11">
                  {{ cliente.nombre }} {{ cliente.apellidos }}
                </div>
                <div class="col-1">
                  <span class="material-symbols-outlined"> chevron_right </span>
                </div>
              </div>
              <hr />
            </router-link>
          </div>
          <div class="row">
            <div class="col text-center">
              <button
                class="btn btn-primary btn-round"
                data-bs-toggle="modal"
                data-bs-target="#addCliente"
              >
                <span class="material-symbols-outlined"> add </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ver como referescar los componentes esta es una muy mala aprximacion -->
  <AddCliente @update-cliente="$router.go" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClienteService from "@/services/cliente.service";
import type Cliente from "@/types/Cliente";
import AddCliente from "./modal/AddCliente.vue";

export default defineComponent({
  name: "ListaClientes",
  data() {
    return {
      listaClientes: [] as Cliente[],
    };
  },
  components: { AddCliente },
  methods: {
    getClientes(id_user: string) {
      ClienteService.getAll().then((data) => {
        // console.log(data);
        this.listaClientes = data;
      });
      // .then((usuarios: ResponseData) => {
      //   console.log(usuarios.data);
      //   // this.usuarios_lista = usuarios;
      // });
    },
  },
  mounted() {
    this.getClientes("a");
  },
});
</script>
