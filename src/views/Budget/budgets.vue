<template>
  <d-container fluid>
    <d-row>
      <!-- Main Sidebar -->
      <main-sidebar :items="sidebarItems" title="Budget System" />

      <d-col class="main-content offset-lg-2 offset-md-3 p-0" tag="main" lg="10" md="9" sm="12">

        <!-- Main Navbar -->
        <main-navbar />

        <!-- Content -->
        <unitBudgets/>

        <!-- Main Footer -->
        <main-footer />
      </d-col>

    </d-row>
  </d-container>
</template>

<script>
import getSidebarItems from '@/data/budget-sidebar-nav-items';

// Main layout components
import MainNavbar from '@/components/layout/MainNavbar/MainNavbar.vue';
import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue';
import MainFooter from '@/components/layout/MainFooter/MainFooter.vue';
import unitBudgets from '@/views/Budget/unitBudgets.vue';

export default {
  name: 'unit_budget',
  components: {
    MainNavbar,
    MainSidebar,
    MainFooter,
    unitBudgets,
  },
  data() {
    return {
      sidebarItems: getSidebarItems(),
    };
  },
};
</script>

