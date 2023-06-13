<template>
    <button class="btn btn-primary d-lg-none float-end button-clientes" type="button" data-bs-toggle="offcanvas"
      data-bs-target="#sideMenu" aria-controls="offcanvasResponsive">Clientes</button>
  
    <div class="offcanvas offcanvas-start" tabindex="-1" id="sideMenu" aria-labelledby="sideMenuLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body" data-bs-dismiss="offcanvas"> 
        <!--Esta es la unica solucion que se me ha ocurrido de momento para lo del SideMenu-->
        <ListaClientes></ListaClientes>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 p-0 d-none d-lg-block">
          <ListaClientes></ListaClientes>
        </div>
        <div class="col-12 col-lg-8 p-0">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <AddCliente @update-cliente="$router.go"></AddCliente>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  import ListaClientes from "../components/clientes/ListaClientes.vue";
  import AddCliente from "../components/clientes/modal/AddCliente.vue";
  export default defineComponent({
    name: "ClienteView",
    components: { ListaClientes,AddCliente }
  })
  </script>