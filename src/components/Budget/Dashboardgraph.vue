<template>
  <div>
    <div class="container">
      <div class="card-deck text-white ">
        <router-link to="/budget-periods" class="card card-small card-link text-center" >
          <div class="card-block card-body bg-info text-white">
            <h4 class="card-title text-uppercase text-white">Budget Periods</h4>
            <p class="card-text display-3">
              {{periods}}
            </p>
          </div>
          <div class="card-footer bg-primary text-white">
            <div class="ror">
              <span class="col">Opened: {{opened}}</span>
              <span class="col">Closed: {{closed}}</span>

            </div>
          </div>
        </router-link>

        <router-link to="/unit-budgets" class="card card-link card-small text-center">
          <div class="card-block card-body bg-warning">
            <h4 class="card-title text-uppercase text-white">Unit Budgets</h4>
            <p class="card-text display-3 text-white">
              {{budgets}}
            </p>
          </div>
          <div class="card-footer bg-warning text-white">
            <div class="ror">
              <span class="col">Pending: {{pending}}</span>
              <span class="col">Confirmed: {{confirmed}}</span>
              <span class="col">Completed: {{completed}}</span>
            </div>
          </div>
        </router-link>

        <!--<router-link to="/users" class="card card-link card-small text-center">-->
          <!--<div class="card-block card-body bg-danger">-->
            <!--<h4 class="card-title text-uppercase text-white">Users</h4>-->
            <!--<p class="card-text display-3 text-white">-->
              <!--{{users}}-->
            <!--</p>-->
          <!--</div>-->
          <!--<div class="card-footer bg-danger text-white">-->
            <!--&lt;!&ndash;Units 200&ndash;&gt;-->
          <!--</div>-->
        <!--</router-link>-->
      </div>
    </div>
    <br><br>

    <!-- Default Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0">My Activity Logs</h6>
          </div>
          <div class="card-body p-0 pb-3 text-center">
            <table class="table mb-0">
              <thead class="bg-light">
              <tr>

                <th scope="col" class="border-0">Activity ID</th>
                <th scope="col" class="border-0">Action</th>
                <th scope="col" class="border-0">Model</th>
                <th scope="col" class="border-0">Model ID</th>
                <th scope="col" class="border-0">At</th>

              </tr>
              </thead>
              <tbody :key="activity.activity_id" v-for="activity in activities">
              <tr>

                <td>{{activity.activity_id}}</td>
                <td>{{activity.action}}</td>
                <td>{{activity.model}}</td>
                <td>#{{activity.model_id}}</td>
                <td>{{activity.created_at | moment }}</td>

              </tr>


              </tbody>
            </table>
          </div>
          <div class="card-footer text-center">View All >></div>
        </div>
      </div>
    </div>
    <!--<div class="card mb-3">-->
      <!--<div class="card-body pt-0">-->
        <!--<div class="row border-bottom py-2 bg-light">-->
          <!--<div class="col-sm-6 d-flex mb-2 mb-sm-0">-->
            <!--<div class="input-group-sm data-range d-flex justify-content-left">-->
              <!--<d-datepicker-->
                <!--v-model="dateRange.from"-->
                <!--:highlighted="{ from: dateRange.from, to: dateRange.to || new Date() }"-->
                <!--placeholder="Start Date"-->
                <!--typeable-->
                <!--small-->
              <!--/>-->
              <!--<d-datepicker-->
                <!--v-model="dateRange.to"-->
                <!--:highlighted="{ from: dateRange.from, to: dateRange.to || new Date() }"-->
                <!--placeholder="End Date"-->
                <!--typeable-->
                <!--small-->
              <!--/>-->
              <!--<d-input-group-text slot="append">-->
                <!--<i class="material-icons">&#xE916;</i>-->
              <!--</d-input-group-text>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div ref="legend"></div>-->
        <!--<canvas height="120" ref="canvas" style="max-width: 100% !important;"></canvas>-->
      <!--</div>-->
    <!--</div>-->

    <!--<div class="row">-->
      <!--<div class="col-lg-7 col-md-7 col-sm-12">-->
        <!--<div class="card">-->
          <!--<div class="card-header border-bottom">Statistics</div>-->
          <!--<div class="row pt-3">-->
            <!--<div class="col border-right">-->
              <!--<span class="card-header text-center">Budget Periods</span>-->
              <!--<p class="card-text text-center display-3">-->
                <!--100-->
              <!--</p>-->

            <!--</div>-->
            <!--<div class="col border-right">-->
              <!--<span class="card-header text-center">Unit Budgets</span>-->
              <!--<p class="card-text text-center display-3">-->
                <!--100-->
              <!--</p>-->

            <!--</div>-->
            <!--<div class="col border-right">-->
              <!--<span class="card-header text-center">Budget Periods</span>-->
              <!--<p class="card-text text-center display-3">-->
                <!--100-->
              <!--</p>-->

            <!--</div>-->


          <!--</div>-->

        <!--</div>-->

      <!--</div>-->
      <!--<div class="col-lg-5 col-md-5 col-sm-12">-->
        <!--<div  class="card-smallcard blog-comments">-->

    <!--&lt;!&ndash; Card Header &ndash;&gt;-->
          <!--<div  class="card-header border-bottom">-->
            <!--<h6 class="m-0">My Activity Logs</h6>-->
          <!--</div>-->

          <!--<div class="card-body p-0">-->
            <!--<div class="blog-comments__item d-flex p-3">-->
              <!--<div class="blog-comments__content">-->
                <!--<div class="blog-comments__meta text-muted">-->
                  <!--<a class="text-secondary" href="#">blah</a> on <a class="text-secondary" href="#">yeah</a> <span class="text-muted">yes</span>-->
                <!--</div>-->
              <!--</div>-->

            <!--</div>-->
          <!--</div>-->

          <!--<div  class="card-footer border-top">-->
            <!--<div class="row">-->

              <!--&lt;!&ndash; View All Comments &ndash;&gt;-->
              <!--<div  class="col text-center view-report">-->
                <!--<button type="submit" class="button btn btn-white" >View All Activities</button>-->
              <!--</div>-->

            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->



    <!--</div>-->
  </div>
