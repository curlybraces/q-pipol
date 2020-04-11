<template>
  <q-card-section class="q-gutter-md">
    <text-input label="Name" v-model="contact.name"></text-input>
    <text-input label="Designation" v-model="contact.designation"></text-input>
    <single-select
      label="Office"
      v-model="contact.operating_unit_id"
      :options="operating_units"
    ></single-select>
    <text-input label="Email" v-model="contact.email"></text-input>
    <text-input label="Phone No." v-model="contact.phone_number"></text-input>
    <text-input label="Fax No." v-model="contact.fax_number"></text-input>
		<q-btn flat label="Cancel" @click="$emit('close')" />
		<q-btn
				label="Save"
				color="primary"
				icon="save"
				type="submit"
				:loading="loading"
		></q-btn>
  </q-card-section>
</template>

<script>
import { mapState } from 'vuex';
import TextInput from '../../../form-inputs/TextInput';
import SingleSelect from '../../../form-inputs/SingleSelect';

export default {
  name: 'ContactForm',
  components: { SingleSelect, TextInput },
  computed: {
    ...mapState('options', ['operating_units'])
  },
	data() {
  	return {
		  contact: {
			  name: null,
			  designation: null,
			  email: null,
				phone_number: null,
				fax_number: null
			}
		}
	}
};
</script>
