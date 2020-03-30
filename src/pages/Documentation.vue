<template>
  <q-page class="q-pt-lg">
    <page-title title="Documentation"></page-title>

    <div class="column q-gutter-y-md">
      <div class="row q-pa-sm">
        <q-card class="col q-pa-sm">
          <q-item-label header>Roles</q-item-label>
          <p class="text-caption">
            Users are assigned roles to determine access to data and features in
            the app. Following are the existing roles in the system and their
            corresponding description.
          </p>
          <q-markup-table bordered>
            <thead class="bg-teal text-white">
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </thead>
            <tbody>
              <tr v-for="(role, index) in roles" :key="index">
                <td>{{ role.id }}</td>
                <td>{{ role.name }}</td>
                <td>{{ role.description }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card>
      </div>

      <div class="row q-pa-sm">
        <q-card class="col q-pa-sm">
          <q-item-label header>Common Errors</q-item-label>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
// import gql from 'graphql-tag';
import PageTitle from '../components/PageTitle';

export default {
  components: { PageTitle },
  name: 'PageDocumentation',
  // apollo: {
  //   roles: {
  //       query: gql`query roles {
  //           roles {
  //               id
  //               name
  //               description
  //           }
  //       }`
  //   }
  // },
  data() {
    return {
      roles: [
        {
          id: '1',
          name: 'superadmin',
          description:
            'Changes global settings. Has no access to project module.',
          __typename: 'Role'
        },
        {
          id: '2',
          name: 'admin',
          description:
            'Assigns roles to users. Has no access to project module.',
          __typename: 'Role'
        },
        {
          id: '3',
          name: 'reviewer',
          description: 'Reviews inputs of assigned operating units',
          __typename: 'Role'
        },
        {
          id: '4',
          name: 'encoder',
          description: 'Provides inputs to the sytem',
          __typename: 'Role'
        },
        {
          id: '5',
          name: 'viewer',
          description: 'Views inputs to the sytem',
          __typename: 'Role'
        },
        {
          id: '99',
          name: 'guest',
          description:
            'Default role. Can log in but has no access to project module.',
          __typename: 'Role'
        }
      ]
    };
  }
};
</script>
