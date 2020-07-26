<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">{{object.unit_name}} Unit Budget Details</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
              <li class="nav-item"><a href="#gs" id="gs-tab" data-toggle="tab" class="nav-link active" aria-selected="true">Goods & Services</a></li>
              <li class="nav-item"><a href="#com" id="com-tab" data-toggle="tab" class="nav-link" aria-selected="false">Employees Compensations</a></li>
              <li class="nav-item"><a href="#asset" id="asset-tab" data-toggle="tab" class="nav-link" aria-selected="false">Assets</a></li>
              <li class="nav-item"><a href="#sum" id="sum-tab" data-toggle="tab" class="nav-link" aria-selected="false">Summary</a></li>
            </ul>
          </div>
          <div class="card-body">
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="gs" role="tabpanel" aria-labelledby="gs-tab">
                <div class="row">
                  <div class="col-md-4">
                    <input type="text" name="search" class="form-control" placeholder="Search by item" v-model="search">
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-borderless">
                    <thead>
                    <tr>
                      <th>Category</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Item Price</th>
                      <th>Total Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :key="gs.id" v-for="gs in gs_list">
                      <td>{{gs.item.category_name}}</td>
                      <td>{{gs.item.item_name}}</td>
                      <td>{{gs.quantity}}</td>
                      <td>GHS {{formatPrice(gs.unit_price)}}</td>
                      <td>GHS {{formatPrice(gs.total_amount)}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="com" role="tabpanel" aria-labelledby="com-tab">
                <div class="row">
                  <div class="col-md-4">
                    <input type="text" name="search" class="form-control" placeholder="Search by Staff ID" v-model="search">
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-borderless">
                    <thead>
                    <tr>
                      <th>Staff ID</th>
                      <th>Full Name</th>
                      <th>Category</th>
                      <th>G & N</th>
                      <th>Monthly Basic (GHS)</th>
                      <th>Yearly Basic (GHS)</th>
                      <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :key="staff.id" v-for="staff in com_list">
                      <td>{{staff.staff_number}}</td>
                      <td>{{staff.first_name}} {{staff.last_name}}</td>
                      <td>{{staff.employee_type_display}}</td>
                      <td>{{staff.rank}} & {{staff.notch}}</td>
                      <td>{{formatPrice(staff.monthly_basic)}}</td>
                      <td>{{formatPrice(staff.period_basic)}}</td>
                      <td>{{staff.status}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="asset" role="tabpanel" aria-labelledby="asset-tab">
                <div class="row">
                  <div class="col-md-4">
                    <input type="text" name="search" class="form-control" placeholder="Search by asset name" v-model="search">
                  </div>
                </div>
                <div class="list-group list-group-flush">
                  <div class="list-group-item" :key="asset.id" v-for="asset in asset_list">
                    <div class="row">
                      <div class="col">{{asset.asset.asset_name}}</div>
                      <div class="col" align="right">GHS {{formatPrice(asset.amount)}}</div>
                    </div>
                  </div>

                </div>
              </div>
              <div class="tab-pane fade" id="sum" role="tabpanel" aria-labelledby="sum-tab">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th>Items</th>
                      <th>Amount Totals (GHS)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Consolidated Basic Salary</td>
                      <td>{{formatPrice(object.consolidated_basic_salary)}}</td>
                    </tr>
                    <tr>
                      <td>Allowances</td>
                      <td>{{formatPrice(object.allowances)}}</td>
                    </tr>
                    <tr>
                      <td>Conpensation Summary</td>
                      <td>{{formatPrice(object.employees_compensation_total)}}</td>
                    </tr>
                    <tr>
                      <td>Goods and Services</td>
                      <td>{{formatPrice(object.goods_services_total)}}</td>
                    </tr>
                    <tr>
                      <td>Assets</td>
                      <td>{{formatPrice(object.asset_total)}}</td>
                    </tr>
                    <tr>
                      <th>Budget Total</th>
                      <th>{{formatPrice(object.total_budget)}}</th>
                    </tr>
                    </tbody>
                  </table>
                </div>
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
import config from '../../config';

export default {
  name: 'ImplementDetails',
  data() {
    return {
      object: {},
      search: '',
    };
  },
  computed: {
    gs_list() {
      return this.object.items.filter(post => post.item.item_name.toLowerCase().includes(this.search.toLowerCase()));
    },
    com_list() {
      return this.object.employees_compensations.filter(post => post.staff_number.toLowerCase().includes(this.search.toLowerCase()));
    },
    asset_list() {
      return this.object.assets.filter(post => post.asset.asset_name.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace(',', '.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    details() {
      const budget_id = this.$route.params.budget_id;
      axios.get(`${config.apiUrl}/budget/ubds/${budget_id}`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        this.object = res.data;
      });
    },
  },
  mounted() {
    this.details();
  },
};
</script>

<style scoped>

</style>
