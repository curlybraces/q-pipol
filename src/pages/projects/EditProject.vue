<template>
  <q-page padding>
    <div class="row">
      <p>Edit Project</p>
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

    <q-tabs
      v-model="tab"
      class="bg-primary text-grey-4"
      active-color="secondary"
      indicator-color="secondary"
      align="justify"
    >
      <q-tab name="edit" label="Edit" />
      <q-tab name="history" label="Log" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="edit">
        <general-information :project="project"></general-information>
      </q-tab-panel>

      <q-tab-panel name="history">
        <q-list
          bordered
          separator>
          <q-item
            v-for="item in project.backups"
            :key="item.id"
            clickable
            @click="showPreviousVersion(item.id)">
            <q-item-section top>
              <q-item-label overline>
                Changes
              </q-item-label>
              <q-item-label lines="3">
                {{ item.changes }}
              </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="column text-right">
                <div class="text-weight-bold">Last modified</div>
                <div>{{ item.modified_by.name }}</div>
                <div>{{ item.updated_at }}</div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>

  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

import GeneralInformation from "../../components/EditProject/GeneralInformation.vue";

export default {
  components: {
    GeneralInformation
  },
  name: "PageEditProject",
  data() {
    return {
      tab: 'history'
    };
  },
  computed: {
    ...mapState("projects", ["project"])
  },
  methods: {
    ...mapActions("projects", ["loadProject"]),
    showPreviousVersion(id) {
      var backup = this.project.backups.filter(backup => backup.id == id)
      this.$q.dialog({
        message: JSON.stringify(backup)
      })
    }
  },
  mounted() {
    this.loadProject({ id: this.$route.params.id });
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
