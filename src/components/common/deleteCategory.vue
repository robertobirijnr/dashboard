<template>
    <div>

<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
  <i class="fa fa-close" style="color:blue"></i>
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Delete Category</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <p>Are you sure you want to perform thos action ?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Delete</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>
