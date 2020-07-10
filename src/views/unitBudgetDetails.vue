<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">{{object.unit_name}} Unit Budget Details</h3>
      </div>
    </div>

    <!-- Default Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <div class="row">
              <div class="col"><span>Status: {{object.status}}</span></div>
              <div class="col" align="right">
                <div class="row">
                  <div class="col">
                    <select name="" id="" v-model="type" class="form-control" @change="exp(object.id)">
                      <option value="">Export to...</option>
                      <option value="csv">CSV</option>
                      <option value="excel">Excel</option>
                    </select>
                  </div>
                  <div class="col" v-if="object.status !== 'Completed'">
                    <button @click="complete(object.id)" class="btn btn-sm btn-primary">Complete</button>
                  </div>
                  <div class="col">

                  </div>
                </div>
                </div>
            </div>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody :key="item.id" v-for="item in object.items">
                <tr>
                    <td>{{item.item.category_name}}</td>
                    <td>{{item.item.item_name}}</td>
                    <td>{{item.quantity}}</td>
                    <td>
                      <span v-if="item.unit_price" :id="`cPrice${item.id}`">GHS {{item.unit_price}}</span>
                      <span>
                        <input type="number" :id="`id_price${item.id}`" hidden="hidden" class="form-control">
                      </span>
                      </td>
                    <td ><span v-if="item.total_amount">GHS {{item.total_amount}}</span></td>
                    <td>
                      <button :id="`id_edit${item.id}`" @click="show_save(item.id)" class="btn btn-sm btn-success"><i class="large material-icons">create</i></button>
                      <button :id="`id_save${item.id}`" @click="unit_price(object.id, item.id)" hidden="hidden" class="btn btn-sm btn-primary ml-2"><i class="large material-icons">check</i></button>
                      <button :id="`id_clear${item.id}`" hidden="hidden" @click="hide_save(item.id)" class="btn btn-sm btn-warning ml-2"><i class="large material-icons">clear</i></button>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer" align="right">
            <span class="font-weight-bolder">Total = </span> <span>GHS {{object.total_budget}}</span>
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
      type: '',
      // unit_price: '',
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
    show_save(id) {
      document.getElementById(`id_save${id}`).hidden = false;
      document.getElementById(`id_clear${id}`).hidden = false;
      document.getElementById(`id_edit${id}`).hidden = true;
      document.getElementById(`id_price${id}`).hidden = false;
      document.getElementById(`cPrice${id}`).hidden = true;
    },
    hide_save(id) {
      document.getElementById(`id_save${id}`).hidden = true;
      document.getElementById(`id_clear${id}`).hidden = true;
      document.getElementById(`id_edit${id}`).hidden = false;
      document.getElementById(`id_price${id}`).hidden = true;
      document.getElementById(`cPrice${id}`).hidden = false;
    },
    unit_price(unitBudgetId, itemId) {
      console.log(unitBudgetId);
      console.log(itemId);
      const price = document.getElementById(`id_price${itemId}`).value;
      if (price) {
        axios.post(`${config.apiUrl}/budget/bip/${unitBudgetId}/${itemId}/`, {
          price,
        }, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          console.log(res);
          document.getElementById(`id_save${itemId}`).hidden = true;
          document.getElementById(`id_edit${itemId}`).hidden = false;
          document.getElementById(`id_price${itemId}`).hidden = true;
          document.getElementById(`id_clear${itemId}`).hidden = true;
          document.getElementById(`cPrice${itemId}`).hidden = false;
          this.details();
        }).catch((res) => {
          console.log(res);
          this.details();
        });
      }
    },
    exp(unitBudgetId) {
      axios.get(`${config.apiUrl}/budget/eb/${unitBudgetId}/${this.type}/`, {
        responseType: 'blob',
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        // console.log(res);
        if (this.type === 'excel') {
          const url = URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${this.object.unit_name}`);
          document.body.appendChild(link);
          link.click();
        } else {
          const url = URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${this.object.unit_name}.csv`);
          document.body.appendChild(link);
          link.click();
        }
      }).catch((res) => {
        console.log(res);
      });
    },
    complete(id) {
      axios.get(`${config.apiUrl}/budget/cub/${id}/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        console.log(res);
        this.details();
      }).catch((res) => {
        console.log(res);
      });
    },

  },
  mounted() {
    this.details();
  },
  watch: {
    edit() {
      // edit_btn = document.getElementById('id_edit');
    },
  },
};
</script>

