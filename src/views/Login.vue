<template>
  <div class="home">
   <div class="sidenav">
         <div class="login-main-text">
            <img src="@/assets/images/gra.png"/><br>
            <h2>Welcome To Our Portal, Signin to Perform your Task Now </h2>
         </div>
      </div>
      <div class="main">
         <div class="col-md-8 col-sm-12">
            <div class="login-form">
               <form>
                  <div class="form-group">
                     <input type="text" v-model="username" class="form-control" placeholder="User Name">
                  </div>
                  <div class="form-group">
                     <input type="password" v-model="password" class="form-control" placeholder="Password">
                  </div>
                  <button type="submit"  class="btn btn-black btn-block">Login</button>
               </form>
            </div>
         </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'LOGIN',
  components: {

  },
};
</script>

<style scoped>
body {
    font-family: "Lato", sans-serif;
}

h2{
    color:#fff;
}

.main-head{
    height: 150px;
    background: #FFF;

}

.sidenav {
    height: 100%;
    background-color: #002c59;
    overflow-x: hidden;
    padding-top: 20px;
}


.main {
    padding: 2px 10px;
}

@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
}

@media screen and (max-width: 450px) {
    .login-form{
        margin-top: 10%;
    }


}

@media screen and (min-width: 768px){
    .main{
        margin-left: 40%;
    }

    .sidenav{
        width: 40%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
    }

    .login-form{
        margin-top: 50%;
    }


}


.login-main-text{
    margin-top: 20%;
    padding: 60px;
    color: #fff;
}

.login-main-text h2{
    font-weight: 300;
}

.btn-black{
    background-color: #002c59 !important;
    color: #fff;
}
</style>
