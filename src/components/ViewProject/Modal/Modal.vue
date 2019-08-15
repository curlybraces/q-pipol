<template>
  <q-card :class=" maximized ? '': 'my-card' ">
    <q-card-section class="bg-primary text-white">
      <div class="row">
        <q-btn flat icon="chevron_left" round dense @click="onClick" />
        <div class="text-h6">
          {{ title }}
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-banner class="bg-grey-3 q-mb-md" v-if="hasInformation">
        <template v-slot:avatar>
          <q-icon name="info" color="amber" />
        </template>
        <slot name="information"></slot>
      </q-banner>
      <slot name="content"></slot>
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <q-space />
      <q-btn color="negative" label="Cancel" @click="onClick" />
      <q-btn color="primary" label="Save" @click="saveData" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: String,
    maximized: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    hasInformation() {
      return !!this.$slots.information;
    }
  },
  methods: {
    onClick() {
      this.$emit("close");
    },
    saveData() {
      this.$emit("save");
    }
  }
};
</script>

<style scoped>
  .my-card {
    width: 480px;
    max-width: 80vw;
  }
</style>
