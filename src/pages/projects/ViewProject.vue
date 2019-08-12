<template>
  <q-page padding>
    <p>View Project</p>

    <card-component title="General Information">
      <template v-slot:action>

      </template>
      <template v-slot:content>
        <div class="q-gutter-y-sm">
          <div class="row items-start">
            <div class="col-sm-3">
              Title:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.title }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Type:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.pap_type.name }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Implementation Bases:
            </div>
            <div class="col-sm-9 text-weight-bold">
              <span
                v-for="item in project.implementation_bases"
                :key="item.label"
              >
                {{ item.name }}
              </span>
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Description:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.description }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Expected Outputs:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.expected_outputs }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Implementation Period:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{
                project.implementation_start +
                  " - " +
                  project.implementation_end
              }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Funding Source:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.funding_source.label }} > {{ project.funding_institution }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Spatial Coverage:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.spatial_coverage.label }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Categorization:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.categorization.label }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Total Cost:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.total_cost | monetize }}
            </div>
          </div>
        </div>
      </template>
    </card-component>

      <card-component title="General Information">
          <template v-slot:action>

          </template>
          <template v-slot:content>
            <q-list bordered separator class="rounded-borders">
              <q-item-label header>General Information</q-item-label>
              <q-item>
                <q-item-section class="col-2">
                  <q-item-label>Title</q-item-label>
                </q-item-section>
                <q-item-section>
                  {{ project.title }}
                </q-item-section>
                <q-item-section side>
                  <q-btn flat dense round icon="chevron_right"/>
                </q-item-section>
              </q-item>
            <q-item>
                <q-item-section class="col-2">
                    <q-item-label>Type</q-item-label>
                </q-item-section>
                <q-item-section>
                    {{ project.pap_type.name }}
                </q-item-section>
            </q-item>

                  <div class="row items-start">
                      <div class="col-sm-3">
                          Implementation Bases:
                      </div>
                      <div class="col-sm-9 text-weight-bold">
              <span
                      v-for="item in project.implementation_bases"
                      :key="item.label"
              >
                {{ item.name }}
              </span>
                      </div>
                  </div>

                  <div class="row items-start">
                      <div class="col-sm-3">
                          Description:
                      </div>
                      <div class="col-sm-9 text-weight-bold">
                          {{ project.description }}
                      </div>
                  </div>

                  <div class="row items-start">
                      <div class="col-sm-3">
                          Expected Outputs:
                      </div>
                      <div class="col-sm-9 text-weight-bold">
                          {{ project.expected_outputs }}
                      </div>
                  </div>

                  <div class="row items-start">
                      <div class="col-sm-3">
                          Implementation Period:
                      </div>
                      <div class="col-sm-9 text-weight-bold">
                          {{
                          project.implementation_start +
                          " - " +
                          project.implementation_end
                          }}
                      </div>
                  </div>

                  <div class="row items-start">
                      <div class="col-sm-3">
                          Funding Source:
                      </div>
                      <div class="col-sm-9 text-weight-bold">
                          {{ project.funding_source.label }} > {{ project.funding_institution }}
                      </div>
                  </div>

                  <div class="row items-start">
                      <div class="col-sm-3">
                          Spatial Coverage:
                      </div>
                      <div class="col-sm-9 text-weight-bold">
                          {{ project.spatial_coverage.label }}
                      </div>
                  </div>

                  <div class="row items-start">
                      <div class="col-sm-3">
                          Categorization:
                      </div>
                      <div class="col-sm-9 text-weight-bold">
                          {{ project.categorization.label }}
                      </div>
                  </div>

                  <div class="row items-start">
                      <div class="col-sm-3">
                          Total Cost:
                      </div>
                      <div class="col-sm-9 text-weight-bold">
                          {{ project.total_cost | monetize }}
                      </div>
                  </div>

            </q-list>
          </template>
      </card-component>
  </q-page>
</template>

<script>
import { Notify } from "quasar";
import CardComponent from "../../components/UI/CardComponent";

export default {
  components: { CardComponent },
  name: "PageViewProject",
  data() {
    return {
      project: {}
    };
  },
  filters: {
    monetize(val) {
      return Number(val).toLocaleString();
    }
  },
  created() {
    this.$axios
      .get("/projects/" + this.$route.params.id)
      .then(res => {
        this.project = res.data;
      })
      .catch(e => {
        Notify.create({
          message: e.message,
          color: "negative",
          position: "top"
        });
      });
  }
};
</script>
