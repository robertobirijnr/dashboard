<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Dashboard Overview</h3>
      </d-col>
    </d-row>
    <div class="container">
      <div class="card-deck text-white ">
        <router-link to="/departments" class="card card-small card-link text-center" >
          <div class="card-block card-body bg-info text-white">
            <h4 class="card-title text-uppercase text-white">Departments</h4>
            <p class="card-text display-3">
              {{departs}}
            </p>
          </div>
          <div class="card-footer bg-primary text-white">
            Units {{units}}
          </div>
        </router-link>

        <router-link to="/budget-settings" class="card card-link card-small text-center">
          <div class="card-block card-body bg-warning">
            <h4 class="card-title text-uppercase text-white">Categories</h4>
            <p class="card-text display-3 text-white">
              {{cats}}
            </p>
          </div>
          <div class="card-footer bg-warning text-white">
            Items {{items}}
          </div>
        </router-link>

        <router-link to="/users" class="card card-link card-small text-center">
          <div class="card-block card-body bg-danger">
            <h4 class="card-title text-uppercase text-white">Users</h4>
            <p class="card-text display-3 text-white">
              {{users}}
            </p>
          </div>
          <div class="card-footer bg-danger text-white">
            <!--Units 200-->
          </div>
        </router-link>
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

  </d-container>
</template>
<script>
  import axios from 'axios';
  import config from '@/config';
  import moment from 'moment';

  export default {
    data(){
      return {
        departs: '',
        units: '',
        cats: '',
        items: '',
        users: '',
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
        axios.get(`${config.apiUrl}/api/d/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          this.loading = false;
          const results = res.data;
          this.activities = results.activities;
          this.departs = results.departments;
          this.units = results.units;
          this.cats = results.categories;
          this.items = results.items;
          this.users = results.users;
        }).catch((res) => {
          console.log(res);
        });
      }
    },
    mounted(){
      this.dashboard();
    }
  }
</script>

