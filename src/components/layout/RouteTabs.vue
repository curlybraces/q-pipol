<template>
  <div class="row bg-white">
    <div class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12">
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
    </div>
  </div>
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
