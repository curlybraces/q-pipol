<template>
  <q-input
    filled
    readonly
    type="textarea"
    v-model="value"
    autogrow
    placeholder="No data"
  >
    <template v-slot:append>
      <q-icon
        name="img:statics/icons/content_copy-black-18dp.svg"
        class="cursor-pointer"
        :class="dark ? 'text-white' : 'text-black'"
        v-copy="value"
      ></q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'TextareaCopy',
  props: ['value'],
  computed: {
    dark() {
      const dark = this.$store.getters['settings/dark'];
      return dark;
    }
  }
};
</script>
