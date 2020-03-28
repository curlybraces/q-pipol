<template>
  <q-page>
    <div class="row q-pa-sm q-col-gutter-x-md q-gutter-y-md">
      <template v-for="(link, index) in links">
        <div class="col-3" :key="index">
          <q-card square fit class="no-margin full-height">
            <q-item clickable :to="link.url" v-ripple>
              <q-item-section class="gt-sm">
                <q-item-label caption>{{ link.label }}</q-item-label>
              </q-item-section>
              <q-separator class="gt-sm" vertical />
              <q-item-section side top>
                <q-icon :name="link.icon" size="xl" :color="link.color" />
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
    data() {
    return {
      operating_unit_id: null,
      district_id: null,
      links: [
        {
          label: 'View Projects',
          icon: 'list',
          url: '/pip',
          color: 'blue'
        },
        {
          label: 'Add Project',
          icon: 'playlist_add',
          url: '/pip/new',
          color: 'green'
        },
        {
          label: 'Deleted Projects',
          icon: 'delete',
          url: '/trash',
          color: 'red'
        },
        {
          label: 'Reports',
          icon: 'bubble_chart',
          url: '/reports',
          color: 'yellow'
        },
        {
          label: 'Resources',
          icon: 'folder_open',
          url: '/resources',
          color: 'amber'
        },
        {
          label: 'Directory',
          icon: 'call',
          url: '/directory',
          color: 'black'
        },
        {
          label: 'Account',
          icon: 'person',
          url: '/account',
          color: 'lime'
        },
        {
          label: 'Settings',
          icon: 'settings',
          url: '/settings'
        }
      ]
    };
  }
};
</script>
