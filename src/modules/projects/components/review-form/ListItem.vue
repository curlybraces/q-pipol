<template>
  <q-list>
    <q-item tag="label" v-for="{ id, name } in options" :key="id">
      <q-item-section avatar>
        <q-checkbox v-model="model" :val="id"></q-checkbox>
      </q-item-section>
      <q-item-section avatar>
        <q-avatar>
          <q-img :src="`statics/${folder}/${id}.${ext}`"></q-img>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ name }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['value', 'options', 'folder', 'ext'],
  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  mounted() {
    console.log(this.$props.value);
  }
};
</script>
