<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="row">
      <q-card square class="col q-mt-sm q-pa-md q-gutter-y-md">
        <div class="row text-weight-light text-uppercase">
          General Information
          <q-space />
          <q-btn
            outline
            dense
            icon="edit"
            label="Edit Project"
            @click="readonly = !readonly"
          />
        </div>

        <div class="row q-col-gutter-x-md">
          <div class="col">
            <text-input v-model="title" label="Title" :readonly="readonly" />
          </div>
        </div>

        <q-card-actions class="q-pa-none" align="right">
          <q-btn label="Next" color="primary" icon-right="chevron_right" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import TextInput from "../components/FormInputs/TextInput";

export default {
  components: {
    PageBreadcrumbs,
    TextInput
  },
  name: "ViewProject",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Projects",
          url: "/pip"
        },
        {
          title: "View Project"
        }
      ],
      readonly: true,
      title: "Title"
    };
  }
};
</script>
