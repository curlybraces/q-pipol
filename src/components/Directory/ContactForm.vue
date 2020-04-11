<template>
	<q-form class="q-pa-sm q-gutter-sm" greedy @submit.prevent="handleAddContact" ref="addContactForm">
		<div class="row justify-between">
			Create Contact
			<q-icon
					name="close"
					class="cursor-pointer"
					@click="$emit('close')"
			></q-icon>
		</div>
		<q-separator />
		<text-input label="Name" v-model="contact.name" :rules="rules.required"></text-input>
		<text-input label="Designation" v-model="contact.designation" :rules="rules.required"></text-input>
		<single-select
				label="Office"
				v-model="contact.operating_unit_id"
				:options="operating_units"
				:rules="rules.required"
		></single-select>
		<text-input label="Email" v-model="contact.email" :rules="rules.required"></text-input>
		<text-input label="Phone No." v-model="contact.phone_number" :rules="rules.required"></text-input>
		<text-input label="Fax No." v-model="contact.fax_number" :rules="rules.required"></text-input>
		<q-separator/>
		<div class="row justify-end q-gutter-sm">
			<q-btn flat label="Reset" @click="handleResetContact" />
			<q-btn
				label="Save"
				color="primary"
				type="submit"
			></q-btn>
		</div>
	</q-form>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import TextInput from '../form-inputs/TextInput';
	import SingleSelect from '../form-inputs/SingleSelect';

	export default {
		components: { TextInput, SingleSelect },
		name: 'ContactForm',
		computed: {
			...mapState('options',['operating_units'])
		},
		data() {
			return {
				contact: {},
				rules: {
					required: [ val => !!val || '* Required']
				}
			}
		},
		methods: {
			...mapActions('contacts',['createContact']),
			handleResetContact() {
				this.contact = {}
			},
			handleAddContact() {
				this.$refs.addContactForm.validate().then(success => {
					if (success) {
						console.log('form is valid')
						this.createContact(this.contact);
					} else {
						console.log('form is invalid')
					}
				})
			}
		}
	}
</script>