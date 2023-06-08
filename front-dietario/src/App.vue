<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/NavBar.vue";

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
  <footer></footer>
</template>
