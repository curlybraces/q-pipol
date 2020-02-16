<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="row q-col-gutter-x-md">
      <div class="col-3">
        <q-card square>
          <q-item>
            <q-item-section>
              <q-item-label caption>Active Projects</q-item-label>
              <q-item-label>
                <span class="text-weight-bold text-h6">14</span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon name="list" size="xl" color="green-5"></q-icon>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-3">
        <q-card square>
          <q-item>
            <q-item-section>
              <q-item-label caption>Deleted Projects</q-item-label>
              <q-item-label>
                <span class="text-weight-bold text-h6">14</span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon name="delete" size="xl" color="red-5"></q-icon>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-3">
        <q-card square>
          <q-item>
            <q-item-section>
              <q-item-label caption>Deleted Projects</q-item-label>
              <q-item-label>
                <span class="text-weight-bold text-h6">14</span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon name="delete" size="xl" color="red-5"></q-icon>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-3">
        <q-card square>
          <q-item>
            <q-item-section>
              <q-item-label caption>Notifications</q-item-label>
              <q-item-label>
                <span class="text-weight-bold text-h6">14</span>
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

export default {
  components: { PageBreadcrumbs },
  name: "PageIndex",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home"
        }
      ]
    };
  },
  methods: {}
};
</script>
