<template>
    <div  class="main-content-container container-fluid px-4">
      <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Departments</h3>
      </div>
    </div>

        <div class="col">
          <div class="card card-small mb-4">
            <center v-if="departmentsloading">Loading Departments...</center>
            <div class="table-responsive" v-else>
              <table class="table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Abbreviation</th>
                        <th>name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>
                            <input type="text" v-model="code" placeholder="Enter New Code" class="form-control">
                        </td>
                        <td>
                            <input type="text" v-model="abbr" placeholder="Enter Abbreviation" class="form-control">
                        </td>
                        <td>
                            <input type="text" v-model="name" placeholder="Enter Department Name" class="form-control">
                        </td>
                        <td>
                            <button :disabled="loading" @click="newDepart()" class="btn btn-sm btn-primary"><span v-if="loading">Saving...</span><span v-else>Submit</span></button>
                        </td>
                    </tr>
                    <tr :key="object.id" v-for="object in object_list">
                        <td>{{object.depart_id}}</td>
                        <td>{{object.abbreviation}}</td>
                        <td>{{object.name}}</td>
                        <td>
                            <router-link :to="`/department-detail/${object.depart_id}`" class="btn btn-sm btn-primary">
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
</template>
<script>

import axios from 'axios';
import config from '@/config';

export default {
  data() {
    return {
      object_list: {},
      code: '',
      abbr: '',
      name: '',
      departmentsloading: false,
      loading: false,
    };
  },
  methods: {
    departments() {
      this.departmentsloading = true;
      axios.get(`${config.apiUrl}/api/departments`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.departmentsloading = false;
        this.object_list = response.data;
      }).catch((response) => {
        console.log(response);
      });
    },
    newDepart() {
      if (this.code || this.abbr || this.name) {
        this.loading = true;
        axios.post(
          `${config.apiUrl}/api/nd/`, {
            code: this.code,
            abbr: this.abbr,
            name: this.name,
          },
          {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          },
        ).then((response) => {
          this.loading = false;
          console.log(response);
          this.code = '';
          this.abbr = '';
          this.name = '';
          this.departments();
        }).catch(({ response }) => {
          this.loading = false;
          console.log(response);
        });
      }
    },
  },
  mounted() {
    this.departments();
  },
};
</script>
