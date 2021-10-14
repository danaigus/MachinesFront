<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Practical activity</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Machines</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/status" class="nav-link">Status</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/events" class="nav-link">Events</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view class="container"/>
</template>

<style>

</style>
