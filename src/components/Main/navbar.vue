<template>
    <div>
     <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #ffbe0b ;">
        <div class="container">
            <img src="@/assets/images/gra.png" alt="">
             <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#"><h4 class="page-title">{{user.full_name}}</h4></a>
            </li>
            <li class="nav-item">
                <span class="nav-link" @click="logout()"><span class="material-icons">
                  refresh
                  </span>logout</span>
            </li>
        </ul>
    </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        </div>
      </nav>
    </div>
</template>
<script>

// import config from '@/config';

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
      this.$router.push('/');
    },
  },

};
</script>
