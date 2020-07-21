/* eslint-disable comma-dangle */
<template>
  <div>
    <div class="main-content-container container-fluid px-4">
      <!-- Page Header -->
      <d-row no-gutters class="page-header py-2 pb-4 mb-3 border-bottom">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Overview</span>
          <h3 class="page-title">Set Budget</h3>
        </d-col>
      </d-row>
      <d-col lg="12">
        <d-card class="card-small  py-2 pb-4">
          <d-card-header class="border-bottom">
            <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
              <li class="nav-item"><a href="#home" id="home-tab" data-toggle="tab" class="nav-link active" aria-selected="true">Goods and Services</a></li>
              <li class="nav-item"><a href="#contact" id="contact-tab" data-toggle="tab" class="nav-link" aria-selected="true">Assets</a></li>
            </ul>
          </d-card-header>
          <div class="card-body">
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <center v-if="listLoading">Loading categories...</center>
                <div class="row" v-else>
                  <div class="col-md-4">
                    <ul class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                      <li class=nav-item><a class="nav-link active" id="v-pills-profile-tab"
                                            data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="True">New Category</a></li>

                      <li class="nav-item" :key="object.id" v-for="object in object_list">
                        <a class="nav-link" :id="`v-pills-home${object.id}-tab`" data-toggle="pill"
                           :href="`#v-pills-home${object.id}`" role="tab"
                           :aria-controls="`v-pills-home${object.id}`" aria-selected="true">
                          <div class="row">
                            <div class="col">{{object.name}}</div>
                            <div class="col" align="right">

                              <button type="button" class="btn btn-info btn-sm" data-toggle="modal" :data-target="`#category${object.id}`">
                                <i class="fa fa-close" style="color: white"></i>
                              </button>
                            </div>
                            <div class="modal fade" :id="`category${object.id}`" tabindex="-1" role="dialog" :aria-labelledby="`catLabel${object.id}`" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" :id="`catLabel${object.id}`">Delete {{object.name}}?</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body text-dark">

                                    <p>Are you sure you want to delete this category? All items under this category will not be asociated with any category after deletion.</p>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" @click="delCat(object.id)" class="btn btn-primary">Delete</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                        </a>
                      </li>

                    </ul>
                  </div>
                  <div class="col-md-8">
                    <div class="tab-content" id="v-pills-tabContent" >
                      <div class="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <div class="row mb-4">
                          <div class="col-md-8">
                            <input type="text" v-model="name" placeholder="Add New Category" class="form-control">
                          </div>
                          <div class="col-md-4">
                            <button @click="newCat()" :disabled="loading" class="btn btn-sm btn-primary">
                              <span v-if="loading">Saving...</span><span v-else>Add New Category</span></button>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane fade" :key="object.id" v-for="object in object_list"
                           :id="`v-pills-home${object.id}`" role="tabpanel" :aria-labelledby="`v-pills-home${object.id}-tab`">
                        <div class="list-group-flush">
                          <div class="list-group-item">
                            <div class="row">
                              <div class="col-md-11">
                                <div class="row">
                                  <div class="col-md-3">
                                    <input type="text" v-model="code" placeholder="Code" class="form-control">
                                  </div>
                                  <div class="col-md-4">
                                    <select class="form-control" v-model="item_type">
                                      <option value="">Choose...</option>
                                      <option value="Good">Good</option>
                                      <option value="Service">Service</option>
                                      <option value="Imprest">Imprest</option>
                                    </select>
                                  </div>
                                  <div class="col-md-4"><input type="text" v-model="item_name" placeholder="Item Name" class="form-control"></div>
                                </div>

                              </div>
                              <div class="col-md-1">
                                <button @click="newItem(object.id)" :disabled="loading" class="btn btn-sm btn-primary">
                                  <span v-if="loading" class="material-icons small">cached</span><span v-else class="material-icons small">create</span></button>
                              </div>
                            </div>
                          </div>
                          <div class="list-group-item" :key="item.id" v-for="item in object.items">
                            <div class="row">
                              <div class="col">{{item.item_id}} | {{item.item_type}} | {{item.item_name}}</div>
                              <div class="col" align="right">
                                <!-- <DeleteItem /> -->
                                <button class='btn btn-sm btn-primary'  data-toggle="modal" :data-target="`#item${item.id}`">
                                  <i class="fa fa-close" style="color:white"></i>
                                </button>
                              </div>
                              <div class="modal fade" :id="`item${item.id}`" tabindex="-1" role="dialog" aria-labelledby="itemlabel${item.id}" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel">Delete {{item.item_name}}?</h5>
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div class="modal-body">
                                      Are You sure you want to delete this item? This action is irreversible.
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                      <button type="button" id='id_delete_item' @click="delItem(item.id)" class="btn btn-primary" >Delete</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>


                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <div class="list-group-flush">
                  <div class="list-group-item">
                    <div class="row">
                      <div class="col-md-5">
                        <input type="text" v-model="code" class="form-control" placeholder="Code">
                      </div>
                      <div class="col-md-5">
                        <input type="text" v-model="asset_name" class="form-control" placeholder="Asset Name">
                      </div>
                      <div class="col-md-2">
                        <button class="btn btn-sm btn-primary" :disabled="loading" @click="newAsset()">
                          <i class="material-icons">create</i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="list-group-item" :key="asset.id" v-for="asset in assets">
                    {{asset.asset_id}} | {{asset.asset_name}}
                  </div>
                </div>
              </div>
            </div>

          </div>


        </d-card>
      </d-col>
    </div>
  </div>
