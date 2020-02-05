<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <div>
      <q-stepper
        v-model="step"
        ref="stepper"
        animated
        active-color="primary"
        header-nav
        :contracted="contracted"
        flat
      >
        <q-step :name="1" prefix="1" title="General Information">
          <div class="text-h6 q-mb-md">General Information</div>
          <q-input outlined label="Project Title"></q-input>
        </q-step>

        <q-step :name="2" prefix="2" title="Infrastructure Information">
          <div class="column q-gutter-y-md">
            <q-card square>Target</q-card>
            <q-card square>Accomplishments</q-card>
          </div>
        </q-step>

        <q-step :name="3" prefix="3" title="Investment Information">
          <div class="column q-gutter-y-md">
            <q-card square>Target</q-card>
            <q-card square>Accomplishments</q-card>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="$refs.stepper.next()"
              color="deep-orange"
              :label="step === 3 ? 'Finish' : 'Continue'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="deep-orange"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";

export default {
  components: { PageBreadcrumbs },
  computed: {
    contracted() {
      return !this.$q.screen.gt.md;
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Projects",
          url: "/projects"
        },
        {
          title: "Create Project"
        }
      ],
      step: 1
    };
  }
};
</script>
