<template>
  <q-page>
    <q-toolbar class="q-mt-lg">
      <q-item-label header class="q-pl-none">Directory</q-item-label>
      <q-space />
      <json-excel :data="contactsArray">
        <q-btn dense class="q-mr-sm" glossy color="primary" label="Download" />
      </json-excel>
      <q-btn
        outline
        label="Add Contact"
        dense
        color="primary"
        @click="addContactDialog = true"
      ></q-btn>
    </q-toolbar>

    <div class="q-mt-md q-pa-sm">
      <div class="row q-mb-lg">
        <q-input
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
          dense
          outlined
          placeholder="Filter Contacts"
          v-model="searchField"
          ref="searchBox"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <q-inner-loading :showing="loading">
        <q-spinner-dots size="50px" color="primary" />
      </q-inner-loading>

      <div class="row item-start q-col-gutter-md">
        <template v-if="loading">
          <contact-loading v-for="i in 4" :key="i"></contact-loading>
        </template>
        <contact-item
          v-for="contact in contactsFiltered"
          :contact="contact"
          :key="contact.id"
        ></contact-item>
      </div>
    </div>

    <q-dialog
      v-model="addContactDialog"
      persistent
      transition-hide="fade"
      transition-show="fade"
      maximized
    >
      <add-contact @close="addContactDialog = false"></add-contact>
    </q-dialog>
  </q-page>
</template>

<script>
import AddContact from '../components/Directory/AddEditContact/AddContact';
import ContactItem from '../components/Directory/ContactItem';
import { mapState, mapActions, mapGetters } from 'vuex';
import JsonExcel from 'vue-json-excel';
import ContactLoading from '../components/Directory/ContactLoading';

export default {
  components: { ContactLoading, AddContact, ContactItem, JsonExcel },
  name: 'PageDirectory',
  computed: {
    ...mapState('contacts', ['search', 'loading', 'error']),
    ...mapGetters('contacts', ['contactsFiltered']),
    searchField: {
      get() {
        return this.search;
      },
      set(val) {
        this.setSearch(val);
      }
    },
    contactsArray() {
      let contactsArray = [];

      Object.keys(this.contactsFiltered).map(key => {
        const contact = {
          id: this.contactsFiltered[key]['id'],
          name: this.contactsFiltered[key]['name'],
          office: this.contactsFiltered[key]['operating_unit']['acronym'],
          email: this.contactsFiltered[key]['email'],
          phone_number: this.contactsFiltered[key]['phone_number']
        };
        contactsArray.push(contact);
      });

      return contactsArray;
    }
  },
  data() {
    return {
      addContactDialog: false
    };
  },
  methods: {
    ...mapActions('contacts', ['fetchContacts', 'setSearch'])
  },
  mounted() {
    this.fetchContacts();

    window.addEventListener('keydown', e => {
      if (e.ctrlKey && e.keyCode === 70) {
        e.preventDefault();
        this.$refs.searchBox.$el.focus();
      }
    });
  }
};
</script>
