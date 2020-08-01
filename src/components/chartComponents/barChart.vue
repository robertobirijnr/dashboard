<template>
    <div class="card card-small h-100">
         <div class="card-header border-bottom">
      <h6 class="m-0">bar chart</h6>
    </div>
    <div class="card-body d-flex pl-3">
      <chart :chart-data="datacollection"></chart>
    </div>
   <d-card-footer class="border-top">
      <d-row>

      </d-row>
    </d-card-footer>
    </div>
</template>

<script>
import Chart from '../../utils/barChart';

export default {
  components: {
    Chart,
  },
};
</script>
