<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Items Requisitions</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header">
            <button :hidden="userRole !== 'UU'" data-target="#newReq" data-toggle="modal" class="btn btn-sm btn-primary">New Request</button>
            <div class="modal fade" id="newReq" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">New Requisition</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                      <label for="id_item">Select Item</label>
                      <select id="id_item" v-model="item" class="custom-select">
                      <option value="">Choose...</option>
                      <option :key="item.id" v-for="item in items" :value="item.id">{{item.item.item_name}}</option>
                    </select>
                    </div>

                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button @click="new_request()" :disabled="loading" type="button" class="btn btn-primary">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">

            <div class="table-responsive" v-if="object_list.length">
              <table class="table table-borderless">
                <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Unit</th>
                  <th>Item</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr :key="object.id" v-for="object in object_list">
                  <td>#{{object.request_id}}</td>
                  <td>{{object.unit.unit_name}}</td>
                  <td>{{object.item.item.item_name}}</td>
                  <td>{{object.status}}</td>
                  <td>
                    <button :hidden="userRole === 'UU' || object.status !== 'Requested'" :disabled="loading" class="btn btn-sm btn-primary" @click="approve(object.id)">Approve</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="card-text" v-else>No requisitions yet!</div>
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
    name: "Requisitions",
    computed: {
      userRole() {
        return this.$root.auth.user.user_role;
      },
    },
    data(){
      return{
        object_list: {},
        item: '',
        items: {},
        loading: false,
      };
    },
    methods: {
      requests(){
        axios.get(`${config.apiUrl}/budget/reqs/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          this.object_list = res.data;
        })
      },
      item_list(){
        axios.get(`${config.apiUrl}/budget/ibs/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          this.items = res.data;
        })
      },
      new_request(){
        this.loading = true;
        axios.post(`${config.apiUrl}/budget/nr/`, {
          item: this.item
        }, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          this.loading = false;
          console.log(res);
          $('#newReq').modal('hide');
        }).catch((res) => {
          console.log(res);
        });
      },
      approve(id){
        this.loading = true;
        axios.post(`${config.apiUrl}/budget/ar/${id}/`, {
          // item: this.item
        }, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          this.loading = false;
          console.log(res);
          this.requests();
          // $('#newReq').modal('hide');
        }).catch((res) => {
          console.log(res);
        });
      }
    },
    mounted(){
      this.requests();
      this.item_list();
    }
  }
</script>

<style scoped>

</style>
