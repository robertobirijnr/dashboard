<template>
  <div class="card card-small h-100">

    <!-- Card Header -->
    <div class="card-header border-bottom">
      <h6 class="m-0">{{title}}</h6>
    </div>

    <!-- Chart -->
    <div class="card-body d-flex py-0">
      <canvas height="220" ref="canvas" class="blog-users-by-device m-auto"></canvas>
    </div>

    <d-card-footer class="border-top">
      <d-row>

      </d-row>
    </d-card-footer>
  </div>
</template>

<script>
import Chart from '../../utils/chart';

const defaultChartData = {
  datasets: [{
    hoverBorderColor: '#ffffff',
    data: [68.3, 24.2, 7.5],
    backgroundColor: [
      'rgb(0, 44, 89)',
      'rgb(255, 180, 0)',
      'rgb(196, 24, 60)',
    ],
  }],
  labels: ['Departments', 'Units', 'Category'],
};

export default {
  name: 'Sammary',
  props: {
    /**
       * The chart config.
       */
    chartConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
       * The chart options.
       */
    chartOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
       * The chart data.
       */
    chartData: {
      type: Object,
      default() {
        return defaultChartData;
      },
    },
    /**
       * The chart title.
       */
    title: {
      type: String,
      default: 'Sammary',
    },
  },
  mounted() {
    const chartConfig = {
      type: 'pie',
      data: this.chartData,
      options: {
        ...{
          legend: {
            position: 'bottom',
            labels: {
              padding: 25,
              boxWidth: 20,
            },
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: 'index',
            position: 'nearest',
          },
        },
        ...this.chartOptions,
      },
    };

    new Chart(this.$refs.canvas, chartConfig);
  },
};
</script>

