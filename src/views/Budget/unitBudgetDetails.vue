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
              <div class="col">
                <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                  <li class="nav-item"><a href="#home" id="home-tab" data-toggle="tab" class="nav-link active" aria-selected="true">G & S</a></li>
                  <li class="nav-item"><a href="#contact" id="contact-tab" data-toggle="tab" class="nav-link" aria-selected="true">Compensations</a></li>
                  <li class="nav-item"><a href="#profile" id="profile-tab" data-toggle="tab" class="nav-link" aria-selected="true">Assets</a></li>
                  <li class="nav-item"><a href="#about" id="about-tab" data-toggle="tab" class="nav-link" aria-selected="true">Imprests</a></li>
                </ul>
              </div>
              <div class="col" v-if="object.status !== 'Completed'" align="right">
                <span class="badge badge-primary mr-2">{{object.status}}</span>
                <button @click="complete(object.id)" class="btn btn-sm btn-primary">Complete</button>
              </div>
            </div>
          </div>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="card-body">
                <div class="row">
                  <div class="col"></div>
                  <div class="col-md-3" align="right">
                    <div class="row">
                      <div class="col">
                        <select name="" id="" v-model="type" class="form-control" @change="exp(object.id)">
                          <option value="">Export to...</option>
                          <option value="csv">CSV</option>
                          <option value="excel">Excel</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                    <tr>
                      <th>Category</th>
                      <th>Item</th>
                      <th>Item Type</th>
                      <th>Quantity</th>
                      <th>Unit Price (GHS)</th>
                      <th>Total Price (GHS)</th>
                      <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :key="item.id" v-for="item in object.items">
                      <td>{{item.item.category_name}}</td>
                      <td>{{item.item.item_name}}</td>
                      <td>{{item.item.item_type}}</td>
                      <td><span v-if="item.item.item_type === 'Good'">{{item.quantity}}</span></td>
                      <td>
                        <span v-if="item.item.item_type === 'Good'">
                          <span v-if="item.unit_price" :id="`cPrice${item.id}`">GHS {{item.unit_price}}</span>
                          <span>
                            <input type="number" :id="`id_price${item.id}`" hidden="hidden" class="form-control">
                          </span>
                        </span>

                      </td>
                      <!--<td><span v-if="item.item.item_type === 'Good'"></span>{{item.unit_price}}</td>-->
                      <td>
                        <span v-if="item.item.item_type === 'Good'">{{item.total_amount}}</span>
                        <span v-else-if="item.item.item_type === 'Service'">
                          <span v-if="item.total_amount" :id="`total${item.id}`">GHS {{item.total_amount}}</span>
                          <span>
                            <input type="number" :id="`id_total${item.id}`" hidden="hidden" class="form-control">
                          </span>
                        </span>

                      </td>
                      <td>
                        <span v-if="item.item.item_type === 'Good'">
                          <button :id="`id_edit${item.id}`" @click="show_save(item.id)" class="btn btn-sm btn-success"><i class="large material-icons">create</i></button>
                          <button :id="`id_save${item.id}`" :disabled="loading" @click="unit_price(object.id, item.id)" hidden="hidden" class="btn btn-sm btn-primary ml-2"><i class="large material-icons">check</i></button>
                          <button :id="`id_clear${item.id}`" hidden="hidden" @click="hide_save(item.id)" class="btn btn-sm btn-warning ml-2"><i class="large material-icons">clear</i></button>
                        </span>
                        <span v-else-if="item.item.item_type === 'Service'">
                          <button :id="`id_tedit${item.id}`" @click="t_show_save(item.id)" class="btn btn-sm btn-success"><i class="large material-icons">create</i></button>
                          <button :id="`id_tsave${item.id}`" :disabled="loading" @click="total_price(object.id, item.id)" hidden="hidden" class="btn btn-sm btn-primary ml-2"><i class="large material-icons">check</i></button>
                          <button :id="`id_tclear${item.id}`" hidden="hidden" @click="t_hide_save(item.id)" class="btn btn-sm btn-warning ml-2"><i class="large material-icons">clear</i></button>
                        </span>
                      </td>

                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer" align="right">
                <span class="font-weight-bolder">Sub Total = </span> <span>GHS {{object.goods_services_total}}</span>
              </div>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
              <div class="card-body">
                <div class="row">
                  <div class="col"></div>
                  <div class="col-md-3" align="right">
                    <div class="row">
                      <div class="col">
                        <select v-model="type" class="form-control" @change="exp(object.id)">
                          <option value="">Export to...</option>
                          <option value="csv">CSV</option>
                          <option value="excel">Excel</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table mb-0">
                    <thead class="bg-light">
                    <tr>
                      <th scope="col" class="border-0">Staff ID</th>
                      <th scope="col" class="border-0">Name</th>
                      <th scope="col" class="border-0">Position</th>
                      <th scope="col" class="border-0">Category</th>
                      <th scope="col" class="border-0">G & N</th>
                      <th scope="col" class="border-0">Monthly Basic (GHS)</th>
                      <th scope="col" class="border-0">{{object.budget_period}} Basic (GHS)</th>
                      <th scope="col" class="border-0">Status</th>
                      <!--<th scope="col" class="border-0">Actions</th>-->
                    </tr>
                    </thead>
                    <tbody :key="employ.id" v-for="employ in object.employees_compensations">
                    <tr>
                      <td>{{employ.staff_number}}</td>
                      <td>{{employ.first_name}} {{employ.last_name}}</td>
                      <td>{{employ.position}}</td>
                      <td>{{employ.employee_type_display}}</td>
                      <td>{{employ.rank}} & {{employ.notch}}</td>
                      <td>{{employ.monthly_basic}}</td>
                      <td>{{employ.period_basic}}</td>
                      <td>{{employ.status}}</td>
                      <!--<td></td>-->

                      <!--<td>-->
                      <!--<span v-if="item.unit_price" :id="`cPrice${item.id}`">GHS {{item.unit_price}}</span>-->
                      <!--<span>-->
                      <!--<input type="number" :id="`id_price${item.id}`" hidden="hidden" class="form-control">-->
                      <!--</span>-->
                      <!--</td>-->
                      <!--<td ><span v-if="item.total_amount">GHS {{item.total_amount}}</span></td>-->
                      <!--<td>-->
                      <!--<button :id="`id_edit${item.id}`" @click="show_save(item.id)" class="btn btn-sm btn-success"><i class="large material-icons">create</i></button>-->
                      <!--<button :id="`id_save${item.id}`" @click="unit_price(object.id, item.id)" hidden="hidden" class="btn btn-sm btn-primary ml-2"><i class="large material-icons">check</i></button>-->
                      <!--<button :id="`id_clear${item.id}`" hidden="hidden" @click="hide_save(item.id)" class="btn btn-sm btn-warning ml-2"><i class="large material-icons">clear</i></button>-->
                      <!--</td>-->
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer" align="right">
                <span class="font-weight-bolder">Sub Total = </span> <span>GHS {{object.consolidated_basic_salary}}</span>
              </div>

            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="card-body">
                <div class="list-group" :key="asset.id" v-for="asset in object.assets">
                  <div class="list-group-item">
                    <div class="row">
                      <div class="col-md-7">{{asset.asset.asset_name}}</div>
                      <div class="col-md-5" align="right">
                        <d-row>
                          <div class="col-md-7">
                            <span v-if="asset.amount" :id="`amount${asset.id}`">GHS {{asset.amount}}</span>
                            <input type="number" :id="`id_asset${asset.id}`" hidden="hidden" class="form-control">
                          </div>
                          <div class="col-md-5">
                            <button :id="`id_asset_edit${asset.id}`" @click="a_show_save(asset.id)" class="btn mr-1 small btn-sm btn-success"><span class="material-icons small">create</span></button>
                            <button :id="`id_asset_save${asset.id}`" hidden="hidden" @click="asset_amount(object.id, asset.id)" :disabled="loading" class="btn mr-1 small btn-sm btn-primary"><span class="material-icons small">check</span></button>
                            <button :id="`id_asset_clear${asset.id}`" hidden="hidden" @click="a_hide_save(asset.id)" class="btn small btn-sm btn-warning"><span class="material-icons small">clear</span></button>
                          </div>
                        </d-row>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer" align="right">
                <span class="font-weight-bolder">Sub Total = </span> <span>GHS {{object.asset_total}}</span>
              </div>
            </div>
            <div class="tab-pane fade" id="about" role="tabpanel" aria-labelledby="about-tab">
              <div class="card-body">
                <div class="list-group" :key="imprest.id" v-for="imprest in object.imprests">
                  <div class="list-group-item">
                    <div class="row">
                      <div class="col-md-7">{{imprest.imprest.item_name}}</div>
                      <div class="col-md-5" align="right">
                        <d-row>
                          <div class="col-md-7">
                            <input type="text" class="form-control">
                          </div>
                          <div class="col-md-5">
                            <button class="btn mr-1 small btn-sm btn-primary"><span class="material-icons small">create</span></button>
                            <button class="btn mr-1 small btn-sm btn-primary"><span class="material-icons small">create</span></button>
                            <button class="btn small btn-sm btn-primary"><span class="material-icons small">create</span></button>
                          </div>
                        </d-row>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer" >
            <div class="row">
              <div class="col">
                <router-link to="#" class="btn-sm btn btn-warning">Compensation Summary</router-link>
              </div>
              <div class="col" align="right">
                <span class="font-weight-bolder">Total = </span> <span>GHS {{object.total_budget}}</span>
              </div>
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
        type: '',
        loading: false,
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
      t_show_save(id) {
        document.getElementById(`id_tsave${id}`).hidden = false;
        document.getElementById(`id_tclear${id}`).hidden = false;
        document.getElementById(`id_tedit${id}`).hidden = true;
        document.getElementById(`id_total${id}`).hidden = false;
        document.getElementById(`total${id}`).hidden = true;
      },
      t_hide_save(id) {
        document.getElementById(`id_tsave${id}`).hidden = true;
        document.getElementById(`id_tclear${id}`).hidden = true;
        document.getElementById(`id_tedit${id}`).hidden = false;
        document.getElementById(`id_total${id}`).hidden = true;
        document.getElementById(`total${id}`).hidden = false;
      },
      a_show_save(id) {
        document.getElementById(`id_asset_save${id}`).hidden = false;
        document.getElementById(`id_asset_clear${id}`).hidden = false;
        document.getElementById(`id_asset_edit${id}`).hidden = true;
        document.getElementById(`id_asset${id}`).hidden = false;
        document.getElementById(`amount${id}`).hidden = true;
      },
      a_hide_save(id) {
        document.getElementById(`id_asset_save${id}`).hidden = true;
        document.getElementById(`id_asset_clear${id}`).hidden = true;
        document.getElementById(`id_asset_edit${id}`).hidden = false;
        document.getElementById(`id_asset${id}`).hidden = true;
        document.getElementById(`amount${id}`).hidden = false;
      },
      unit_price(unitBudgetId, itemId) {
        // console.log(unitBudgetId);
        // console.log(itemId);
        const price = document.getElementById(`id_price${itemId}`).value;
        if (price) {
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/bip/${unitBudgetId}/${itemId}/`, {
            price,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            this.loading = false;
            console.log(res);
            document.getElementById(`id_save${itemId}`).hidden = true;
            document.getElementById(`id_edit${itemId}`).hidden = false;
            document.getElementById(`id_price${itemId}`).hidden = true;
            document.getElementById(`id_clear${itemId}`).hidden = true;
            document.getElementById(`cPrice${itemId}`).hidden = false;
            this.details();
          }).catch((res) => {
            this.loading = false;
            console.log(res);
            this.details();
          });
        }
      },
      total_price(unitBudgetId, itemId) {
        // console.log(unitBudgetId);
        // console.log(itemId);
        const price = document.getElementById(`id_total${itemId}`).value;
        if (price) {
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/bip/${unitBudgetId}/${itemId}/`, {
            price,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            this.loading = false;
            console.log(res);
            document.getElementById(`id_tsave${itemId}`).hidden = true;
            document.getElementById(`id_tedit${itemId}`).hidden = false;
            document.getElementById(`id_total${itemId}`).hidden = true;
            document.getElementById(`id_tclear${itemId}`).hidden = true;
            document.getElementById(`total${itemId}`).hidden = false;
            this.details();
          }).catch((res) => {
            this.loading = false;
            console.log(res);
            this.details();
          });
        }
      },
      asset_amount(unitBudgetId, assetId) {
        // console.log(unitBudgetId);
        // console.log(itemId);
        const price = document.getElementById(`id_asset${assetId}`).value;
        if (price) {
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/baa/${unitBudgetId}/${assetId}/`, {
            amount: price,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            this.loading = false;
            console.log(res);
            document.getElementById(`id_asset_save${assetId}`).hidden = true;
            document.getElementById(`id_asset_edit${assetId}`).hidden = false;
            document.getElementById(`id_asset${assetId}`).hidden = true;
            document.getElementById(`id_asset_clear${assetId}`).hidden = true;
            document.getElementById(`amount${assetId}`).hidden = false;
            this.details();
          }).catch((res) => {
            this.loading = false;
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

