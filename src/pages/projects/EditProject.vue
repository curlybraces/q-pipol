<template>
  <q-page padding>
    <div class="row">
      <p>Add Project</p>
      <q-space />
      <q-btn
        flat
        round
        dense
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        @click="$q.fullscreen.toggle()"
        class="q-ml-md"
      />
    </div>

    <general-information
      :project="{}">
    </general-information>


  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import GeneralInformation from '../../components/EditProject/GeneralInformation.vue';

export default {
  components: {
    GeneralInformation
  },
  name: "PageEditProject",
  data() {
    return {
    };
  },
  computed: {
    ...mapState('projects',['project'])
  },
  methods: {
    ...mapActions('projects',['loadProject'])
  },
  mounted() {
    this.loadProject({ id: this.$route.params.id })
  }
};
</script>

<style lang="stylus">
.my-sticky-column-table
  /* bg color is important for th; just specify one */
  thead tr:first-child th:first-child
    background-color #344955
    opacity 1

  td:first-child
    background-color #344955

  thead tr:first-child th:first-child,
  td:first-child
    position sticky
    left 0
    z-index 1
    color: #FFF
</style>
