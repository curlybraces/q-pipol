<template>
  <div class="q-py-md">
    <div class="row justify-between">
      <div class="title">
        {{ title.toUpperCase() }}
      </div>
      <div class="text-right text-weight-bold">
        <a v-if="!allSelected" @click="selectAll" class="text-green"
          >Select All
        </a>
        <span v-if="selected.length > 0 && !allSelected">|</span>
        <a v-if="selected.length > 0" @click="clearAll" class="text-red">
          Clear</a
        >
      </div>
    </div>
    <q-option-group
      :options="expanded ? options : options.slice(0, 5)"
      type="checkbox"
      class="cb"
      v-model="selected"
      dense
    />
    <a href="#" class="text-weight-bold" @click="expanded = !expanded">
      VIEW {{ expanded ? "LESS" : "MORE" }}
    </a>
  </div>
</template>

<script>
export default {
  name: "FilterMenu",
  props: {
    title: String,
    options: Array
  },
  data() {
    return {
      selected: [],
      expanded: false
    };
  },
  computed: {
    allSelected() {
      let allOptions = [];
      allOptions = this.options.map(({ value }) => {
        return value;
      });
      if (allOptions.length == this.selected.length) {
        return true;
      }
      return false;
    }
  },
  methods: {
    selectAll() {
      this.selected = this.options.map(({ value }) => {
        return value;
      });
      this.expanded = true;
    },
    clearAll() {
      this.selected = [];
      this.expanded = false;
    }
  },
  watch: {
    selected() {
      this.$emit("input", this.selected);
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}

.cb >>> .q-checkbox--dense .q-checkbox__bg {
  border-width: 1px;
}
</style>
