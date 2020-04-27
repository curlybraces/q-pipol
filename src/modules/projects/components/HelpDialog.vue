<template>
  <q-card>
    <q-item-label header>Help</q-item-label>
    <div class="q-pa-md">
      <q-markup-table>
        <thead>
          <th>Field</th>
          <th>Description</th>
        </thead>
        <tbody>
          <tr v-for="({ field, description }, index) in helpItems" :key="index">
            <td class="text-center">{{ field }}</td>
            <td class="text-center">{{ description }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'HelpDialog',
  data() {
    return {
      helpItems: [
        {
          field: 'Title',
          description: 'Title of the program or project'
        },
        {
          field: 'Type',
          description: 'Indicate whether it is a program or project'
        }
      ]
    };
  }
};
</script>
