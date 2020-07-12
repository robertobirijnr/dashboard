<template>
  <div>
    <d-container fluid class="main-content-container px-4">

      <!-- Page Header -->
      <d-row no-gutters class="page-header py-2 pb-4 mb-3 border-bottom">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Overview</span>
          <h3 class="page-title">Update User</h3>
        </d-col>
      </d-row>

      <d-row >
        <d-col lg="8">
          <d-card class="card-small">
          <!-- Form Example -->
            <d-card-header class="border-bottom">
              <h6 class="m-0">Update User</h6>
            </d-card-header>
            <d-list-group flush>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col>
                      <d-form-row>
                        <d-col md="12">
                          <label for="fePassword">User Role</label>
                          <select name="role" v-model="role" id="id_role" class="form-control">
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

                      <d-form-row>
                        <d-col md="12" class="form-group">
                          <label for="id_depart">Department</label>
                          <select name="depart"  class="form-control">
                            <option value="">Choose...</option>

                          </select>
                        </d-col>

                      </d-form-row>

                      <d-form-row>
                          <d-col md="12">
                          <label for="id_unit">Unit</label>
                          <select name="unit"  class="form-control">
                            <option value="">Choose...</option>

                          </select>
                        </d-col>
                      </d-form-row>
                      <div class="pt-3">
                          <button @click="newUser()" :disabled="formloading" class="btn btn-sm btn-primary float-right" type="submit"><span v-if="formloading">Loading..</span> <span v-else>Update</span> </button>
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
