<template>
  <q-card style="min-width: 360px">
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>
        Add/Update Submission
      </q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-card-section>
      <q-list>
        <q-item>
          <q-item-section>
            Operating Unit
          </q-item-section>
          <q-item-section>
            <q-select
              :options="operatingUnits"
              v-model="submissionToEdit.operatingUnit"
              emit-value
              map-options />
          </q-item-section>
        </q-item>
        <q-item>
          <q-option-group
            type="checkbox"
            :options="paps"
            v-model="submissionToEdit.submitted"
            ></q-option-group>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn
        color="primary"
        label="Save"
        @click="addSubmission"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState } from "vuex";
import { submissionsRef } from "boot/firebase";
import { Notify } from "quasar";

export default {
  name: "AddEditSubmission",
  props: ["submission"],
  data() {
    return {
      submissionToEdit: {},
      paps: [
        {
          label: "Rice Program",
          value: "rice"
        },
        {
          label: "Corn Program",
          value: "corn"
        },
        {
          label: "Livestock Program",
          value: "livestock"
        },
        {
          label: "High-Value Crops Development Program",
          value: "hvcdp"
        },
        {
          label: "National Fisheries Program",
          value: "fisheries"
        },
        {
          label: "National Organic Agriculture Program",
          value: "organic"
        },
        {
          label: "Halal Food Industry Development Program",
          value: "halal"
        },
        {
          label: "Farm-to-Market Road Development Program",
          value: "fmrdp"
        },
        {
          label: "Special Area for Agricultural Development",
          value: "saad"
        },
        {
          label: "Other Programs",
          value: "otherPrograms"
        },
        {
          label: "Other Projects",
          value: "projects"
        }
      ],
      submitted: [],
      operatingUnit: ""
    }
  },
  computed: {
    ...mapState("operating_units", ["operatingUnits"])
  },
  methods: {
    addSubmission() {
      if (typeof this.submissionToEdit.id === 'undefined') {
        submissionsRef.doc().set(this.submissionToEdit)
          .then(() => {
            Notify.create({
              message: "Successfully added submission."
            })
          })
          .catch(err => {
            Notify.create(err.message);
          });
      }
      else {
        submissionsRef.doc(this.submissionToEdit.id)
          .update({
            submitted: this.submissionToEdit.submitted
          })
          .then(() => {
            Notify.create({
              message: "Successfully updated."
            })
          })
          .catch(err => {
            Notify.create(err.message)
          });
      }
    }
  },
  mounted() {
    this.submissionToEdit = Object.assign({}, this.submission)
  }
};
</script>
