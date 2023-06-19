<template>
  <!--Boton del Side Menu Offcanvas para la version móvil -->
  <button class="btn btn-primary d-lg-none float-end button-clientes" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#sideMenu" aria-controls="offcanvasResponsive" style="z-index: 2000;">Clientes</button>
  <!-- Side Menu Offcanvas, solo aparece en móvil -->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="sideMenu" aria-labelledby="sideMenuLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title"></h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body" data-bs-dismiss="offcanvas">
      <ListaClientes></ListaClientes>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <!-- Side Menu para vista de sobremesa -->
      <div class="col-md-4 m-0 p-0 d-none d-lg-block border-end border-1 shadow ">
        <ListaClientes></ListaClientes>
      </div>
      <!-- Los datos de los clientes o las dietas -->
      <div class="col-12 col-lg-8 m-0 p-0">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <!-- Formulario de añadir Clientes -->
  <AddCliente @update-cliente="$router.go"></AddCliente>
</template>


<script lang="ts">
import { defineComponent } from "vue";
// Componentes
import ListaClientes from "../components/clientes/ListaClientes.vue";
import AddCliente from "../components/clientes/modal/AddCliente.vue";

export default defineComponent({
  name: "ClienteView",
  components: { ListaClientes, AddCliente }
})
</script>