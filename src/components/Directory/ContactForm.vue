<template>
  <q-form
    class="fit q-pa-sm q-gutter-y-sm"
    greedy
    @submit.prevent="handleAddContact"
    ref="addContactForm"
  >
    <q-toolbar>
			<q-toolbar-title class="text-subtitle1 absolute-center">Create Contact</q-toolbar-title>
			<q-space/>
      <q-btn
				flat
				round
				dense
        icon="close"
        class="cursor-pointer"
        @click="$emit('close')"
      ></q-btn>
    </q-toolbar>
    <q-separator />

		<text-input
			label="Name"
			v-model="contact.name"
			:rules="rules.required"
		></text-input>
		<text-input
			label="Designation"
			v-model="contact.designation"
			:rules="rules.required"
		></text-input>
		<single-select
			label="Office"
			v-model="contact.operating_unit_id"
			:options="operating_units"
			:rules="rules.required"
		></single-select>
		<text-input
			label="Email"
			v-model="contact.email"
			:rules="rules.required"
		></text-input>
		<text-input
			label="Phone No."
			v-model="contact.phone_number"
			:rules="rules.required"
		></text-input>
		<text-input
			label="Fax No."
			v-model="contact.fax_number"
			:rules="rules.required"
		></text-input>

		<div class="absolute-bottom q-pa-sm">
			<q-separator class="q-mb-sm"/>
			<div class="row justify-end q-col-gutter-sm">
				<div class="col">
					<q-btn outline label="Reset" color="primary" @click="handleResetContact" class="full-width" />
				</div>
				<div class="col">
					<q-btn glossy label="Save" color="primary" type="submit" class="full-width" />
				</div>
			</div>
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
    ...mapState('options', ['operating_units'])
  },
  data() {
    return {
      contact: {},
      rules: {
        required: [val => !!val || '* Required']
      }
    };
  },
  methods: {
    ...mapActions('contacts', ['createContact']),
    handleResetContact() {
      this.contact = {};
    },
    handleAddContact() {
      this.$refs.addContactForm.validate().then(success => {
        if (success) {
          console.log('form is valid');
          this.createContact(this.contact);
        } else {
          console.log('form is invalid');
        }
      });
    }
  }
};
</script>
