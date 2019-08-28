<template>
  <div
    :class="labelClass">
    <slot></slot>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "LabelComponent",
    computed: {
      ...mapState("settings",["dark"]),
      labelClass() {
        if (this.dark) {
          return 'col-3 text-white text-weight-bold gt-sm';
        }
        else {
          return 'col-3 text-primary text-weight-bold gt-sm';
        }
      }
    }
  }
</script>
