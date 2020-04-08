<template>
	<q-input
		outlined
		:placeholder="placeholder"
		:type="!passwordVisibility ? 'password' : 'text'"
		v-model="model"
		:rules="rules"
		:label="label"
		stack-label
		class="cursor-pointer"
	>
		<template v-slot:prepend>
			<q-icon name="vpn_key"></q-icon>
		</template>
		<template v-slot:append>
			<q-icon
					:name="!passwordVisibility ? 'visibility' : 'visibility_off'"
					@click="passwordVisibility = !passwordVisibility"
			></q-icon>
		</template>
	</q-input>
</template>

<script>
	export default {
		props: {
			value: {
				type: String,
				default: ''
			},
			showLabel: {
				type: Boolean,
				default: false
			},
			label: {
				type: String,
				default: void 0
			},
			placeholder: {
				type: String,
				required: false,
				default: ''
			},
			rules: {
				type: Array,
				required: false,
				default() {
					return []
				}
			}
		},
		computed: {
			model: {
				get() {
					return this.value;
				},
				set(val) {
					this.$emit('input',val);
				}
			}
		},
		name: 'PasswordInput',
		data() {
			return {
				passwordVisibility: false
			}
		}
	}
</script>