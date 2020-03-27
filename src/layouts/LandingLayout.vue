<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" elevated>
      <q-toolbar class="app-toolbar">
        <q-toolbar-title>
          <q-avatar>
            <img src="statics/app-logo-128x128.png" />
          </q-avatar>
          Investment Programming &amp; Management System
        </q-toolbar-title>
        <q-space />
        <q-btn outline label="Login" to="/login"></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container :class="$q.screen.gt.md ? 'container' : ''">
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-2 text-white"> </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'LandingLayout'
};
</script>

<style>
.app-toolbar {
  height: 70px;
}

.container {
  margin: 20px 200px 0 200px;
}

.app-footer {
  background-color: lightgrey;
}
</style>
