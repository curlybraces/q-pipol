<template>
  <q-item>
    <q-item-section avatar>
      <q-checkbox v-model="selected" :val="user.id"></q-checkbox>
    </q-item-section>
    <q-item-section avatar>
      <q-avatar
        class="text-white text-uppercase"
        :color="user.active ? 'primary' : 'grey'"
      >
        {{ user.name.charAt(0) }}
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-uppercase">{{ user.name }} </q-item-label>
      <q-item-label caption>{{ user.email }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <q-badge v-for="role in user.roles" :key="role.id">
          {{ role.name }}
        </q-badge>
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn
        round
        flat
        dense
        icon="verified_user"
        color="green"
        @click="activateUser(user.id, user.active)"
        v-if="!user.active"
      >
        <q-tooltip>Activate User</q-tooltip>
      </q-btn>
      <q-btn
        round
        flat
        dense
        icon="person_add_disabled"
        color="red"
        @click="deactivateUser(user.id)"
        v-else
      >
        <q-tooltip>Deactivate User</q-tooltip>
      </q-btn>
      <q-btn round flat dense icon="settings" @click="assignRoleDialog = true">
        <q-tooltip>Assign Roles</q-tooltip>
      </q-btn>
    </q-item-section>
    <q-dialog
      v-model="assignRoleDialog"
      transition-hide="fade"
      transition-show="fade"
    >
      <assign-roles v-model="user.roles"></assign-roles>
    </q-dialog>
  </q-item>
</template>

<script>
export default {
  components: {
    "assign-roles": () => import("../Users/AssignRoles.vue")
  },
  name: "User",
  props: ["id", "user", "value"],
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  data() {
    return {
      assignRoleDialog: false
    };
  }
};
</script>
