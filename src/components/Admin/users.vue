<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Users</h3>
      </div>
    </div>

    <!-- Default Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <router-link to="/create-user" class="btn btn-primary">Create New User</router-link>
          </div>
          <div class="card-body p-0 pb-3 text-center">
            <div v-if="loading">
              Loading...
            </div>
            <div class="table-responsive" v-else>
              <table class="table mb-0">
                <thead class="bg-light">
                  <tr>
                    <th scope="col" class="border-0">#</th>
                    <th scope="col" class="border-0">First Name</th>
                    <th scope="col" class="border-0">Last Name</th>
                    <th scope="col" class="border-0">Email</th>
                    <th scope="col" class="border-0">User Role</th>
                    <th scope="col" class="border-0">Status</th>
                    <th scope="col" class="border-0"></th>
                  </tr>
                </thead>
                <tbody :key="object.id" v-for="object in object_list">
                  <tr>
                    <td>{{object.staff_id}}</td>
                    <td>{{object.first_name}}</td>
                    <td>{{object.last_name}}</td>
                    <td>{{object.email}}</td>
                    <td>{{object.user_type_display}}</td>
                    <td>
                      <span v-if="object.is_active">Active</span>
                      <span v-else>Disabled</span>
                    </td>
                    <td>
                      <router-link :to="`/update-user/${object.id}`" class="btn btn-primary"><i class="fa fa-pencil" aria-hidden="true"></i></router-link>
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
  methods: {
    users() {
      this.loading = true;
      axios.get(`${config.apiUrl}/user/list/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.loading = false;
        this.object_list = response.data;
      }).catch((response) => {
        this.loading = false;
        console.log(response);
      });
    },
  },
  mounted() {
    this.users();
  },
};
</script>
