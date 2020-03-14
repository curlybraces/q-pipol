<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar class="text-white text-weight-bold" color="orange-10">{{
        contact.name.charAt(0)
      }}</q-avatar>
    </q-item-section>
    <q-item-section class="col-3">
      <q-item-label
        v-html="$options.filters.searchHighlight(contact.name, search)"
      ></q-item-label>
      <q-item-label>
        {{ contact.designation }}
      </q-item-label>
    </q-item-section>
    <q-item-section class="col-2">
      <q-item-label>
        {{ contact.email }}
      </q-item-label>
    </q-item-section>
    <q-item-section class="col-2">
      <q-item-label> Phone: {{ contact.phone_number }} </q-item-label>
      <q-item-label> Fax: {{ contact.fax_number }} </q-item-label>
    </q-item-section>
    <q-item-section class="col-2">
      <q-item-label>
        {{ contact.operating_unit ? contact.operating_unit.name : null }}
      </q-item-label>
    </q-item-section>
    <q-item-section class="col-2 text-center">
      <q-item-label>
        <q-btn
          flat
          icon="edit"
          @click="updateContactDialog = true"
          dense
          rounded
          color="blue"
        />
        <q-btn
          flat
          icon="delete"
          @click="deleteContactDialog(contact.id)"
          dense
          rounded
          color="red"
        />
      </q-item-label>
    </q-item-section>
    <q-dialog
      v-model="updateContactDialog"
      persistent
      transition-hide="fade"
      transition-show="fade"
    >
      <q-card style="width:400px;">
        <contact-header title="Edit Contact"></contact-header>
        <contact-form :contact="contactToEdit"></contact-form>
        <contact-actions>
          <q-btn flat label="Cancel" @click="updateContactDialog = false" />
          <q-btn
            label="Save"
            icon="save"
            @click="updateThisContact"
            color="primary"
          />
        </contact-actions>
      </q-card>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ContactForm from './AddEditContact/Shared/ContactForm';
import ContactActions from './AddEditContact/Shared/ContactActions';
import ContactHeader from './AddEditContact/Shared/ContactHeader';

export default {
  name: 'ContactItem',
  components: { ContactHeader, ContactActions, ContactForm },
  props: ['contact'],
  computed: {
    ...mapState('contacts', ['search'])
  },
  data() {
    return {
      updateContactDialog: false,
      contactToEdit: {}
    };
  },
  methods: {
    ...mapActions('contacts', ['deleteContact', 'updateContact']),
    deleteContactDialog(id) {
      this.$q
        .dialog({
          title: 'Delete Contact',
          message: 'Are you sure you want to delete this contact?',
          cancel: true,
          transitionShow: 'fade',
          transitionHide: 'fade'
        })
        .onOk(() => {
          this.deleteContact(id);
        });
    },
    updateThisContact() {
      this.updateContact(this.contactToEdit).then(
        () => (this.updateContactDialog = false)
      );
    }
  },
  filters: {
    searchHighlight(val, search) {
      let searchRegExp = new RegExp(search, 'ig');
      return val.replace(searchRegExp, match => {
        return '<span class="bg-yellow-6">' + match + '</span>';
      });
    }
  },
  mounted() {
    this.contactToEdit = Object.assign({}, this.$props.contact);
  }
};
</script>
