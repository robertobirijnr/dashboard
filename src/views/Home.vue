<template>
  <div>
    <navbar/>
    <jumbo/>
    <div class="container">
   <cards/>
    </div>
    &nbsp;&nbsp;
    <MainFooter/>
  </div>
</template>

<script>
import navbar from '@/components/Main/navbar.vue';
import jumbo from '@/components/Main/jumbo.vue';
import cards from '@/components/Main/cards.vue';
import MainFooter from '@/components/layout/MainFooter/MainFooter.vue';

export default {
  components: {
    navbar,
    jumbo,
    cards,
    MainFooter,
  },
};
</script>

