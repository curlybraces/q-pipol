<template>
  <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <q-card flat bordered square>
      <q-item>
        <q-item-section avatar>
          <q-avatar class="text-white text-weight-bold" color="orange-10">
            {{ contact.name ? contact.name.charAt(0) : '' }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label
            class="text-weight-bold text-uppercase"
            v-html="$options.filters.searchHighlight(contact.name, search)"
          ></q-item-label>
          <q-item-label>
            {{ contact.designation }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section avatar>
          <q-icon name="domain" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{
              contact.operating_unit
                ? contact.operating_unit.name +
                  ' (' +
                  contact.operating_unit.acronym +
                  ')'
                : null
            }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon name="mail" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ contact.email }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon name="local_phone" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ contact.phone_number }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-card-actions align="right" v-if="admin">
        <q-btn
          flat
          label="Delete"
          icon="delete"
          @click="deleteContactDialog(contact.id)"
          dense
          color="red"
        />
        <q-btn
          outline
          icon="edit"
          label="Edit"
          @click="updateContactDialog = true"
          dense
          color="blue"
        />
      </q-card-actions>

      <q-dialog
        v-model="updateContactDialog"
        persistent
        transition-hide="fade"
        transition-show="fade"
        maximized
      >
        <q-card>
          <contact-header title="Edit Contact"></contact-header>
          <contact-form :contact="contactToEdit"></contact-form>
          <contact-actions>
            <q-btn flat label="Cancel" @click="updateContactDialog = false" />
            <q-btn
              label="Save"
              icon="save"
              @click="updateThisContact"
              color="primary"
              :loading="loading"
            />
          </contact-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ContactForm from './AddEditContact/Shared/ContactForm';
import ContactActions from './AddEditContact/Shared/ContactActions';
import ContactHeader from './AddEditContact/Shared/ContactHeader';
import AdminMixins from '../../mixins/AdminMixins';

export default {
  name: 'ContactItem',
  components: { ContactHeader, ContactActions, ContactForm },
  props: ['contact'],
  mixins: [AdminMixins],
  computed: {
    ...mapState('contacts', ['search'])
  },
  data() {
    return {
      updateContactDialog: false,
      contactToEdit: {},
      loading: false
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
      this.loading = true;
      this.updateContact(this.contactToEdit).then(
        () => (this.updateContactDialog = false)
      );
    }
  },
  filters: {
    searchHighlight(val, search) {
      let searchRegExp = new RegExp(search, 'ig');
      if (val) {
	      return val.replace(searchRegExp, match => {
		      return '<span class="bg-yellow-6">' + match + '</span>';
	      });
			}
      return '';
    }
  },
  mounted() {
    this.contactToEdit = Object.assign({}, this.$props.contact);
  }
};
</script>
