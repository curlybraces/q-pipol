<template>
  <q-page padding>
    <div class="row">
      <p>Add Project</p>
      <q-space/>
      <q-btn
        flat round dense
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        @click="$q.fullscreen.toggle()"
        class="q-ml-md"
      />
    </div>

    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
      header-nav
    >
      <q-step
        :name="1"
        title="General Information"
        icon="information"
        :done="step > 1"
      >
        <q-stepper-navigation>

          <input-component
            label="Project Title"
            hint="Project title must match title in budget proposal"></input-component>

          <div class="text-center">
            <q-btn @click="step = 2" color="primary" label="Continue" />
          </div>

        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Spatial Coverage"
        icon="map"
        :done="step > 2"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 3" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Level of Approval"
        icon="settings"
        :done="step > 3"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 4" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Project for Inclusion in Which Programming Document"
        icon="settings"
        :done="step > 4"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 5" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Three Year Rolling Infrastructure Program"
        icon="settings"
        :done="step > 4"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 5" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Philippine Development Plan"
        icon="settings"
        :done="step > 4"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 5" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="0-10 Point Socioeconomic Agenda"
        icon="settings"
        :done="step > 4"
      >
          <q-stepper-navigation>

            <q-btn @click="step = 5" color="primary" label="Continue" />

          </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Sustainable Development Goals"
        icon="settings"
        :done="step > 4"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 5" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Implementation Period"
        icon="settings"
        :done="step > 4"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 5" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Project Preparation Details"
        icon="settings"
        :done="step > 4"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 5" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Pre-Construction Costs"
        icon="settings"
        :done="step > 4"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 5" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
              :name="4"
              title="Employment Generation"
              icon="settings"
              :done="step > 4"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 5" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Funding Source and Mode of Implementation"
        icon="settings"
        :done="step > 4"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 5" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Project Cost"
        icon="settings"
        :done="step > 4"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 5" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
              :name="4"
              title="Physical Accomplishments"
              icon="settings"
              :done="step > 4"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 5" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

      <q-step
              :name="4"
              title="Financial Accomplishments"
              icon="settings"
              :done="step > 4"
      >
        <q-stepper-navigation>

          <q-btn @click="step = 5" color="primary" label="Continue" />

        </q-stepper-navigation>
      </q-step>

    </q-stepper>

  </q-page>
</template>

<script>
import InputComponent from "../../components/InputComponent";

export default {
  components: {InputComponent},
  name: 'PageAddProject',
  data() {
    return {
      step: 1
    }
  }
};
</script>

<style></style>
