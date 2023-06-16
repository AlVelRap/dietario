<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/NavBar.vue";

</script>

<template>
  <header class="m-0 p-0">
    <Navbar />
  </header>
  <main class="m-0 p-0">
    <RouterView />
  </main>
  <footer></footer>
</template>
