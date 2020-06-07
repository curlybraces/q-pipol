<template>
  <q-card style="width:400px;">
    <q-toolbar class="bg-black text-white">
      <q-toolbar-title>
        Transfer Project
      </q-toolbar-title>
      <q-btn icon="close" flat round dense @click="close"></q-btn>
    </q-toolbar>
    <q-item-label header>Transfer project to: </q-item-label>
    <div class="q-pa-sm">
      <q-input
        outlined
        placeholder="Filter Users"
        v-model="filterUsers"
      ></q-input>
    </div>
    <template v-if="$apollo.loading">
      <q-inner-loading :showing="$apollo.loading">
        <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
      </q-inner-loading>
    </template>
    <template v-else>
      <q-option-group
        v-model="user_id"
        :options="filteredOptions"
      ></q-option-group>
    </template>
    <q-card-actions align="right">
      <q-btn outline color="primary" label="Cancel" @click="close"></q-btn>
      <q-btn
        color="primary"
        label="Confirm"
        @click="confirmTransferProject"
        :disable="!user_id"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { FETCH_ENCODERS_QUERY, RELAY_PROJECTS_QUERY } from '@/graphql/queries';
import { TRANSFER_PROJECT_MUTATION } from '@/graphql/mutations';
import { showSuccessNotification } from '@/functions/function-show-notifications';

export default {
  name: 'TransferProject',
  props: ['projectId'],
  apollo: {
    encoders: {
      query: FETCH_ENCODERS_QUERY,
      result({ data }) {
        this.options = data.encoders.map(encoder => {
          const { id, name, operating_unit } = encoder;
          return {
            value: id,
            label: `${name} - ${
              operating_unit ? operating_unit.acronym : 'N/A'
            }`
          };
        });
      }
    }
  },
  computed: {
    filteredOptions() {
      let filteredOptions = [];
      const filterUsers = this.filterUsers;

      if (!filterUsers) {
        filteredOptions = this.options;
      }

      const filterUsersLowerCase = filterUsers.toLowerCase();

      filteredOptions = this.options.filter(option => {
        return option.label.toLowerCase().includes(filterUsersLowerCase);
      });

      return filteredOptions;
    }
  },
  data() {
    return {
      user_id: null,
      options: [],
      filterUsers: ''
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    confirmTransferProject() {
      if (this.user_id) {
        this.$q
          .dialog({
            title: 'Confirm Transfer',
            message:
              'You will no longer be able to access project upon transfer. Continue?',
            cancel: true
          })
          .onOk(() => this.transferProject());
      }
    },
    transferProject() {
      const payload = {
        project_id: this.$props.projectId,
        user_id: this.user_id
      };

      this.$q.loading.show();
      this.$apollo
        .mutate({
          mutation: TRANSFER_PROJECT_MUTATION,
          variables: payload,
          update: (store, { data: { transferProject } }) => {
            const data = store.readQuery({
              query: RELAY_PROJECTS_QUERY,
              variables: {
                first: 10,
                after: ''
              }
            });

            data.relayProjects.edges = data.relayProjects.edges.filter(
              edge => edge.node.id !== transferProject.project.id
            );

            data.relayProjects.pageInfo.total -= 1;

            // save the query
            store.writeQuery({
              query: RELAY_PROJECTS_QUERY,
              variables: {
                after: '',
                first: 10
              },
              data
            });
          }
        })
        .then(({ data }) => {
          showSuccessNotification({
            message: data.transferProject.message
          });
          this.close();
        })
        .catch(err => console.error(err))
        .finally(() => this.$q.loading.hide());
      // implement transfer
      // be sure to remove project from list if successful
    }
  },
  created() {
    console.log('created transfer project');
  }
};
</script>
