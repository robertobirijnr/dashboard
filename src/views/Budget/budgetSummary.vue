<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Budget Summary</h3>
      </div>
    </div>
    <div>
 <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header">
           <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="division-tab" data-toggle="tab" href="#division" role="tab" aria-controls="division" aria-selected="true">Division Budget Summary</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="department-tab" data-toggle="tab" href="#department" role="tab" aria-controls="department" aria-selected="false">Department budget Summary</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="unit-tab" data-toggle="tab" href="#unit" role="tab" aria-controls="unit" aria-selected="false">Unit Budget Summary</a>
            </li>
            </ul>
          </div>
          <div class="card-body">
           <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="division" role="tabpanel" aria-labelledby="division-tab">
                Division Budget Summary
            </div>
            <div class="tab-pane fade" id="department" role="tabpanel" aria-labelledby="department-tab">
                Department budget Summary
            </div>
            <div class="tab-pane fade" id="unit" role="tabpanel" aria-labelledby="unit-tab">
                Department budget Summary
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  </div>
</template>
