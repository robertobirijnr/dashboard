<template>
  <d-navbar-nav class="border-left flex-row">

    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle text-nowrap px-3" v-d-toggle.user-actions>
      <span class="d-none d-md-inline-block">Sierra Brooks</span>
      </a>
      <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item><i class="material-icons">&#xE7FD;</i> Profile</d-dropdown-item>
        <d-dropdown-item><i class="material-icons">&#xE8B8;</i> Edit Profile</d-dropdown-item>
        <d-dropdown-divider />
        <d-dropdown-item href="#" class="text-danger">
          <i class="material-icons text-danger">&#xE879;</i> Logout
        </d-dropdown-item>
      </d-collapse>
    </li>
  </d-navbar-nav>
</template>

<style>
  .nav-link:hover {
    cursor: pointer;
  }
</style>
