<template>
  <div>
    <ChartControl @updateChart="updateChart" />
    <component :is="chartComponent" :chartData="dataChange" />
  </div>
</template>

<script setup>
import ChartControl from "../chart/ChartControll.vue";
import { Chart, registerables } from "chart.js";
import { ref, computed } from "vue";
import {
  DoughnutChart,
  PieChart,
  LineChart,
  BarChart,
  PolarAreaChart,
} from "vue-chart-3";

Chart.register(...registerables);

// Xác định props
const props = defineProps({
  label: Array,
  data: Array,
});

// Loại biểu đồ hiện tại
const chartType = ref("line");

// Dữ liệu mặc định cho biểu đồ
const chartData = ref({
  labels: ["1", "2", "3", "4"],
  datasets: [
    {
      label: "data 2",
      data: [10, 12, 22, 40],
      borderColor: "black",
      backgroundColor: ["red", "blue", "gray", "yellow"],
      tension: 0.1,
    },
    {
      label: "data 3",
      data: [10, 22, 22, 40],
      borderColor: "black",
      backgroundColor: ["red", "blue", "gray", "yellow"],
      tension: 0.1,
    },
    {
      label: "data 4",
      data: [1, 22, 32, 40],
      borderColor: "black",
      backgroundColor: ["red", "blue", "gray", "yellow"],
      tension: 0.1,
    },
    {
      label: "data 1",
      data: [1, 2, 2, 40],
      borderColor: "black",
      backgroundColor: ["red", "blue", "gray", "yellow"],
      tension: 0.1,
    },
  ],
});

const dataChange = computed(() => {
  if (!props.label || !props.data || props.data.length === 0) {
    return chartData.value;
  }
  return {
    labels: props.label.map(i => i.title),  // Không cần map nếu đã là array thuần
    datasets: [
      {
        label: props.label[0].title,
        data: props.data.map(i => i.value),
        borderColor: "black",
        backgroundColor: ["red", "blue", "gray", "yellow"],
        tension: 0.1,
      }
    ]
  };
});

// Chọn component biểu đồ tương ứng
const chartComponent = computed(() => {
  switch (chartType.value) {
    case "bar":
      return BarChart;
    case "pie":
      return PieChart;
    case "doughnut":
      return DoughnutChart;
    case "polar":
      return PolarAreaChart;
    default:
      return LineChart;
  }
});

function updateChart(type) {
  chartType.value = type;
}
</script>
