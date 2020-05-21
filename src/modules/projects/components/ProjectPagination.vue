<template>
  <div class="row justify-center q-py-md" v-if="maxPages > 1">
    <q-pagination
      v-model="page"
      :max="max"
      :max-pages="maxPages"
      :direction-links="true"
      :boundary-links="true"
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
    />
  </div>
</template>

<script>
export default {
  name: 'ProjectPagination',
  props: ['value', 'maxPages', 'max'],
  computed: {
    page: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>
