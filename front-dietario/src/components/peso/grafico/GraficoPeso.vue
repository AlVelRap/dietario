<template>
  <Line :id="id_grafico" :options="chartOptions" :data="dataPeso" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "GraficoPeso",
  components: { Line },
  props: { id_grafico: String, dataPeso: Object },
  data() {
    return {
      chartOptions: {
        responsive: true,
        rotation: 0,
        pointStyle: "circle",
        pointBackgroundColor: "#416900",
        pointBorderColor: "#416900",
        plugins: {
          legend: null,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    };
  },
};
</script>
