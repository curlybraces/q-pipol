<template>
  <q-page padding>
    <q-form @submit="updateProject"
      >UPDATE PROJECT
      <div class="row q-col-gutter-md">
        <div class="col-10">
          <q-input v-model="project.title" dense />
        </div>
        <div class="col-2">
          <q-btn
            class="full-width"
            type="submit"
            label="UPDATE"
            color="primary"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { VIEW_PROJECT, UPDATE_PROJECT } from "../constants/graphql";

export default {
  name: "PageUpdateProject",
  data() {
    return {
      project: {}
    };
  },
  apollo: {
    project: {
      query: VIEW_PROJECT,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },
  methods: {
    updateProject() {
      const { id, title } = this.$data.project;
      console.log(id, title);
      this.$apollo
        .mutate({
          mutation: UPDATE_PROJECT,
          variables: {
            id: id,
            title: title
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
