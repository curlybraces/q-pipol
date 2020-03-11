<template>
  <q-page>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="q-pa-sm">
      <q-card>
        <q-card-section>
          <q-toolbar>
            <q-toolbar-title>Activities</q-toolbar-title>
          </q-toolbar>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <template v-if="!Object.keys(activities).length">
            <q-item>
              <q-item-label>
                Nothing to show.
              </q-item-label>
            </q-item>
          </template>
          <template v-else>
            <q-item v-for="(activity, key) in activities" :key="key">
              <q-item-section avatar>
                <q-avatar color="primary" class="text-white">{{
                  activity.causer.name.charAt(0)
                }}</q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ activity.causer.name }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ activity.description }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{
                  activity.subject ? activity.subject.title : null
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PageBreadcrumbs from "../components/PageBreadcrumbs";

export default {
  name: "PageActivity",
  components: { PageBreadcrumbs },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Activity"
        }
      ]
    };
  },
  computed: {
    ...mapState("activities", ["activities"])
  },
  methods: {
    ...mapActions("activities", ["fetchActivities"])
  },
  mounted() {
    this.fetchActivities();
  }
};
</script>
