<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-12 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">{{object.period}} Budget Period Details</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <button class="btn btn-sm btn-primary" @click="period_exporrt(object.id, object.period)">Extract</button>
          </div>
          <div class="card-body">
            <div class="list-group-flush">
              <div class="list-group-item" :key="div.id" v-for="div in divisions">
                <div class="row">
                  <div class="col-md-10">
                    {{div.name}}
                  </div>
                  <div class="col-md-2">
                    <button @click="div_exporrt(object.id, div.id, div.name)" class="btn btn-sm btn-outline-accent mr-2">Extract</button>
                    <a :href="`#div${div.id}`" class="btn btn-sm btn-primary" aria-expanded="false" :aria-controls="`div${div.id}`" data-toggle="collapse" role="button">
                      <i class="fa fa-sort"></i>
                    </a>
                  </div>
                </div>
                <div class="collapse multi-collapse" :id="`div${div.id}`">
                  <div class="list-group-flush">
                    <div class="list-group-item" :key="dep.id" v-for="dep in div.departments">
                      <div class="row">
                        <div class="col-md-10">
                          {{dep.name}}
                        </div>
                        <div class="col-md-2">
                          <button @click="dep_exporrt(object.id, dep.id, dep.name)" class="btn btn-sm btn-outline-accent mr-2">Extract</button>
                          <a :href="`#dep${dep.id}`" class="btn btn-sm btn-primary" aria-expanded="false" :aria-controls="`dep${dep.id}`" data-toggle="collapse" role="button">
                            <i class="fa fa-sort"></i>
                          </a>
                        </div>
                      </div>
                      <div class="collapse multiple-collapse" :id="`dep${dep.id}`">
                        <div class="list-group-flush">
                          <div class="list-group-item" :key="unit.id" v-for="unit in dep.units">
                            <div class="row">
                              <div class="col-md-10">
                                {{unit.unit_name}}
                              </div>
                              <div class="col-md-2">
                                <button @click="unit_exporrt(unit.id, unit.unit_name)" class="btn btn-sm btn-outline-accent mr-2">Extract</button>
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
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import config from '@/config';
  export default {
    name: 'Report Details',
    data(){
      return{
        object: {},
        loading: false,
        divisions: {},
        errors: {},
      };
    },
    methods: {
      period(){
        this.loading = true;
        const slug = this.$route.params.slug;
        axios.get(`${config.apiUrl}/budget/pd/${slug}/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((response) => {
          this.loading = false;
          const results = response.data;
          this.object = results.object;
          this.divisions = results.divisions;
          this.$noty.success('Everything looks great!');
        }).catch(({response}) => {
          this.loading = false;
          console.log(response);
          const errors = response.data;
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }
          this.$noty.error(`Oops! ${errors.detail}!`);
        })
      },
      period_exporrt(pid, period){
        this.$noty.info('Exporting...');
        axios.get(`${config.apiUrl}/budget/exbs/${pid}/`, {
          responseType: 'blob',
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          }
        }).then((res) => {
          const url = URL.createObjectURL(new Blob([res.data], {type: 'application/vnd.ms-excel'}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${period}.xls`);
          document.body.appendChild(link);
          link.click();
          this.$noty.success('Export successful');
        }).catch(({response}) => {
          this.errors = response.data;
          console.log(response);
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${this.errors.detail}`);
          }
        })
      },
      div_exporrt(pid, did, division){
      this.$noty.info('Exporting...');
      axios.get(`${config.apiUrl}/budget/exdvbs/${pid}/${did}`, {
        responseType: 'blob',
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        }
      }).then((res) => {
        const url = URL.createObjectURL(new Blob([res.data], {type: 'application/vnd.ms-excel'}));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${division}.xls`);
        document.body.appendChild(link);
        link.click();
        this.$noty('Export Successful');
      }).catch(({response}) => {
        console.log(response);
        this.errors = response.data;
        if(response.status === 401){
          this.$noty.error(`Oops! Your session has expired.`);
          localStorage.removeItem('auth');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.$router.push('/login');
        }else{
          this.$noty.error(`Oops! ${this.errors.detail}`);
        }
      })
    },
      dep_exporrt(pid, did, department){
        this.$noty.info('Exporting...');
        axios.get(`${config.apiUrl}/budget/exdbs/${pid}/${did}`, {
          responseType: 'blob',
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          }
        }).then((res) => {
          const url = URL.createObjectURL(new Blob([res.data], {type: 'application/vnd.ms-excel'}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${department}.xls`);
          document.body.appendChild(link);
          link.click();
          this.$noty.success('Export successful');
        }).catch(({response}) => {
          const errors = response.data;
          console.log(response);
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${errors.detail}`);
          }
        })
      },
      unit_exporrt(uid, unit){
        this.$noty.info('Extracting...');
        axios.get(`${config.apiUrl}/budget/exub/${uid}/`, {
          responseType: 'blob',
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          }
        }).then((res) => {
          const url = URL.createObjectURL(new Blob([res.data], {type: 'application/vnd.ms-excel'}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${unit}.xls`);
          document.body.appendChild(link);
          link.click();
          this.noty.success('Extracted successfully');
        }).catch(({response}) => {
          console.log(response);
          this.errors = response.data;
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else if(response.status === 400){
            this.$noty.error('Oops! Unit budget not completed yet!');
          }else{
            this.$noty.error(`Oops! ${this.errors.detail}`);
          }
        })
      },
    },
    mounted(){
      this.period();
    }
  }
</script>