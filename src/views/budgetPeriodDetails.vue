<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Budget Details</h3>
      </div>
    </div>

    <!-- Default Light Table -->
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-">
            <div class="card-body">
              <div class="list-group-flush">
                <div class="list-group-item">
                    <div class="row">
                        <div class="col">Period</div>
                        <div class="col" align="right">{{object.period}}</div>
                    </div>
                </div>
                <div class="list-group-item">
                    <div class="row">
                        <div class="col">Start Date</div>
                        <div class="col" align="right">{{object.start_date}}</div>
                    </div>
                </div>
                <div class="list-group-item" v-if="object.period === 'Quarterly'">
                    <div class="row">
                        <div class="col">Quarter</div>
                        <div class="col" align="right">{{object.quarter}}</div>
                    </div>
                </div>
                <div class="list-group-item" v-else-if="object.period === 'Half Year'">
                    <div class="row">
                        <div class="col">Half Year</div>
                        <div class="col" align="right">{{object.half}}</div>
                    </div>
                </div>
                <div class="list-group-item">
                    <div class="row">
                        <div class="col">End Date</div>
                        <div class="col" align="right">{{object.end_date}}</div>
                    </div>
                </div>
                <div class="list-group-item">
                    <div class="row">
                        <div class="col">Status</div>
                        <div class="col" align="right">{{object.status}}</div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card" v-if="userRole === 'BO'">
          <div class="card-header">Unit Budgets</div>
          <div class="card-body">
            <div v-if="object.unit_budgets">
              <div class="list-group-flush" :key="unit.id" v-for="unit in object.unit_budgets">
                <router-link to="" class="list-group-item bg-white text-black list-group-item-action flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{unit.unit_name}}</h5>
                    <!-- <small class="text-muted">3 days ago</small> -->
                  </div>
                  <p class="mb-1 text-black">{{unit.status}}</p>
                  <!-- <small class="text-muted">Donec id elit non mi porta.</small> -->
                </router-link>
              </div>
            </div>
            <div v-else>
              Nothing to show here!
            </div>
          </div>
        </div>
        <div class="card" v-if="userRole === 'UU' && !unit_budget.detail && unit_budget.status != 'Confirmed'">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-6">My Unit Budget </div>
                    <div class="col-md-6" align="right">
                        <button @click="confirm_budget(unit_budget.id)" class="btn btn-icon btn-xs btn-success" title="Confirm your selections">
                            <span>Confirm</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <span :key="item.id" v-for="item in unit_budget.items" style="margin-right:5px">
                            <span class="badge badge-primary" :title="`${item.item.category_name}`" >{{item.item.item_name}} ({{item.quantity}}) <span class="material-icons small" @click="remove_budget_item(unit_budget.id, item.item.id)" >clear</span></span>
                        </span>
                    </div>
                </div>
                <hr>
                <div class="mb-2">Add More?</div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="errors text-danger small" v-if="errors">
                            {{errors.detail}}
                        </div>
                        <div class="form-group">
                            <label for="">Category</label>
                            <select name="category" v-model="category" id="id_category" class="form-control" @change="category_items_list()">
                                <option value="">Select Category</option>
                                <option v-for="category in categories" :key="category.id" :value="`${category.id}`" >{{category.name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="">Items</label>
                            <select name="item" v-model="item" id="id_item" class="form-control">
                                <option value="">Select Item</option>
                                <option v-for="item in items" :key="item.id" :value="`${item.id}`">{{item.item_name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="">Quantity</label>
                            <input type="number" name="quantity" v-model="quantity" id="" class="form-control">
                        </div>
                        <div class="form-group">
                            <button :disabled="formLoading" @click="`${new_budget_item(unit_budget.id)}`" type="submit" class="btn btn-sm btn-block btn-info"><span v-if="formLoading">Saving...</span><span v-else>Submit</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card" v-else-if="userRole === 'UU' && unit_budget.detail">
            <div class="card-header">New Unit Budget</div>
            <div class="card-body">
                <div class="form-group">
                    <label for="">Category</label>
                    <select name="category" v-model="category" id="id_category" class="form-control" @change="category_items_list()">
                        <option value="">Select Category</option>
                        <option v-for="category in categories" :key="category.id" :value="`${category.id}`" >{{category.name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Items</label>
                    <select name="item" v-model="item" id="id_item" class="form-control">
                        <option value="">Select Item</option>
                        <option v-for="item in items" :key="item.id" :value="`${item.id}`">{{item.item_name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Quantity</label>
                    <input type="number" name="quantity" v-model="quantity" id="" class="form-control">
                </div>
                <div class="form-group">
                    <button :disabled="formLoading" @click="`${new_budget()}`" type="submit" class="btn btn-sm btn-block btn-info"><span v-if=formLoading>Saving...</span><span v-else>Submit</span></button>
                </div>
            </div>
        </div>
        <div class="card" v-else-if="userRole === 'UU' && unit_budget.status === 'Confirmed'">
            <div class="card-header">{{unit_budget.unit_name}} Budget Details</div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-stripe">
                        <thead>
                            <tr class="small" align="center">
                                <th>Item</th>
                                <th>Category</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody :key="item.id" v-for="item in unit_budget.items">
                            <tr class="small" align="center">
                                <td>{{item.item.item_name}}</td>
                                <td>{{item.item.category_name}}</td>
                                <td>{{item.quantity}}</td>
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
      object: {},
      categories: {},
      items: {},
      unit_budget: {},
      quantity: '',
      item: '',
      category: '',
      errors: {},
      formLoading: false,
      loading: false,
    };
  },
  computed: {
    userRole() {
      return this.$root.auth.user.user_role;
    },
  },
  mounted() {
    this.details();
    this.category_list();
    this.this_unit_budget();
  },
  methods: {
    details() {
      const id = this.$route.params.period_id;
      axios.get(`${config.apiUrl}/budget/obp/${id}`, {
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
    category_list() {
      axios.get(`${config.apiUrl}/api/categories/`, {
        headers: { Authorization: `JWT ${config.get_token()}` },
      }).then((response) => {
        this.categories = response.data;
        console.log(response);
      });
    },
    category_items_list() {
      const sel = document.getElementById('id_category');
      console.log(sel.value);
      if (sel.value) {
        axios.get(`${config.apiUrl}/api/ci/${sel.value}`, {
          headers: { Authorization: `JWT ${config.get_token()}` },
        }).then((response) => {
          const results = response.data;
          this.items = results.items;
          console.log(this.items);
        });
      }
    },
    this_unit_budget() {
      const id = this.$route.params.period_id;
      axios.get(`${config.apiUrl}/budget/cpub/${id}`, {
        headers: { Authorization: `JWT ${config.get_token()}` },
      }).then((response) => {
        // var results = response.data
        this.unit_budget = response.data;
        console.log(response);
      }).catch(({ response }) => {
        this.unit_budget = response.data;
      });
    },
    new_budget() {
      const id = this.$route.params.period_id;
      if (id && this.item && this.quantity && this.category) {
        this.formLoading = true;
        axios.post(`${config.apiUrl}/budget/nub/`, {
          category: this.category,
          item: this.item,
          quantity: this.quantity,
          budget_period: id,
        }, {
          headers: { Authorization: `JWT ${config.get_token()}` },
        }).then((response) => {
          this.formLoading = false;
          console.log(response.data);
          this.quantity = '';
          this.category = '';
          this.item = '';
          this.this_unit_budget();
        }).catch(({ response }) => {
          this.formLoading = false;
          this.errors = response.data;
          console.log(response.data);
        });
      }
    },
    new_budget_item(ubid) {
      // console.log(ubid);
      if (ubid && this.item && this.quantity) {
        this.formLoading = true;
        axios.post(
          `${config.apiUrl}/budget/nubi/`, {
            ub_id: ubid,
            item: this.item,
            quantity: this.quantity,
          },
          {
            headers: { Authorization: `JWT ${config.get_token()}` },
          },
        ).then((response) => {
          this.formLoading = false;
          console.log(response.data);
          this.quantity = '';
          this.category = '';
          this.item = '';
          this.this_unit_budget();
        }).catch(({ response }) => {
          this.formLoading = false;
          this.errors = response.data;
          console.log(response.data);
        });
      }
    },
    remove_budget_item(ubid, item) {
      axios.post(`${config.apiUrl}/budget/rubi/${ubid}/${item}/`, {}, {
        headers: { Authorization: `JWT ${config.get_token()}` },
      }).then((response) => {
        console.log(response);
        this.this_unit_budget();
      }).catch(({ response }) => {
        console.log(response.data);
      });
    },
    confirm_budget(ubid) {
      axios.post(`${config.apiUrl}/budget/cub/${ubid}/`, {}, {
        headers: { Authorization: `JWT ${config.get_token()}` },
      }).then((response) => {
        console.log(response);
        this.this_unit_budget();
      }).catch(({ response }) => {
        console.log(response.data);
      });
    },
  },

};
</script>
