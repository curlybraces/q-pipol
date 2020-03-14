<template>
  <q-card style="width:400px;">
    <contact-header title="Edit Contact"></contact-header>
    <contact-form :contact.sync="contactToEdit"></contact-form>
    <contact-actions>
      <q-btn flat label="Cancel" @click="$emit('close')" />
    </contact-actions>
  </q-card>
</template>

<script>
import ContactHeader from './ContactHeader';
import ContactForm from './ContactForm';
import ContactActions from './ContactActions';

export default {
  name: 'UpdateContact',
  components: {
    ContactActions,
    ContactForm,
    ContactHeader
  },
  props: ['contact'],
  data() {
    return {
      contactToEdit: {}
    };
  },
  mounted() {
    this.contactToEdit = Object.assign({}, this.contact);
  }
};
</script>
