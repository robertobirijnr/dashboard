<template>
  <d-navbar-nav class="border-left flex-row">

    <li class="nav-item dropdown">
      <span class="nav-link dropdown-toggle text-nowrap px-3" v-d-toggle.user-actions>
      <span class="d-none d-md-inline-block h6 pt-2">{{user.full_name}}</span>
      </span>
      <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item>
          <router-link to="/home" class="card-link" ><i class="material-icons">&#xE7FD;</i> Apps</router-link>
        </d-dropdown-item>
        <d-dropdown-item><i class="material-icons">&#xE7FD;</i> Profile</d-dropdown-item>
        <d-dropdown-item><i class="material-icons">&#xE8B8;</i> Edit Profile</d-dropdown-item>
        <d-dropdown-divider />
        <d-dropdown-item class="text-danger" >
          <span href="" @click="logout()" ><i class="material-icons text-danger">&#xE879;</i> Logout</span>
        </d-dropdown-item>
      </d-collapse>
    </li>
  </d-navbar-nav>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$root.auth.user;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>

<style>
  .nav-link:hover {
    cursor: pointer;
  }
</style>
