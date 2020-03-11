<template>
  <q-page>
    <page-breadcrumbs :breadcrumbs="breadcrumbs"/>
    <div class="q-pa-sm">
      <q-card>
        <q-card-section>
          <q-toolbar>
            <q-toolbar-title>Activities</q-toolbar-title>
          </q-toolbar>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";
export default {
  name: 'PageActivity',
  components: {PageBreadcrumbs},
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
    }
  }
}
</script>
