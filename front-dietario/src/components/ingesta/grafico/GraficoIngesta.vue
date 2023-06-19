<template>
  <Doughnut :id="id_grafico" :options="chartOptions" :data="chartData" />
</template>

<script>
// import { Bar } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "GraficoIngesta",
  components: { Doughnut },
  props: { id_grafico: String, chartData: Object },
  data() {
    return {
      chartOptions: {
        responsive: true,
        rotation: 0,
      },
    };
  },
};
</script>