</template>

<script>
  import activityLog from '@/components/Admin/ActivityLogs.vue';
  import Chart from '../../utils/chart';
  import axios from 'axios';
  import config from '@/config';
  import moment from 'moment';

  const defaultChartData = {
    labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: 'Periods',
        fill: 'start',
        data: [
          500,
          800,
          320,
          180,
          240,
          320,
          230,
          650,
          590,
          1200,
          750,
          940,
          1420,
          1200,
          960,
          1450,
          1820,
          2800,
          2102,
          1920,
          3920,
          3202,
          3140,
          2800,
          3200,
          3200,
          3400,
          2910,
          3100,
          4250,
        ],
        backgroundColor: 'rgba(0,123,255,0.1)',
        borderColor: 'rgba(0,123,255,1)',
        pointBackgroundColor: '#ffffff',
        pointHoverBackgroundColor: 'rgb(0,123,255)',
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3,
      },
      {
        label: 'Number Of Budgets',
        fill: 'start',
        data: [
          380,
          430,
          120,
          230,
          410,
          740,
          472,
          219,
          391,
          229,
          400,
          203,
          301,
          380,
          291,
          620,
          700,
          300,
          630,
          402,
          320,
          380,
          289,
          410,
          300,
          530,
          630,
          720,
          780,
          1200,
        ],
        backgroundColor: 'rgba(255,65,105,0.1)',
        borderColor: 'rgba(255,65,105,1)',
        pointBackgroundColor: '#ffffff',
        pointHoverBackgroundColor: 'rgba(255,65,105,1)',
        borderDash: [3, 3],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBorderColor: 'rgba(255,65,105,1)',
      },
    ],
  };

  export default {
    name: 'users-overview',
    components: {
      activityLog,
    },
    props: {
      chartData: {
        type: Object,
        default() {
          return defaultChartData;
        },
      },
    },
    data() {
      return {
        dateRange: {
          from: null,
          to: null,
        },
        periods: '',
        budgets: '',
        opened: '',
        closed: '',
        pending: '',
        confirmed: '',
        completed: '',
        activities: {},
        loading: false,
      };
    },
    filters: {
      moment: function (date) {
        return moment(date).fromNow();
      },
    },
    methods: {
      dashboard(){
        this.loading = true;

        axios.get(`${config.apiUrl}/budget/d/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          this.loading = false;
          const results = res.data;
          this.periods = results.periods;
          this.budgets = results.budgets;
          this.opened = results.opened;
          this.closed = results.closed;
          this.pending = results.pending;
          this.confirmed = results.confirmed;
          this.completed = results.completed;
          this.activities = results.activities;
        }).catch((res) => {
          console.log(res);
        });
      }
    },
    mounted() {
      this.dashboard();
      const chartOptions = {
        ...{
          responsive: true,
          legend: {
            position: 'top',
          },
          elements: {
            line: {
              // A higher value makes the line look skewed at this ratio.
              tension: 0.3,
            },
            point: {
              radius: 0,
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: false,
                ticks: {
                  callback(tick, index) {
                    // Jump every 7 values on the X axis labels to avoid clutter.
                    return index % 7 !== 0 ? '' : tick;
                  },
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  suggestedMax: 45,
                  callback(tick) {
                    if (tick === 0) {
                      return tick;
                    }
                    // Format the amounts using Ks for thousands.
                    return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                  },
                },
              },
            ],
          },
          hover: {
            mode: 'nearest',
            intersect: false,
          },
          tooltips: {
            custom: false,
            mode: 'nearest',
            intersect: false,
          },
        },
        ...this.chartOptions,
      };

      const BlogUsersOverview = new Chart(this.$refs.canvas, {
        type: 'LineWithLine',
        data: this.chartData,
        options: chartOptions,
      });

      // They can still be triggered on hover.
      const buoMeta = BlogUsersOverview.getDatasetMeta(0);
      buoMeta.data[0]._model.radius = 0;
      buoMeta.data[this.chartData.datasets[0].data.length - 1]._model.radius = 0;

      // Render the chart.
      BlogUsersOverview.render();
    },
  };
</script>

