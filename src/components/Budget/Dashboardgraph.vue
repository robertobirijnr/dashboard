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

    <!-- Default Light Table -->
    <!-- <div class="row">
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

                <td>#{{activity.activity_id}}</td>
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
    </div> -->


  </div>
</template>

<script>
// import activityLog from '@/components/Admin/ActivityLogs.vue';
// import Chart from '../../utils/chart';
import axios from 'axios';
import config from '@/config';
import moment from 'moment';


export default {
  name: 'users-overview',

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
      }).catch((res) => {
        console.log(res);
      });
    },
  },
  mounted() {
    this.dashboard();
  },
};
</script>

