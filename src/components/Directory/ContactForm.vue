<template>
  <q-form
    class="fit q-pa-sm q-gutter-y-sm"
    greedy
    @submit.prevent="handleSubmit"
    ref="addContactForm"
  >
    <q-toolbar>
      <q-toolbar-title class="text-subtitle1 absolute-center">
        {{ title }}
      </q-toolbar-title>
      <q-space />
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

    <div class="overflow-auto">
      <text-input
        label="Name"
        v-model="name"
        :rules="rules.required"
      ></text-input>
      <text-input
        label="Designation"
        v-model="designation"
        :rules="rules.required"
      ></text-input>
      <single-select
        label="Office"
        v-model="operating_unit_id"
        :options="operating_units"
        :rules="rules.required"
      ></single-select>
      <text-input
        label="Email"
        v-model="email"
        :rules="rules.required"
      ></text-input>
      <text-input
        label="Phone No."
        v-model="phone_number"
        :rules="rules.required"
      ></text-input>
      <text-input
        label="Fax No."
        v-model="fax_number"
        :rules="rules.required"
      ></text-input>
    </div>

    <div class="absolute-bottom q-pa-sm">
      <q-separator class="q-mb-sm" />
      <div class="row justify-end q-col-gutter-sm">
        <div class="col">
          <q-btn
            outline
            label="Reset"
            color="primary"
            @click="handleResetContact"
            class="full-width"
          />
        </div>
        <div class="col">
          <q-btn
            glossy
            label="Save"
            color="primary"
            type="submit"
            class="full-width"
            :loading="loading"
          />
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
  props: ['title', 'contact'],
  name: 'ContactForm',
  computed: {
    ...mapState('options', ['operating_units'])
  },
  data() {
    return {
      id: null,
      name: null,
      designation: null,
      operating_unit_id: null,
      email: null,
      phone_number: null,
      fax_number: null,
      loading: false,
      rules: {
        required: [val => !!val || '* Required']
      }
    };
  },
  methods: {
    ...mapActions('contacts', ['createContact']),
    handleResetContact() {
      this.id = null;
      this.name = null;
      this.designation = null;
      this.operating_unit_id = null;
      this.email = null;
      this.phone_number = null;
      this.fax_number = null;
    },
    handleSubmit() {
      this.$refs.addContactForm.validate().then(success => {
        if (success) {
          this.loading = true;

          const payload = {
            id: this.id,
            name: this.name,
            designation: this.designation,
            operating_unit_id: this.operating_unit_id,
            email: this.email,
            phone_number: this.phone_number,
            fax_number: this.fax_number
          };

          this.$emit('submit', payload);
        } else {
          console.log('form is invalid');
        }
      });
    }
  },
  mounted() {
    const {
      id,
      name,
      designation,
      operating_unit_id,
      email,
      phone_number,
      fax_number
    } = this.$props.contact;
    this.id = id;
    this.name = name;
    this.designation = designation;
    this.operating_unit_id = operating_unit_id;
    this.email = email;
    this.phone_number = phone_number;
    this.fax_number = fax_number;
  }
};
</script>
