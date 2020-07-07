<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Unit Budget Details</h3>
      </div>
    </div>

    <!-- Default Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <span>Status: Pending</span>
          </div>
          <div class="card-body p-0 pb-3 text-center">
            <table class="table mb-0">
              <thead class="bg-light">
                <tr>
                  <th scope="col" class="border-0">Category</th>
                  <th scope="col" class="border-0">Item</th>
                  <th scope="col" class="border-0">Quantity</th>
                  <th scope="col" class="border-0">Unit Price</th>
                  <th scope="col" class="border-0">Total Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody :key="item.id" v-for="item in object.items">
                <tr>
                    <td>{{item.item.category_name}}</td>
                    <td>{{item.item.item_name}}</td>
                    <td>{{item.quantity}}</td>
                    <td>{{item.unit_price}}</td>
                    <td>{{item.total_amount}}</td>
                    <td></td>
                </tr>
              </tbody>
            </table>
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
      object: {},
    };
  },
  methods: {
    details() {
      const budgetid = this.$route.params.unit_id;
      axios.get(`${config.apiUrl}/budget/ubd/${budgetid}/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.object = response.data;
        console.log(response);
      }).catch((response) => {
        console.log(response);
      });
    },
  },
  mounted() {
    this.details();
  },

};
</script>

