<template>
  <d-container fluid>
    <d-row>
      <!-- Main Sidebar -->
      <main-sidebar :items="sidebarItems" />

      <d-col class="main-content offset-lg-2 offset-md-3 p-0" tag="main" lg="10" md="9" sm="12">

        <!-- Main Navbar -->
        <main-navbar />

        <!-- Content -->
        <NewBudgetPeriod/>

        <!-- Main Footer -->

      </d-col>

    </d-row>
  </d-container>
</template>

<script>
import getSidebarItems from '@/data/sidebar-nav-items';

// Main layout components
import MainNavbar from '@/components/layout/MainNavbar/MainNavbar.vue';
import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue';
import MainFooter from '@/components/layout/MainFooter/MainFooter.vue';
import NewBudgetPeriod from '@/views/newBudgetPeriod.vue';

export default {
  name: 'analytics',
  components: {
    MainNavbar,
    MainSidebar,
    MainFooter,
    NewBudgetPeriod,
  },
  data() {
    return {
      sidebarItems: getSidebarItems(),
    };
  },
};
</script>

