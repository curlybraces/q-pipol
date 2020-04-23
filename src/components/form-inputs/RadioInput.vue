<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }}</span>
    <q-option-group
      type="radio"
      :options="recodedOptions"
      v-model="model"
      inline
    >
    </q-option-group>
  </div>
</template>

<script>
export default {
  name: 'RadioInput',
  props: ['value', 'options', 'label', 'recode'],
  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    recodedOptions() {
      const options = this.$props.options;
      const recode = this.$props.recode;

      if (recode) {
        let recodedOptions = [];

        recodedOptions = options.map(obj => {
          let newObject = {};
          newObject['label'] = obj.name;
          newObject['value'] = obj.id;
          return newObject;
        });

        return recodedOptions;
      }

      return options;
    }
  }
};
</script>
