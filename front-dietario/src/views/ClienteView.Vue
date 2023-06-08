<template>
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
