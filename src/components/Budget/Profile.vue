<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">User Profile</h3>
      </d-col>
    </d-row>

    <!-- Content -->

    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-head">
            <h4 class="text-center">OBIRI's Profile</h4>
          </div>

          <hr style="margin:5px 0 5px 0;" />
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <b>Full Name</b> : Robert Obiri Jnr
              </li>
              <li class="list-group-item">
                <b>Email</b> : admin@admin.com
              </li>
              <li class="list-group-item">
                <b>Department</b>: Human Resources
              </li>
              <li class="list-group-item">
                <b>Unit</b>: Human Resources
              </li>
              <li class="list-group-item">
                <b>Department</b>: Human Resources
              </li>
               <li class="list-group-item">
                <b>Department</b>: Human Resources
              </li>
              <li class="list-group-item">
                <b>Unit</b>: Human Resources
              </li>
              <li class="list-group-item">
                <b>Department</b>: Human Resources
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card">
          <div class="card-head">
            <h4 class="text-center">Change Passowrd</h4>
          </div>
          <hr>
          <div class="card-body">
            <div class="form-group">
              <label for="oldPassword">Enter Old Password</label>
              <input type="password" class="form-control">
            </div>
            <div class="form-group">
              <label for="oldPassword">Enter New Password</label>
              <input type="password" class="form-control">
            </div>
            <div class="form-group">
              <label for="oldPassword">Confirm New Password</label>
              <input type="password" class="form-control">
            </div>
            <button class="btn btn-primary pull-right">Submit</button>
          </div>
        </div>
      </div>
    </div>


  </d-container>
</template>

<script>
export default {
  name: 'user-profile',
};
</script>

