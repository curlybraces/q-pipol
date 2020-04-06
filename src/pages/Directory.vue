<template>
  <q-page class="q-pt-lg">
    <page-title title="Directory">

			<q-btn flat round color="primary" icon="build">
				<q-menu
					transition-show="jump-up"
					transition-hide="jump-up">
					<q-list>
						<json-excel :data="contactsArray">
							<q-item clickable>
								<q-item-section>
									Download
								</q-item-section>
							</q-item>
						</json-excel>
						<q-item clickable @click="addContactDialog = true">
							<q-item-section>
								Add Contact
							</q-item-section>
						</q-item>
						<q-item clickable  @click="importCsvDialog = true">
							<q-item-section>
								Import CSV
							</q-item-section>
						</q-item>
					</q-list>
				</q-menu>
			</q-btn>
    </page-title>

    <div class="q-pa-sm" v-if="contactsFromFile.length">
      <q-table title="Preview" :columns="columns" :data="contactsFromFile">
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="publish"
            label="Save All"
            no-caps
            @click="saveContacts"
          />
        </template>
      </q-table>
    </div>

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

        <template v-if="!loading && !Object.keys(contactsFiltered).length">
          <div>No contacts yet.</div>
        </template>

        <template v-if="!loading">
          <contact-item
            v-for="contact in contactsFiltered"
            :contact="contact"
            :key="contact.id"
          ></contact-item>
        </template>
      </div>
    </div>

    <q-dialog
      v-model="addContactDialog"
      persistent
      transition-hide="fade"
      transition-show="fade"
    >
      <add-contact @close="addContactDialog = false"></add-contact>
    </q-dialog>

    <q-dialog v-model="importCsvDialog">
      <q-card style="width:400px;">
        <div class="row q-pa-sm justify-between">
          Import Directory
          <q-icon name="close" v-close-popup class="cursor-pointer"></q-icon>
        </div>
        <q-card-section>
          <q-file
            v-model="file"
            label="Upload CSV file"
            outlined
            style="max-width: 300px"
						input-class="flex"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn outline @click="uploadCsv">PREVIEW</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import * as Papa from 'papaparse';
import AddContact from '../components/Directory/AddEditContact/AddContact';
import ContactItem from '../components/Directory/ContactItem';
import { mapState, mapActions, mapGetters } from 'vuex';
import JsonExcel from 'vue-json-excel';
import ContactLoading from '../components/Directory/ContactLoading';
import PageTitle from '../components/PageTitle';
import AdminMixins from '../mixins/AdminMixins';

export default {
  components: { PageTitle, ContactLoading, AddContact, ContactItem, JsonExcel },
  name: 'PageDirectory',
  mixins: [AdminMixins],
  computed: {
    ...mapState('contacts', ['search', 'loading', 'error']),
    ...mapGetters('contacts', ['contactsFiltered']),
    ...mapGetters('settings', ['buttonColor']),
    ...mapState('options', ['operating_units']),
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
      file: null,
      addContactDialog: false,
      importCsvDialog: false,
      contactsFromFile: [],
      columns: [
        {
          name: 'name',
          field: 'name',
          label: 'Name'
        },
        {
          name: 'designation',
          field: 'designation',
          label: 'Designation'
        },
        {
          name: 'operating_unit_id',
          field: row => this.getOperatingUnit(row.operating_unit_id),
          label: 'Office'
        },
        {
          name: 'email',
          field: 'email',
          label: 'Email Address'
        },
        {
          name: 'phone_number',
          field: 'phone_number',
          label: 'Phone Number'
        },
        {
          name: 'fax_number',
          field: 'fax_number',
          label: 'Fax Number'
        }
      ]
    };
  },
  methods: {
    ...mapActions('contacts', ['fetchContacts', 'setSearch']),
    getOperatingUnit(id) {
      if (!id) {
        return '';
      } else {
        const ou = this.operating_units.filter(
          operating_unit => operating_unit.id === id
        );
        return ou[0]['name'];
      }
    },
    handleCsvFile(file) {
      // const file = this.$refs.directory.files[0]
      const csv = file;

      if (!csv || csv.type !== 'application/vnd.ms-excel') return;

      const reader = new FileReader();
      reader.readAsText(csv, 'UTF-8');

      reader.onload = evt => {
        const text = evt.target.result;
        const contacts = Papa.parse(text, {
          delimiter: ',',
          newline: '',
          quoteChar: '"',
          header: true,
          skipBlankLines: true
        });
        try {
          this.contactsFromFile = contacts.data;
          this.importCsvDialog = false;
        } catch (e) {
          alert('Sorry, the file does not appear to have valid data');
        }
      };

      reader.onerror = evt => {
        console.log(evt);
      };
    },
    saveContacts() {},
    uploadCsv() {
      // const file = this.$refs.importedCsv.files[0];
      // console.log(file);
      this.handleCsvFile(this.file);
    }
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
