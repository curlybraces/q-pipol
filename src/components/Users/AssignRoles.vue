<template>
  <q-card>
    <div style="width:300px;">
      {{ model }}
      <q-option-group
        v-model="model"
        :options="ROLES"
        color="orange-10"
        type="toggle"
      ></q-option-group>
    </div>
  </q-card>
</template>

<script>
import { ROLES } from "../../data/dropdown-values";

export default {
  name: "AssignRoles",
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      ROLES
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
