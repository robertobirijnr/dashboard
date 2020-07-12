<template>
    <div class="container container-fluid">
      <d-row no-gutters class="page-header py-2 pb-4 mb-3 border-bottom">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Overview</span>
          <h3 class="page-title">Units</h3>
        </d-col>
      </d-row>
        <div class="col">
          <div class="card card-small mb-4">
            <center v-if="unitloading">loading units...</center>
            <div class="table-responsive" v-else>
              <table class="table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Abbreviation</th>
                        <th>name</th>
                        <th>Department</th>
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
                            <input type="text" v-model="unit_name" placeholder="Enter Unit Name" class="form-control">
                        </td>
                        <td>
                            <select name="depart" v-model="depart" class="form-control">
                                <option value="">Choose...</option>
                                <option :key="dpt.id" v-for="dpt in departs" :value="`${dpt.id}`">{{dpt.name}}</option>
                            </select>
                        </td>
                        <td>
                            <button :disabled="loading" @click="newUnit()" class="btn btn-sm btn-primary"> <span v-if="loading">saving...</span><span v-else>Submit</span> </button>
                        </td>
                    </tr>
                    <tr :key="object.id" v-for="object in object_list">
                        <td>{{object.unit_id}}</td>
                        <td>{{object.abbreviation}}</td>
                        <td>{{object.unit_name}}</td>
                        <td>{{object.department_name}}</td>
                        <td>
                            <!-- <router-link :to="/unit-detail/{{unit_id}}" class="btn btn-sm btn-primary">
                                Details
                            </router-link> -->
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
      unit_name: '',
      depart: '',
      departs: {},
      abbr: '',
      unitloading: false,
    };
  },
  methods: {
    units() {
      this.unitloading = true;
      axios.get(`${config.apiUrl}/api/units/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.unitloading = false;
        this.object_list = response.data;
      }).catch(({ response }) => {
        console.log(response);
      });
    },
    newUnit() {
      axios.post(`${config.apiUrl}/api/nu/${this.depart}/`, {
        code: this.code,
        unit_name: this.unit_name,
        abbr: this.abbr,
      }, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        console.log(response);
        this.units();
      }).catch(({ response }) => {
        console.log(response);
      });
    },
    departments() {
      axios.get(`${config.apiUrl}/api/departments/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.departs = response.data;
      }).catch(({ response }) => {
        console.log(response);
      });
    },
  },
  mounted() {
    this.units();
    this.departments();
  },

};
</script>
