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
                <q-item-section class="text-capitalize">
                  {{ name }}
                </q-item-section>
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

export default {
  name: 'RouteTabs',
  props: ['filteredTabs'],
  computed: {
    ...mapState('settings', ['dark'])
  }
};
</script>
