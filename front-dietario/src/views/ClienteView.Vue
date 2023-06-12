<template>
  <button class="btn btn-primary d-lg-none float-end button-clientes" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#sideMenu" aria-controls="offcanvasResponsive">Clientes</button>

  <div class="offcanvas offcanvas-start" tabindex="-1" id="sideMenu" aria-labelledby="sideMenuLabel">
    <div class="offcanvas-header">
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <ListaClientes></ListaClientes>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 p-0 d-none d-md-block">
        <ListaClientes></ListaClientes>
      </div>
      <div class="col-md-12 col-lg-8 p-0">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ListaClientes from "../components/clientes/ListaClientes.vue";
</script>
