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
      @keydown.enter="search"
      v-model="searchField"
    >
      <template v-slot:append>
        <q-icon name="search" @click="search"/>
      </template>
    </q-input>

    <list-component
      :items="projects">
    </list-component>

    <fab-component link="/projects/add" />
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
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

    };
  },
  computed: {
    ...mapGetters('projects',['projects','projectsFiltered']),
    ...mapState('projects',['search']),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  },
  methods: {
    ...mapActions('projects',['loadProjects','setSearch']),
    alert() {
      alert('Searching')
    }
  },
  mounted() {
    this.loadProjects();
  }
};
</script>

<style></style>
