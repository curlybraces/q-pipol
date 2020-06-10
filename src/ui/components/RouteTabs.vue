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
        <template v-for="({ to, label, children }, index) in filteredTabs">
          <q-btn-dropdown
            :key="index"
            auto-close
            stretch
            flat
            label="Projects"
            v-if="children"
            class="text-capitalize"
          >
            <q-list separator>
              <q-item
                v-for="{ id, name, count_projects } in children"
                :key="id"
                clickable
                :to="`/projects/${name}`"
              >
                <q-item-section class="text-capitalize">{{
                  name
                }}</q-item-section>
                <q-item-section avatar side>
                  <q-avatar class="bg-grey-6 text-white" size="sm">{{
                    count_projects
                  }}</q-avatar>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-route-tab
            v-else
            :key="index"
            :to="to"
            :label="$q.screen.gt.xs ? label : void 0"
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
import gql from 'graphql-tag';
// import { PROCESSING_STATUS } from '@/constants/processing_status';

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
  apollo: {
    processing_statuses: {
      query: gql`
        query {
          processing_statuses {
            id
            name
            count_projects
          }
        }
      `,
      variables: {},
      result({ data }) {
        this.tabs.map(tab => {
          if (tab.label === 'Projects') {
            tab.children = data.processing_statuses;
          }
          return tab;
        });
      }
    }
  },
  data() {
    return {
      processing_statuses: [
        { id: 1, name: 'draft', count_projects: 0 },
        { id: 2, name: 'finalized', count_projects: 0 },
        { id: 3, name: 'endorsed', count_projects: 0 },
        { id: 4, name: 'returned', count_projects: 0 },
        { id: 5, name: 'validated', count_projects: 0 },
        { id: 6, name: 'reviewed', count_projects: 0 },
        { id: 7, name: 'accepted', count_projects: 0 },
        { id: 8, name: 'approved', count_projects: 0 },
        { id: 9, name: 'encoded', count_projects: 0 }
      ],
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
          children: []
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
