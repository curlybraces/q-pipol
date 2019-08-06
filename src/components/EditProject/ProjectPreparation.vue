<template>
  <card-component title="Project Preparation Details">
    <template v-slot:content>

      <select-component
        label="Project Preparation Document"
        v-model="project.preparation_document"
      ></select-component>

      <select-component label="Status of Feasibility Study"></select-component>

      <p>Will require NEDA assistance? Yes or No</p>

      <date-component
        label="Target Date of Start/Completion"
        v-model="fs_start"
      ></date-component>

      <input-component label="Others"></input-component>

      <p>Schedule of F/S Cost (In Exact Amount in PhP)</p>

      <input-component
        label="FS Cost for 2017"
        v-model="project.fs_2017"
      ></input-component>

      <input-component
        label="FS Cost for 2018"
        v-model="project.fs_2018"
      ></input-component>

      <input-component
        label="FS Cost for 2019"
        v-model="project.fs_2019"
      ></input-component>

      <input-component
        label="FS Cost for 2020"
        v-model="project.fs_2020"
      ></input-component>

      <input-component
        label="FS Cost for 2021"
        v-model="project.fs_2021"
      ></input-component>

      <input-component
        label="FS Cost for 2022"
        v-model="project.fs_2022"
      ></input-component>

      <input-component
        label="Total FS Cost"
        v-model="project.fs_total"
      ></input-component>

      <select-component
              label="Level of Approval"
              :options="approval_levels"
              v-model="project.approval_level_id"
      ></select-component>

      <date-component
              label="Approval Date"
              v-model="project.approved_at"
      ></date-component>

    </template>
  </card-component>
</template>

<script>
export default {
  name: "ProjectPreparation"
};
</script>