</template>
<script>

import axios from 'axios';
import config from '@/config';
import DeleteCategory from '@/components/common/deleteCategory.vue';
import DeleteItem from '@/components/common/deleteItem.vue';

export default {
  name: 'budget',
  components: {
    DeleteCategory,
    DeleteItem,
  },
  data() {
    return {
      object_list: {},
      item_name: '',
      assets: {},
      name: '',
      item_type: '',
      asset_name: '',
      code: '',
      loading: false,
      listLoading: false,
      // showModal: true,

    };
  },
  methods: {
    categories() {
      this.listLoading = true;
      axios.get(`${config.apiUrl}/api/categories/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.listLoading = false;
        this.object_list = response.data;
        // console.log(response.data);
      }).catch(({ response }) => {
        this.listLoading = false;
        console.log(response);
      });
    },
    assets_list() {
      this.listLoading = true;
      axios.get(`${config.apiUrl}/api/assets/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        this.listLoading = false;
        this.assets = res.data;
      }).catch((res) => {
        this.listLoading = false;
        console.log(res);
      });
    },
    newItem(catId) {
      this.loading = true;
      axios.post(`${config.apiUrl}/api/ni/${catId}/`, {
        item_name: this.item_name,
        type: this.item_type,
        code: this.code,
      }, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        this.loading = false;
        console.log(res);
        this.categories();
        this.item_name = '';
        this.code = '';
        this.item_type = '';
      }).catch(({ res }) => {
        this.loading = false;
        console.log(res);
      });
    },
    newCat() {
      if (this.name) {
        this.loading = true;

        axios.post(`${config.apiUrl}/api/nc/`, {
          name: this.name,
        }, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.loading = false;
          this.categories();
          console.log(res);
          this.name = '';
        }).catch(({ res }) => {
          this.loading = false;
          console.log(res);
        });
      }
    },
    newAsset() {
      if (this.asset_name) {
        this.loading = true;
        axios.post(`${config.apiUrl}/api/na/`, {
          name: this.asset_name,
          code: this.code,
        }, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.loading = false;
          this.asset_name = '';
          this.code = '';
          this.assets_list();
          console.log(res);
        }).catch((res) => {
          console.log(res);
        });
      }
    },
    delItem(itemId) {
      axios.post(`${config.apiUrl}/api/di/${itemId}/`, {}, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        // this.showModal = false;
        console.log(res);
        $(`#item${itemId}`).modal('hide');
        this.categories();
      }).catch((res) => {
        console.log(res);
      });
    },
    delCat(catId) {
      axios.post(`${config.apiUrl}/api/dc/${catId}/`, {}, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        console.log(res);
        $(`#category${catId}`).modal('hide');
        this.categories();
      }).catch((res) => {
        console.log(res);
      });
    },
  },
  mounted() {
    this.categories();
    this.assets_list();
  },

};
</script>
<style scoped>
  .modal{
    overflow: visible !important;
  }
  .list-group-item, .list-group-item:hover{ z-index: auto; }
</style>
