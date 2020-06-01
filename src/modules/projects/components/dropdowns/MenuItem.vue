<template>
  <q-item
    @click="$emit('click')"
    :disable="disable"
    clickable
    :class="disable ? 'text-red' : void 0"
  >
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ label }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    icon: String,
    label: String,
    disable: {
      type: Boolean,
      default: false
    }
  }
};
</script>
