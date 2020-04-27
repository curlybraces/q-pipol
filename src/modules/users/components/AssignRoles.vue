<template>
  <q-card :style="$q.screen.xs ? void 0 : 'width:400px'">
    <q-toolbar class="bg-info text-white">
      <q-toolbar-title class="absolute-center text-subtitle1"
        >Assign Role</q-toolbar-title
      >
      <q-space />
      <q-btn flat round dense icon="close" @click="$emit('close')"></q-btn>
    </q-toolbar>

    <q-separator />

    <div class="q-pa-md">
      <q-item-label class="q-mb-md">Select role to assign to user</q-item-label>
      <q-option-group :options="optionRoles" v-model="model" type="radio" />
    </div>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" @click="$emit('close')" />
      <q-btn
        label="Save"
        color="primary"
        @click="saveRoles"
        :loading="loading"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AssignRoles',
  props: ['id', 'role'],
  data() {
    return {
      panel: 'role',
      model: null,
      loading: false
    };
  },
  computed: {
    ...mapState('options', ['roles']),
    optionRoles() {
      return this.roles.map(role => {
        return { value: role.id, label: role.name };
      });
    }
  },
  methods: {
    ...mapActions('users', ['assignRole']),
    saveRoles() {
      this.loading = true;
      const payload = {
        user_id: this.$props.id,
        role_id: this.model
      };

      this.assignRole(payload).then(() => {
        this.loading = false;
        this.$emit('close');
      });
    }
  },
  mounted() {
    this.model = this.role;
  }
};
</script>
