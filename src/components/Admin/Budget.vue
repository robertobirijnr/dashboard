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
      <d-col lg="8">
 <d-card class="card-small  py-2 pb-4">
   <d-card-header class="border-bottom">
              <h6 class="m-0"></h6>
            </d-card-header>
      <center>
        <div class="row mb-4">
            <div class="col-md-4">
                <input type="text" v-model="name" placeholder="Add New Category" class="form-control">
            </div>
            <div class="col-md-1">
                <button @click="newCat()" class="btn btn-sm btn-primary">Add New</button>
            </div>
        </div>
      </center>

        <div class="row">
            <div class="col-md-3">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical"  :key="object.id" v-for="object in object_list">
                <a class="nav-link active" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="True">Categories</a>
                <a class="nav-link" :id="`v-pills-home-tab${object.id}`" data-toggle="pill" :href="`#v-pills-home${object.id}`" role="tab" :aria-controls="`v-pills-home${object.id}`" aria-selected="false">{{object.name}}</a>
                <!--  <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
                <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a> -->
                </div>
            </div>
            <div class="col-md-7">
                <div class="tab-content" id="v-pills-tabContent" >
                    <div class="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">Items</div>
                <div class="tab-pane fade" :key="object.id" v-for="object in object_list" :id="`v-pills-home${object.id}`" role="tabpanel" :aria-labelledby="`v-pills-home-tab${object.id}`">
                    <div class="list-group-flush">
                        <div class="list-group-item">
                            <div class="row">
                                <div class="col-md-8">
                                    <input type="text" v-model="item_name" placeholder="Item Name" class="form-control">
                                </div>
                                <div class="col-md-4">
                                    <button @click="newItem(object.id)" class="btn btn-sm btn-primary">Add New</button>
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item" :key="item.id" v-for="item in object.items">{{item.item_name}}</div>
                    </div>

                </div>

                <!-- <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div> -->
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

export default {
  data() {
    return {
      object_list: {},
      item_name: '',
      name: '',

    };
  },
  methods: {
    categories() {
      axios.get(`${config.apiUrl}/api/categories/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.object_list = response.data;
        console.log(response.data);
      }).catch(({ response }) => {
        console.log(response);
      });
    },
    newItem(catId) {
      axios.post(`${config.apiUrl}/api/ni/${catId}/`, {
        item_name: this.item_name,
      }, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        console.log(res);
        this.categories();
        this.item_name = '';
      }).catch(({ res }) => {
        console.log(res);
      });
    },
    newCat() {
      axios.post(`${config.apiUrl}/api/nc/`, {
        name: this.name,
      }, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        this.categories();
        console.log(res);
        this.name = '';
      }).catch(({ res }) => {
        console.log(res);
      });
    },
  },
  mounted() {
    this.categories();
  },

};
</script>
