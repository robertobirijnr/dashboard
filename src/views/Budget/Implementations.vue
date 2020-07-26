<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Budget Implementations</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header"></div>
          <div class="card-body">
            <center v-if="loading"><Spinner/></center>
            <div class="table-responsive" v-if="object_list.length" >
              <table class="table table-borderless">
                <thead>
                <tr>
                  <th>Budget ID</th>
                  <!--<th>Unit</th>-->
                  <th>Budget Period</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr :key="object.id" v-for="object in object_list">
                  <td>#{{object.unit_budget_id}}</td>
                  <!--<td>{{object.unit_name}}</td>-->
                  <td>{{object.budget_period}}</td>
                  <td>{{object.status}}</td>
                  <td>
                    <router-link :to="`/implement-details/${object.unit_budget_id}`" class="btn btn-sm btn-primary">Details</router-link>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <span v-else>Nothing to show here!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../../config';
// eslint-disable-next-line import/first
import Spinner from '@/components/common/Spinner.vue';

export default {
  components: {
    Spinner,
  },
  name: 'Implementations',
  data() {
    return {
      object_list: {},
      loading: false,
    };
  },
  mounted() {
    this.implements();
  },
  methods: {
    implements() {
      this.loading = true;
      axios.get(`${config.apiUrl}/budget/cubs/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        this.loading = false;
        this.object_list = res.data;
      });
    },
  },
};
</script>

<style scoped>

</style>
