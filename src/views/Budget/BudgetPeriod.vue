<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Budget Periods</h3>
      </div>
    </div>

    <!-- Default Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <div v-if="userRole === 'BO'">
              <router-link to="/new-budget-period" class="btn btn-primary">New Period</router-link>
            </div>

          </div>
          <div class="card-body p-0 pb-3 text-center">
            <center v-if="loading">Loading...</center>
            <div class="table-responsive" v-else>
              <table class="table mb-0">
              <thead class="bg-light">
                <tr>
                  <th scope="col" class="border-0">#</th>
                  <th scope="col" class="border-0">Period</th>
                  <th scope="col" class="border-0">Start Date</th>
                  <th scope="col" class="border-0">End Date</th>
                  <th scope="col" class="border-0">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody :key="object.id" v-for="object in object_list">
                <tr>
                  <td>{{object.budget_period_id}}</td>
                  <td>{{object.period}}</td>
                  <td>{{object.start_date}}</td>
                  <td>{{object.end_date}}</td>
                  <td>{{object.status}}</td>
                  <td>
                    <router-link :to="{name: 'period-details', params: {period_id: object.budget_period_id}}" class="btn btn-sm btn-primary">
                      Details
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import config from '@/config';


export default {
  data() {
    return {
      object_list: {},
      loading: false,
    };
  },
  computed: {
    userRole() {
      return this.$root.auth.user.user_role;
    },
  },
  methods: {
    periods() {
      this.loading = true;
      axios.get(`${config.apiUrl}/budget/abp`, {
        headers: { Authorization: `JWT ${config.get_token()}` },
      }).then((response) => {
        this.loading = false;
        console.log(response);
        this.object_list = response.data;
      }).catch(({ response }) => {
        this.loading = false;
        console.log(response);
      });
    },
  },
  mounted() {
    console.log(config.get_token());
    this.periods();
  },
};
</script>
