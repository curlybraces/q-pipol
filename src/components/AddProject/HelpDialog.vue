<template>
  <q-card>
    <q-card-section>
      <q-list separator>
        <q-item class="bg-primary text-white">
          <q-item-section avatar>
            <q-icon name="help" color="white" />
          </q-item-section>
          <q-item-section>
            <div class="text-h6">Help</div>
          </q-item-section>
          <q-item-section side>
            <q-btn
              flat
              round
              dense
              icon="close"
              @click="$emit('close')"
              class="text-white"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-separator />

    <q-card-section>
      <q-list bordered>
        <q-expansion-item
          v-for="item in help"
          :key="item.title"
          :label="item.title"
          :group="item.group"
          :default-opened="item.default"
        >
          <q-card class="q-py-sm q-px-lg">
            <q-card-section>
              {{ item.description }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "HelpDialog",
  data() {
    return {
      help: [
        {
          group: "1",
          title: "1. Proposal or Project Name",
          description:
            "Provide the name of the proposed project. The name of the proposal should make it clear what the project will do. If applicable, the name should be the same as approved by the pertinent approving authorities such as the ICC. ",
          default: true
        },
        {
          group: "2",
          title: "2. Implementing Department/Agency",
          description:
            "Identify the name of the implementing department/agency submitting the form. If more than one agency will be involved in the proposal, list all agencies and indicate their roles. For example: DOH (Lead Agency), NBI (participating agency)."
        },
        {
          group: "3",
          title: "3. Priority Ranking No.",
          description:
            "Indicate the priority rank assigned to the proposal by the agency. All proposals should be included in a single list of ranked proposals regardless of whether they are program activities, LFPs or FAPs."
        },
        {
          group: "4",
          title: "4. Categorization",
          description:
            "Place an X in the boxes to indicate whether the proposal is a new activity/project or the expansion of an existing activity. Also, indicate how it is categorized by total project cost."
        },
        {
          group: "5",
          title: "5. Infrastructure",
          description:
            "Determine whether the project is infrastructure or non-infrastructure."
        },
        {
          group: "6",
          title: "6. Total Project Cost",
          description:
            "Provide the total cost of proposal to be funded in FY 2020-2022."
        }
        // {
        //   group: "",
        //   title: "",
        //   description: ""
        // },
      ]
    };
  }
};
</script>

<style scoped>
.q-card__section {
  padding: 0px !important;
}
</style>
