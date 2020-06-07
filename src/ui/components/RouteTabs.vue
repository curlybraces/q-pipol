<template>
  <div
    class="row"
    :class="dark ? 'bg-accent text-white' : 'bg-white text-grey-9'"
  >
    <div
      class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
    >
      <q-tabs
        align="left"
        :class="dark ? 'bg-accent text-white' : 'bg-white text-grey-9'"
      >
        <template
          v-for="({ to, label, icon, children }, index) in filteredTabs"
        >
          <q-btn-dropdown
            :key="index"
            auto-close
            stretch
            flat
            label="Projects"
            v-if="children"
            class="text-capitalize"
          >
            <q-list>
              <q-item
                v-for="(value, name) in children"
                :key="value"
                clickable
                :to="`/projects/${name}`"
              >
                <q-item-section class="text-capitalize">{{ name }}</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-route-tab
            v-else
            :key="index"
            :to="to"
            :label="$q.screen.gt.xs ? label : void 0"
            :icon="$q.screen.lt.md ? icon : void 0"
            class="text-capitalize"
            exact
          >
          </q-route-tab>
        </template>
      </q-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { PROCESSING_STATUS } from '@/constants/processing_status';

export default {
  name: 'RouteTabs',
  computed: {
    ...mapState('settings', ['dark']),
    isAdmin() {
      return this.$store.getters['auth/isAdmin'];
    },
    filteredTabs() {
      // This function hides the users tab if the user is not admin or superadmin
      let filteredTabs = [];

      if (this.isAdmin) {
        filteredTabs = this.tabs;

        return filteredTabs;
      }

      filteredTabs = this.tabs.filter(tab => tab.label !== 'Users');

      return filteredTabs;
    }
  },
  data() {
    return {
      processing_statuses: [],
      tabs: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          to: '/dashboard'
        },
        {
          label: 'Projects',
          icon: 'storage',
          to: '/projects',
          children: PROCESSING_STATUS
        },
        {
          label: 'Directory',
          icon: 'phone',
          to: '/directory'
        },
        {
          label: 'Profile',
          icon: 'tune',
          to: '/profile'
        },
        {
          label: 'Users',
          icon: 'lock',
          to: '/admin'
        }
      ]
    };
  }
};
</script>
