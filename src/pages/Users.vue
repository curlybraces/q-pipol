<template>
  <q-page padding>
    <q-list separator>
      <q-item-label header class="text-uppercase">Users</q-item-label>
      <ApolloQuery
        :query="require('src/graphql/queries/users.gql')"
        :variables="{ page: page }"
      >
        <pre>{{ result }}</pre>
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <q-item v-if="isLoading">
            <q-inner-loading :showing="isLoading == 1">
              <q-spinner-gears size="25px" color="primary" />
            </q-inner-loading>
          </q-item>
          <template v-else>
            <q-item
              v-for="{ id, name, email, active } in data.users.data"
              :key="id"
            >
              <q-item-section avatar>
                <q-avatar
                  class="text-white text-uppercase"
                  :color="active ? 'primary' : 'grey'"
                >
                  {{ name ? name.charAt(0) : "?" }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-uppercase">{{ name }} </q-item-label>
                <q-item-label caption>{{ email }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="row q-gutter-sm">
                  <q-btn
                    round
                    :icon="active ? 'block' : 'how_to_reg'"
                    flat
                    :color="active ? 'red' : 'green'"
                    @click.stop="showActivateDialog(id, active)"
                  >
                    <q-tooltip>
                      {{ active ? "Deactivate" : "Activate" }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    round
                    icon="settings"
                    flat
                    color="grey-7"
                    @click="showDialogAssignRoles(id)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </template>
        </template>
      </ApolloQuery>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "PageUsers",
  data() {
    return {
      page: 1
    };
  }
};
</script>
