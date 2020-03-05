<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs"/>
    <directory></directory>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import Directory from "../components/Directory/DirectoryComponent";

export default {
  components: {PageBreadcrumbs,Directory},
  name: "PageDirectory",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
            title: "Directory"
        },
      ]
    }
  }
}
</script>
