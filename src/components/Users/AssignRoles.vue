<template>
  <q-card square>
    <div class="text-h6 q-pa-md">Assign Roles</div>
    <q-separator />
    <div style="width:300px;" class="q-pa-md">
      <q-option-group :options="optionRoles" v-model="model" type="checkbox" />
    </div>
    <q-card-actions align="right">
      <q-btn flat label="Cancel" @click="$emit('close')" />
      <q-btn label="Save" color="primary" @click="saveRoles" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AssignRoles",
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      model: []
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
    saveRoles() {
      console.log(this.model);
    }
  },
  mounted() {
    const selected = this.$props.value.map(val => val.id);
    this.model = selected;
  }
};
</script>
