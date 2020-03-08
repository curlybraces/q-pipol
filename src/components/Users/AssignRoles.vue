<template>
  <q-card square>
    <div class="text-h6 q-pa-md">Assign Roles</div>
    <q-separator />

    <div style="width:300px;" class="q-pa-md">
      <q-option-group :options="optionRoles" v-model="model" type="radio" />
    </div>
    <q-card-actions align="right">
      <q-btn flat label="Cancel" @click="$emit('close')" />
      <q-btn label="Save" color="primary" @click="saveRoles" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AssignRoles",
  props: ["id", "role"],
  data() {
    return {
      model: null
    };
  },
  computed: {
    ...mapState("options", ["roles"]),
    optionRoles() {
      return this.roles.map(role => {
        return { value: role.id, label: role.name };
      });
    }
  },
  methods: {
    ...mapActions("users", ["assignRole"]),
    saveRoles() {
      const payload = {
        user_id: this.$props.id,
        role_id: this.model
      };
      console.log("id: ", this.$props.id, "result: ", this.model);
      this.assignRole(payload);
    }
  },
  mounted() {
    this.model = this.role;
  }
};
</script>
