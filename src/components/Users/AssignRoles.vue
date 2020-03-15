<template>
  <q-card square>
    <q-toolbar dense class="bg-primary text-white">
      <q-toolbar-title>
        Assign Role
      </q-toolbar-title>
    </q-toolbar>

    <q-separator />

    <div style="width:300px;" class="q-pa-md">
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
