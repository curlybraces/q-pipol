<template>
  <q-tabs
    align="left"
    :class="dark ? 'bg-grey-9 text-white' : 'bg-white text-grey-9'"
  >
    <template v-for="({ to, label, icon }, index) in tabs">
      <q-route-tab
        :key="index"
        :to="to"
        :label="$q.screen.gt.xs ? label : void 0"
        :icon="$q.screen.lt.md ? icon : void 0"
        class="text-capitalize"
        exact
      />
    </template>
  </q-tabs>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'RouteTabs',
  computed: {
    ...mapState('settings', ['dark'])
  },
  data() {
    return {
      tabs: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          to: '/dashboard'
        },
        {
          label: 'Projects',
          icon: 'storage',
          to: '/projects'
        },
        {
          label: 'Resources',
          icon: 'attach_file',
          to: '/resources'
        },
        {
          label: 'Directory',
          icon: 'phone',
          to: '/directory'
        }
      ]
    };
  }
};
</script>
