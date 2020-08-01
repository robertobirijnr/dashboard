import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['BudgetPeriods', 'UnitBudget'],
      datasets: [
        {
          label: 'Budgets',
          data: [30, 15],
          backgroundColor: '#4285F4',
          borderWidth: 0,
        },

      ],
    },
    options: {
      responsive: true,
      legend: {
        display: true,
      },
      tooltips: {
        intersect: false,
        mode: 'index',
      },
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            display: false,
          },

          ticks: {
            fontColor: 'rgba(0,0,0, 0.5)',
          },
        }],
        yAxes: [{
          stacked: true,
          gridLines: {
            borderDash: [2],
            drawBorder: false,
            zeroLineColor: 'rgba(0,0,0,0)',
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
          },
          ticks: {
            fontColor: 'rgba(0,0,0, 0.5)',
          },
        }],
      },
    },
  }),

  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
