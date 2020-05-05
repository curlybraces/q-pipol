<template>
	<div class="row q-pa-sm justify-center">
    <q-input
      class="col"
      outlined
      :placeholder="placeholder"
      v-model="searchField"
      :debounce="500"
      :rules="[val => !!val >= 3 || 'Please enter something.']"
      lazy-rules
      dense
    >
      <template v-slot:prepend>
        <q-icon name="search"></q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
	export default {
		name: 'SearchComponent',
		props: ['value','placeholder'],
		computed: {
			searchField: {
				get() {
					return this.$props.value
				},
				set(val) {
					this.$emit('input',val)
				}
			}
		}
	}
</script>