<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="row q-col-gutter-x-md">
      <div class="col-3">
        <q-card square fit class="no-margin full-height">
          <q-item>
            <q-item-section>
              <q-item-label caption>Active Projects</q-item-label>
              <q-item-label>
                <span class="text-weight-bold text-h6"> </span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon name="list" size="xl" color="green-5"></q-icon>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-3">
        <q-card square fit class="no-margin full-height">
          <q-item>
            <q-item-section>
              <q-item-label caption>Deleted Projects</q-item-label>
              <q-item-label>
                <span class="text-weight-bold text-h6"> </span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon name="delete" size="xl" color="red-5"></q-icon>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-3">
        <q-card square fit class="no-margin full-height">
          <q-item>
            <q-item-section>
              <q-item-label caption>Messages</q-item-label>
              <q-item-label>
                <span class="text-weight-bold text-h6">14</span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon name="mail_outline" size="xl" color="blue"></q-icon>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-3">
        <q-card square fit class="no-margin full-height">
          <q-item>
            <q-item-section>
              <q-item-label caption>Notifications</q-item-label>
              <q-item-label>
                <span class="text-weight-bold text-h6">
                  {{ JSON.parse(me.unreadNotifications).length }}
                </span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon name="notifications" size="xl" color="grey-5"></q-icon>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
    <div class="row">
      <svg width="500" height="270">
        <g style="transform: translate(0, 10px)">
          <path :d="line" />
        </g>
      </svg>
    </div>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import { ALL_PROJECTS_QUERY, ME_QUERY } from "../constants/graphql";

import * as d3 from "d3";

export default {
  components: { PageBreadcrumbs },
  name: "PageIndex",
  apollo: {
    projects: {
      query: ALL_PROJECTS_QUERY,
      variables: {
        page: 1
      }
    },
    me: {
      query: ME_QUERY
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home"
        }
      ],
      data: [99, 71, 78, 25, 36, 92],
      line: ""
    };
  },
  methods: {
    getScales() {
      const x = d3.scaleTime().range([0, 430]);
      const y = d3.scaleLinear().range([210, 0]);
      d3.axisLeft().scale(x);
      d3.axisBottom().scale(y);
      x.domain(d3.extent(this.data, (d, i) => i));
      y.domain([0, d3.max(this.data, d => d)]);
      return { x, y };
    },
    calculatePath() {
      const scale = this.getScales();
      const path = d3
        .line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d));
      this.line = path(this.data);
    }
  },
  mounted() {
    this.calculatePath();
  }
};
</script>

<style lang="sass" scoped>
svg
  margin: 25px;
path
  path
    fill: none
    stroke: #76BF8A
    stroke-width: 3px
</style>
