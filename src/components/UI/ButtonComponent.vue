<template>
  <q-btn
    :dense="dense"
    :label="label"
    :icon="icon"
    :flat="flat"
    :round="round"
    @click="$emit('click')"
    :dark="dark"
    :color=" (dark) ? 'info': color "
    :type="type"
  >
  </q-btn>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "ButtonComponent",
    props: {
      label: {
        type: String,
        default: "OK"
      },
      color: {
        type: String,
        default: "primary"
      },
      dense: {
        type: Boolean,
        default: false
      },
      flat: {
        type: Boolean,
        default: false
      },
      round: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: "button"
      },
      icon: {
        type: String,
        default: ""
      }
    },
    computed: {
      ...mapState("settings",["dark"])
    }
  }
</script>
