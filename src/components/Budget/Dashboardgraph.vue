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


      </div>
    </div>
    <br><br>

   <d-row>
      <!-- Users Overview -->
      <d-col lg="4" md="6" sm="12" class="mb-4 pl-5">
         <Summary />
      </d-col>

      <!-- Users by Device (lite) -->
      <d-col lg="6" md="6" sm="12" class="mb-4 pl-5">
        <barChart/>
      </d-col>
    </d-row>


  </div>
</template>

<script>

import barChart from '@/components/chartComponents/barChart.vue';
import Summary from '@/components/chartComponents/Summary.vue';
import axios from 'axios';
import config from '@/config';
import moment from 'moment';


export default {
  name: 'users-overview',
  components: {

    barChart,
    Summary,

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
    moment(date) {
      return moment(date).fromNow();
    },
  },
  methods: {
    dashboard() {
      this.loading = true;

      axios.get(`${config.apiUrl}/budget/d/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
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
      }).catch(({ response }) => {
        console.log(response);
        if (response.status === 401) {
          this.$noty.error('Oops! Your session has expired.');
          localStorage.removeItem('auth');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.$router.push('/login');
        }
      });
    },
  },
  mounted() {
    this.dashboard();
  },
};
</script>

