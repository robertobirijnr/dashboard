<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Salary Scale</h3>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="card mb-4 h-100">
          <div class="card-header">
            <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
              New Salary Scale
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Add Salary Scale</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="text-danger small" v-if="msg">
                      {{msg.detail}}
                      <hr>
                    </div>
                    <div class="form-group">
                      <label for="id_rank">Grade</label>
                      <select id="id_rank" v-model="grade" class="custom-select">
                        <option value="">Choose...</option>
                        <option value="CG">CG</option>
                        <option value="COMM">COMM</option>
                        <option value="DC">DC</option>
                        <option value="AC">AC</option>
                        <option value="CRO">CRO</option>
                        <option value="PRO">PRO</option>
                        <option value="SRO">SRO</option>
                        <option value="RO">RO</option>
                        <option value="ARO I">ARO I</option>
                        <option value="ARO II">ARO II</option>
                        <option value="RA I">RA I</option>
                        <option value="RA II">RA II</option>
                        <option value="RA III">RA III</option>
                        <option value="JRA I">JRA I</option>
                        <option value="JRA II">JRA II</option>
                        <option value="JRA III">JRA III</option>
                        <option value="JRA IV">JRA IV</option>
                        <option value="JRA V">JRA V</option>
                        <option value="JRA VI">JRA VI</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for="id_notch">Notch</label>
                      <select id="id_notch" v-model="notch" class="custom-select">
                        <option value="">Choose...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="id_level">Scale Level</label>
                      <select id="id_level" v-model="level" class="custom-select">
                        <option value="">Choose...</option>
                        <option value="Mgt">Management Staff</option>
                        <option value="Snr">Senior Staff</option>
                        <option value="Jnr">Junior Staff</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="id_basic">Monthly Basic (GHS)</label>
                      <input type="number" id="id_basic" v-model="basic" class="form-control">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" :disabled="loading" @click="new_scale()" class="btn btn-primary">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive" v-if="object_list">
              <table class="table">
                <thead>
                <tr>
                  <th>Grade</th>
                  <th>Level</th>
                  <th>Notch</th>
                  <th>Monthly Basic</th>
                </tr>
                </thead>
                <tbody>
                  <tr :key="object.id" v-for="object in object_list">
                    <td>{{object.grade}}</td>
                    <td>{{object.level_display}}</td>
                    <td>{{object.notch}}</td>
                    <td>GHS {{Number(object.monthly_basic).toLocaleString()}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span v-else>Nothing to show here</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import config from '@/config';


  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  export default {
    data(){
      return{
        object_list: {},
        loading: false,
        grade: '',
        notch: '',
        basic: '',
        level: '',
        msg: {},
      };
    },
    mounted() {
      this.scales();
    },
    methods: {
      scales(){
        this.loading = true;

        axios.get(`${config.apiUrl}/budget/sss/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          this.loading = false;
          this.object_list = res.data;
        }).catch((res) => {
          this.loading = false;
          console.log(res);
        });
      },
      new_scale(){
        this.loading = true;
        axios.post(`${config.apiUrl}/budget/nss/`, {
          grade: this.grade,
          notch: this.notch,
          basic: this.basic,
          level: this.level,
        }, {
          headers: {Authorization: `JWT ${config.get_token()}`}
        }).then((res) => {
          this.loading = false;
          console.log(res);
          this.scales();
          this.grade = '';
          this.notch = '';
          this.basic = '';
          this.level = '';
          this.msg = null;
          $('#exampleModalCenter').modal('hide');
        }).catch(({response}) => {
          this.loading = false;
          this.msg = response.data;
        })
      }
    }
  }
</script>
<style scoped>
.modal{
   overflow: visible !important;
}
.list-group-item, .list-group-item:hover{ z-index: auto; }
</style>
