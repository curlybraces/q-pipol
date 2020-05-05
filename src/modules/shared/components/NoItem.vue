<template>
	<q-banner dense class="q-ma-sm bg-grey-3">
    <template v-slot:avatar>
      <q-icon :name="icon" color="red" />
    </template>
    {{ message }}
    <template v-slot:action>
      <slot name="action"></slot>
    </template>
  </q-banner>
</template>

<script>
	export default {
		name: 'NoItem',
		props: ['icon','message']
	}
</script>