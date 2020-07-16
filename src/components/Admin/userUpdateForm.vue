<template>
  <div>
    <d-container fluid class="main-content-container px-4">

      <!-- Page Header -->
      <d-row no-gutters class="page-header py-2 pb-4 mb-3 border-bottom">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Overview</span>
          <h3 class="page-title">{{object.full_name}} Details</h3>
        </d-col>
      </d-row>

      <d-row >
        <d-col lg="8">
          <d-card class="card-small">
          <!-- Form Example -->
            <d-card-header class="border-bottom">
              <span v-if="object">
                <span v-if="object.is_active"><button @click="status(object.id, 0)" :disabled="loading" class="btn btn-primary btn-sm">Shelve</button></span>
                <span v-else><button @click="status(object.id, 1)" :disabled="loading" class="btn btn-primary btn-sm">Unshelve</button></span>
              </span>

            </d-card-header>
            <d-list-group flush>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col>
                      <d-form-row>
                        <d-col md="12 mb-2">
                          <label for="fePassword">User Role</label>
                          <select name="role" v-model="role" id="id_role"   class="form-control">
                            <option value="">Choose...</option>
                            <option value="AD">Administrator</option>
                            <option value="BO">Budget Officer</option>
                            <option value="UU">Unit User</option>
                            <option value="DU">Department User</option>
                            <option value="PO">Procurement Officer</option>
                            <option value="PH">Procurement Head</option>
                            <option value="CG">Commissioner General</option>
                            <option value="S">Procurement Secretariat</option>
                          </select>
                        </d-col>
                      </d-form-row>

                      <div class="form-group">
                        <label for="id_division">Division</label>
                        <select name="" v-model="division" id="id_division" class="form-control">
                          <option value="">Choose...</option>
                          <option :key="div.id" v-for="div in divisions" :value="`${div.id}`">{{div.name}}</option>
                        </select>
                      </div>

                      <d-form-row>
                        <d-col md="12" class="form-group">
                          <label for="id_depart">Department</label>
                          <select name="depart" v-model="depart" id="id_depart" :disabled="loading" class="form-control">
                            <option value="">Choose...</option>
                            <option :key="dep.id" v-for="dep in departs.departments" :value="`${dep.id}`">{{dep.name}}</option>
                          </select>
                        </d-col>

                      </d-form-row>

                      <d-form-row>
                          <d-col md="12">
                          <label for="id_unit">Unit</label>
                          <select name="unit" v-model="unit" id="id_unit" :disabled="loading" class="form-control">
                            <option value="">Choose...</option>
                            <option :key="un.id" v-for="un in units.units" :value="`${un.id}`">{{un.unit_name}}</option>
                          </select>
                        </d-col>
                      </d-form-row>
                      <div class="pt-3">
                          <button  :disabled="formloading" @click="update(object.id)" class="btn btn-sm btn-primary float-left" type="submit"><span v-if="formloading">Loading..</span> <span v-else>Update</span> </button>
                      </div>

                  </d-col>
                </d-row>
              </d-list-group-item>
            </d-list-group>

          </d-card>
        </d-col>

      </d-row>
    </d-container>
  </div>
</template>
<script>
import axios from 'axios';
import config from '@/config';

export default {
  data() {
    return {
      object: {},
      role: '',
      depart: '',
      unit: '',
      departs: {},
      divisions: {},
      division: '',
      units: {},
      loading: false,
      formloading: false,
    };
  },
  methods: {
    details() {
      this.loading = true;
      const id = this.$route.params.userId;
      axios.get(`${config.apiUrl}/user/u/${id}/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        this.object = res.data;
        this.loading = false;
      }).catch((res) => {
        this.loading = false;
        console.log(res);
      });
    },
    division_list() {
      axios.get(`${config.apiUrl}/api/divisions/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.divisions = response.data;
      }).catch((response) => {
        console.log(response);
      });
    },
    departments(value) {
      axios.get(`${config.apiUrl}/api/dvdl/${value}/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`
        }
      }).then((res) => {
        this.departs = res.data;
      }).catch((res) => {
        console.log(res);
      })
    },
    unit_list(value) {
      // console.log(sel.value);
      if (value) {
        axios.get(`${config.apiUrl}/api/dul/${value}`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((response) => {
          this.units = response.data;
          console.log(response.data);
        }).catch((response) => {
          console.log(response);
        });
      }
    },
    update(id) {
      this.formloading = true;
      axios.post(`${config.apiUrl}/user/edit/${id}/`, {
        role: this.role,
        unit: this.unit,
        div: this.division,
        depart: this.depart,
      }, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        console.log(res);
        this.formloading = false;
        this.details();
      }).catch((res) => {
        this.formloading = false;
        console.log(res);
      });
    },
    status(id, status) {
      this.loading = true;
      axios.get(`${config.apiUrl}/user/s/${id}/${status}/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        console.log(res);
        this.details();
        this.loading = false;
      }).catch((res) => {
        this.loading = false;
        console.log(res);
      });
    },
  },
  mounted() {
    this.details();
    this.division_list();
    this.departments();
    // this.unit_list(),
  },
  watch: {
    object() {
      if (this.object) {
        this.role = this.object.user_type;
        this.depart = this.object.department;
        this.unit = this.object.unit;
        this.division = this.object.division;
      }
    },
    division(value){
      this.division = value;
      if(this.division){ this.departments(this.division);}
    },
    depart(value) {
      this.depart = value;
      if (this.depart) { this.unit_list(this.depart); }
    },
  },

};
</script>
