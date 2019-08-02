<template>
  <q-page padding>
    <p>View Projects</p>
    <q-input
      outlined
      dense
      rounded
      class="q-mb-md"
      clearable
      placeholder="Search in project titles..."
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <list-component
      :items="projects"> </list-component>

    <fab-component link="/projects/add" />
  </q-page>
</template>

<script>
import ListComponent from "../../components/ListComponent";
import FabComponent from "../../components/FabComponent";

export default {
  components: {
    FabComponent,
    ListComponent
  },
  name: "PageViewProjects",
  data() {
    return {
      projects: [
        //
      ]
    };
  },
  methods: {
    loadProjects() {
      this.$axios.get('/projects')
      .then(res => {
        this.projects = res.data.data;
      })
      .catch(e => {
        console.log(e.message)
      });
    }
  },
  mounted() {
    this.loadProjects()
  }
};
</script>

<style></style>
