<template>
    <div>
        <div class="col">
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
                            <button @click="newDepart()" class="btn btn-sm btn-primary">Submit</button>
                        </td>
                    </tr>
                    <tr :key="object.id" v-for="object in object_list">
                        <td>{{object.depart_id}}</td>
                        <td>{{object.abbreviation}}</td>
                        <td>{{object.name}}</td>
                        <td>
                            <router-link to="" class="btn btn-sm btn-primary">
                                Details
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
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
    };
  },
  methods: {
    departments() {
      axios.get(`${config.apiUrl}/api/departments`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.object_list = response.data;
      }).catch((response) => {
        console.log(response);
      });
    },
    newDepart() {
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
        console.log(response);
        this.code = '';
        this.abbr = '';
        this.name = '';
        this.departments();
      }).catch(({ response }) => {
        console.log(response);
      });
    },
  },
  mounted() {
    this.departments();
  },
};
</script>
