<template>
  <q-page>
    <div class="q-pa-md absolute full-height full-width column">
      <template v-if="projectsDownloaded">
        <search-component />

        <no-project v-if="!projects.length && !search" />

        <q-scroll-area
          v-if="projects.length"
          class="q-scroll-area-projects"
          style="height:100px"
        >
          <div class="row q-col-gutter-md">
            <template
              v-for="{
                id,
                title,
                implementingAgency,
                totalProjectCost
              } in projects"
            >
              <div
                class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-xs-12 flex"
                :key="id"
              >
                <q-card class="fit">
                  <q-img src="https://via.placeholder.com/300x200"></q-img>
                  <q-item class="q-pa-sm">
                    <q-item-section>
                      <q-item-label :lines="2">
                        <div
                          v-html="
                            $options.filters.searchHighlight(title, search)
                          "
                        ></div>
                      </q-item-label>
                      <q-item-label caption>
                        {{ implementingAgency }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side top>
                      <q-item-label
                        >PhP
                        {{
                          parseInt(totalProjectCost).toLocaleString()
                        }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </template>
          </div>
        </q-scroll-area>

        <no-project v-if="!projects.length && search" />
      </template>

      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em"></q-spinner>
        </span>
      </template>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
const NoProject = () => import("../components/Projects/NoProject");
const SearchComponent = () => import("../components/Projects/SearchComponent");

export default {
  components: {
    SearchComponent,
    NoProject
  },
  name: "PageProjects",
  computed: {
    ...mapState("projects", ["search", "projectsDownloaded"]),
    ...mapState("auth", ["emailVerified"]),
    ...mapGetters("projects", ["projects"])
  },
  methods: {
    ...mapActions("auth", ["sendEmailVerification"])
  },
  filters: {
    searchHighlight(value, search) {
      if (search) {
        let searchRegExp = new RegExp(search, "ig");
        return value.replace(searchRegExp, match => {
          return "<span class='bg-yellow-6'>" + match + "</span>";
        });
      }
      return value;
    }
  }
};
</script>

<style>
.q-scroll-area-projects {
  display: flex;
  flex-grow: 1;
}
</style>
