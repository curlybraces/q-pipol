<template>
  <q-card>
    <contact-header title="Create Contact"></contact-header>
    <q-separator/>
    <contact-form :contact.sync="contact"></contact-form>
    <contact-actions>
      <q-btn flat label="Cancel" @click="$emit('close')" />
      <q-btn
        label="Save"
        color="primary"
        icon="save"
        @click="addContact"
        :loading="loading"
      ></q-btn>
    </contact-actions>
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
      loading: false
    };
  },
  methods: {
    ...mapActions('contacts', ['createContact']),
    addContact() {
      this.loading = true;
      if (this.contact.name == '') {
        alert('Name is required.');
        this.loading = false;
      } else {
        this.createContact(this.contact).then(() => {
          this.loading = false;
          this.$emit('close');
        });
      }
    }
  }
};
</script>
