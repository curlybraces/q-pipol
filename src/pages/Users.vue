<template>
  <q-page padding>
    <q-list separator>
      <q-item-label header class="text-uppercase">Users</q-item-label>
      <q-item v-for="{ id, name, email, active } in users" :key="id">
        <q-item-section avatar>
          <q-avatar
            class="text-white text-uppercase"
            :color="active ? 'primary' : 'grey'"
          >
            {{ name ? name.charAt(0) : '?' }}
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
                {{ active ? 'Deactivate' : 'Activate' }}
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
    </q-list>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PageUsers',
  computed: {
    ...mapState('users', ['users'])
  },
  data() {
    return {
      page: 1
    };
  },
  methods: {
    ...mapActions('users', ['fetchUsers'])
  },
  created() {
    this.fetchUsers();
  }
};
</script>
