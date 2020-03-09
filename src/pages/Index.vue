<template>
  <q-page>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <div class="row q-pa-sm q-col-gutter-x-md">
      <div class="col-3">
        <q-card square fit class="no-margin full-height">
          <q-item>
            <q-item-section>
              <q-item-label caption>Active Projects</q-item-label>
              <q-item-label>
                <span class="text-weight-bold text-h6"> </span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon name="list" size="xl" color="green-5"></q-icon>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-3">
        <q-card square fit class="no-margin full-height">
          <q-item>
            <q-item-section>
              <q-item-label caption>Deleted Projects</q-item-label>
              <q-item-label>
                <span class="text-weight-bold text-h6"> </span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon name="delete" size="xl" color="red-5"></q-icon>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-3">
        <q-card square fit class="no-margin full-height">
          <q-item>
            <q-item-section>
              <q-item-label caption>Messages</q-item-label>
              <q-item-label>
                <span class="text-weight-bold text-h6">14</span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon name="mail_outline" size="xl" color="blue"></q-icon>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-3">
        <q-card square fit class="no-margin full-height">
          <q-item>
            <q-item-section>
              <q-item-label caption>Notifications</q-item-label>
              <q-item-label>
                <span class="text-weight-bold text-h6">
                  {{ JSON.parse(me.unreadNotifications).length }}
                </span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon name="notifications" size="xl" color="grey-5"></q-icon>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import { ALL_PROJECTS_QUERY, ME_QUERY } from "../constants/graphql";

export default {
  components: { PageBreadcrumbs },
  name: "PageIndex",
  apollo: {
    projects: {
      query: ALL_PROJECTS_QUERY,
      variables: {
        page: 1
      }
    },
    me: {
      query: ME_QUERY
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home"
        }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
svg
  margin: 25px;
path
  path
    fill: none
    stroke: #76BF8A
    stroke-width: 3px
</style>
