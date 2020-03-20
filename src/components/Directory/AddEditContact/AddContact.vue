<template>
  <q-card>
    <contact-header title="Create Contact"></contact-header>
    <q-separator />
    <q-form @submit="checkForm" novalidate="true">
      <div class="q-ma-sm q-pa-sm bg-red-1" v-if="errors.length">
        <p>Please check the following.</p>
        <ul>
          <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
      <contact-form :contact.sync="contact"></contact-form>
      <contact-actions>
        <q-btn flat label="Cancel" @click="$emit('close')" />
        <q-btn
          label="Save"
          color="primary"
          icon="save"
          type="submit"
          :loading="loading"
        ></q-btn>
      </contact-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';
import ContactHeader from './Shared/ContactHeader';
import ContactForm from './Shared/ContactForm';
import ContactActions from './Shared/ContactActions';

export default {
  name: 'AddContact',
  components: { ContactActions, ContactForm, ContactHeader },
  data() {
    return {
      contact: {
        name: '',
        designation: '',
        operating_unit_id: '',
        email: '',
        phone_number: '',
        fax_number: ''
      },
      errors: [],
      loading: false
    };
  },
  methods: {
    ...mapActions('contacts', ['createContact']),
    checkForm(e) {
      const { name, designation, operating_unit_id, email, phone_number, fax_number } = this.contact;

      this.errors = [];

      const errors = this.errors;

      if (!name) {
        errors.push('Name is required');
      }

      if (!designation) {
        errors.push('Designation is required');
      }

      if (!operating_unit_id) {
        errors.push('Office is required');
      }

      if (!email) {
        errors.push('Email is required');
      }

      if (!phone_number) {
        errors.push('Phone number is required');
      }

      if (!fax_number) {
        errors.push('Fax number is required');
      }

      if (!errors.length) {
        // alert('form is valid');
        this.addContact();
      }

      e.preventDefault();
    },
    addContact() {
      this.loading = true;

      this.createContact(this.contact).then(() => {
        this.loading = false;
        this.$emit('close');
      });

    }
  }
};
</script>
