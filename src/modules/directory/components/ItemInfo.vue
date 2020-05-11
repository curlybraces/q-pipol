<template functional>
	<q-item>
		<q-item-section avatar>
			<q-icon :color="props.color" :name="props.icon" />
		</q-item-section>

		<q-item-section>
			<q-item-label>{{ props.label }}</q-item-label>
			<q-item-label caption v-if="props.caption">{{ props.caption }}</q-item-label>
		</q-item-section>
	</q-item>
</template>
