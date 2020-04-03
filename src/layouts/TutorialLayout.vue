<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="leftDrawer = !leftDrawer" />
        <q-toolbar-title>
          Investment Programming &amp; Management System
        </q-toolbar-title>
        <q-space />
        <q-separator vertical inset dark></q-separator>
        <q-btn flat stretch class="text-capitalize" to="/">Go to App</q-btn>
      </q-toolbar>
    </q-header>

    <!-- (Optional) The Footer -->
    <q-footer>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="leftDrawer = !leftDrawer" />
        <q-toolbar-title>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawer"
      side="left"
      bordered
      content-class="bg-grey-2"
    >
      <q-item-label header class="text-weight-bold text-uppercase"
        >Manual</q-item-label
      >
      <!-- QScrollArea is optional -->
      <q-list>
        <!-- Content here -->
        <q-item v-for="(link, index) in links" :key="index" :to="link.url">
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'TutorialLayout',
  data() {
    return {
      leftDrawer: true,
      links: [
        {
          title: 'Introduction',
          url: '/manual'
        },
        {
          title: 'Features',
          url: '/manual/features'
        },
        {
          title: 'Getting Started',
          url: '/manual/getting-started'
        }
      ]
    };
  }
};
</script>
