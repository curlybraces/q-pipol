<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="row">
      <q-card square class="col q-mt-sm q-pa-md q-gutter-y-md">
        <ApolloQuery
          :query="require('src/graphql/queries/project.gql')"
          :variables="{ id: $route.params.id }"
        >
          <template slot-scope="{ result: { data }, isLoading }">
            <div v-if="isLoading">Loading</div>
            <pre>{{ data }}</pre>
          </template>
        </ApolloQuery>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";

export default {
  components: {
    PageBreadcrumbs
  },
  name: "ViewProject",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Projects",
          url: "/pip"
        },
        {
          title: "View Project"
        }
      ],
      project: {}
    };
  }
};
</script>
