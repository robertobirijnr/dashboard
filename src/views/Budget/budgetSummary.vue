<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Budget Summary</h3>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-md-12 col-lg-12">
          <div class="card h-100">
            <div class="card-header">
              <button class="btn-sm btn btn-primary">EXCEL</button>
              <!--<ul class="nav nav-tabs" id="myTab" role="tablist">-->
                <!--<li class="nav-item">-->
                  <!--<a class="nav-link active" id="division-tab" data-toggle="tab" href="#division" role="tab" aria-controls="division" aria-selected="true">Division Budget Summary</a>-->
                <!--</li>-->
                <!--<li class="nav-item">-->
                  <!--<a class="nav-link" id="department-tab" data-toggle="tab" href="#department" role="tab" aria-controls="department" aria-selected="false">Department budget Summary</a>-->
                <!--</li>-->
                <!--<li class="nav-item">-->
                  <!--<a class="nav-link" id="unit-tab" data-toggle="tab" href="#unit" role="tab" aria-controls="unit" aria-selected="false">Unit Budget Summary</a>-->
                <!--</li>-->
              <!--</ul>-->
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-sm table-bordered">
                  <thead>
                  <tr align="center">
                    <th :colspan="ubc">{{object.start_date}} - {{object.end_date}} Budget Summary</th>
                  </tr>
                  <tr>
                    <th>Item</th>
                    <th :key="ub.id" v-for="ub in budgets">{{ub.unit_name}}</th>
                    <!--<th>Unit B</th>-->
                    <!--<th>Unit C</th>-->
                    <!--<th>Unit D</th>-->
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th>Compensation Summary</th>
                  </tr>
                  <tr>
                    <td>Consolidated Basic</td>
                    <td :key="ub.id" v-for="ub in budgets">GHS {{ub.consolidated_basic_salary}}</td>

                  </tr>
                  <tr>
                    <td>Allowances</td>
                    <td :key="ub.id" v-for="ub in budgets">GHS {{ub.allowances}}</td>
                  </tr>
                  <tr>
                    <th>Sub Total</th>
                    <td :key="ub.id" v-for="ub in budgets">GHS {{ub.employees_compensation_total}}</td>
                  </tr>
                  <tr>
                    <th>Goods & Services</th>
                  </tr>
                  <!--<tr>-->
                    <!--<td>Travel and Transport</td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>General Cleaning</td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                  <!--</tr>-->
                  <tr>
                    <th>Sub Total</th>
                    <td :key="ub.id" v-for="ub in budgets">GHS {{ub.goods_services_total}}</td>
                  </tr>
                  <tr>
                    <th>Assets</th>
                  </tr>
                  <!--<tr>-->
                    <!--<td>Land</td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                    <!--<td>Office Building</td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                  <!--</tr>-->
                  <tr>
                    <th>Sub Total</th>
                    <td :key="ub.id" v-for="ub in budgets">GHS {{ub.asset_total}}</td>
                  </tr>
                  <tr>
                    <th>Budget Total</th>
                    <td :key="ub.id" v-for="ub in budgets">GHS {{ub.consolidated_basic_salary}}</td>
                  </tr>
                  </tbody>

                </table>
              </div>
              <!--<div class="tab-content" id="myTabContent">-->
                <!--<div class="tab-pane fade show active" id="division" role="tabpanel" aria-labelledby="division-tab">-->
                  <!--Division Budget Summary-->
                <!--</div>-->
                <!--<div class="tab-pane fade" id="department" role="tabpanel" aria-labelledby="department-tab">-->
                  <!--Department budget Summary-->
                <!--</div>-->
                <!--<div class="tab-pane fade" id="unit" role="tabpanel" aria-labelledby="unit-tab">-->
                  <!--Department budget Summary-->
                <!--</div>-->
              <!--</div>-->
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
    data(){
      return {
        object: {},
        budgets: {},
        ubc: '',
      };
    },
    methods: {
      details(){
        const id = this.$route.params.period_id;
        axios.get(`${config.apiUrl}/budget/bs/${id}/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          const results = res.data;
          this.object = results.object;
          this.budgets = results.unit_budgets;
          this.ubc = results.ubc + 1;
        })
      }
    },
    mounted(){
      this.details();
    }
  }
</script>
