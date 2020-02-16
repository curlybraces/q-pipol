<template>
	<q-card square flat>

		<card-header>Add Project</card-header>
	
		<card-actions>Actions</card-actions>
	</q-card>
</template>

<script>
export default {
	components: {
		"card-header": () => import("./Shared/CardHeader.vue"),
		"card-actions": () => import("./Shared/CardActions.vue")
	},
	name: "AddProject"
}
</script>