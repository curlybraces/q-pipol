<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <q-card>
      <q-list separator>
        <q-item-label header>User Management</q-item-label>
        <q-separator />
        <q-item v-if="loading">
          <q-inner-loading :showing="loading">
            <q-spinner-gears size="25px" color="primary" />
          </q-inner-loading>
        </q-item>
        <template v-else>
          <q-item v-for="{ id, name, email, active } in users" :key="id">
            <q-item-section avatar>
              <q-avatar
                class="text-white text-uppercase"
                :color="active ? 'primary' : 'grey'"
              >
                {{ name.charAt(0) }}
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-uppercase">{{ name }} </q-item-label>
              <q-item-label caption>{{ email }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="row q-gutter-sm">
                <q-btn
                  :label="active ? 'Deactivate' : 'Activate'"
                  :color="active ? 'red-9' : 'primary'"
                  @click.stop="showActivateDialog(id, active)"
                />
                <q-btn label="Assign Roles" color="blue" />
              </div>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
      <q-separator />
      <q-card-actions align="center">
        <q-pagination
          v-model="currentPage"
          :max="lastPage"
          :input="true"
          @input="loadPage"
        ></q-pagination>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { axiosInstance } from "boot/axios";
import PageBreadcrumbs from "../components/PageBreadcrumbs";

export default {
  components: { PageBreadcrumbs },
  name: "PageAdmin",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Admin"
        }
      ],
      users: null,
      loading: false,
      currentPage: 1,
      lastPage: 1,
      total: null
    };
  },
  methods: {
    showActivateDialog(id, active) {
      this.$q
        .dialog({
          title: "Toggle User Activation",
          message: "You are about to toggle activation status of user #" + id,
          persistent: true,
          cancel: true,
          transitionShow: "fade",
          transitionHide: "fade"
        })
        .onOk(() => {
          // Todo: call user activation here
          axiosInstance
            .post("graphql", {
              query: `mutation activateUser(
                $id:ID!
                $active:Boolean!) {
                activateUser(
                  id: $id
                  active: $active
                  )
              }`,
              variables: {
                id: id,
                active: !active
              }
            })
            .then(() => {
              this.loadUsers({ page: this.currentPage });
            });
        });
    },
    loadUsers({ page = 1 }) {
      this.loading = true;

      axiosInstance
        .post("graphql", {
          query: `query users($page:Int!){
            users (page:$page) {
              data {
                id
                name
                email
                active
              }
              paginatorInfo {
                currentPage
                lastPage
                total
              }
            }
          }`,
          variables: {
            page: page
          }
        })
        .then(res => {
          this.users = res.data.data.users.data;
          const {
            currentPage,
            lastPage,
            total
          } = res.data.data.users.paginatorInfo;
          this.currentPage = currentPage;
          this.lastPage = lastPage;
          this.total = total;
          this.loading = false;
        });
    },
    loadPage() {
      this.loadUsers({ page: this.currentPage });
    }
  },
  created() {
    this.loadUsers({ page: 1 });
  }
};
</script>
