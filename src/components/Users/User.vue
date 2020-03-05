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
        @click="toggleUserActivation"
        v-if="!user.active"
        :loading="loading"
      >
        <q-tooltip>Activate User</q-tooltip>
      </q-btn>
      <q-btn
        round
        flat
        dense
        icon="person_add_disabled"
        color="red"
        @click="toggleUserActivation"
        :loading="loading"
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
      persistent
    >
      <assign-roles
        v-model="user.roles"
        @close="assignRoleDialog = false"
      ></assign-roles>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from "vuex";

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
  methods: {
    ...mapActions("users", ["activateUser"]),
    toggleUserActivation() {
      const { id, active } = this.$props.user;

      const payload = {
        id: id,
        active: !active
      };

      this.$q
        .dialog({
          title: active ? "Deactivate user" : "Activate user",
          message: "You are about to toggle activation status of user #" + id,
          persistent: true,
          cancel: true,
          transitionShow: "fade",
          transitionHide: "fade"
        })
        .onOk(() => {
          this.loading = true;
          this.activateUser(payload)
            .then(data => console.log(data))
            .finally(() => (this.loading = false));
        });
    }
  },
  data() {
    return {
      assignRoleDialog: false,
      loading: false
    };
  }
};
</script>
