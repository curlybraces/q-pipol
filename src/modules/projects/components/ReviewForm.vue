<template>
  <q-list bordered>
    <q-item class="bg-accent text-white">
      <q-item-section>
        <q-item-label>
          Review Project Form
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <template v-if="$apollo.loading">
      <inner-loading :showing="$apollo.loading" />
    </template>

    <template v-if="!$apollo.loading">
      <q-item-label header>Responsiveness</q-item-label>

      <q-expansion-item
        icon="playlist_add_check"
        label="PDP Chapters"
        expand-separator
        :caption="`${project.selected_pdp_chapters.length} selected`"
      >
        <list-item
          v-model="project.selected_pdp_chapters"
          folder="pdp"
          ext="png"
          :options="pdp_chapters"
        ></list-item>
      </q-expansion-item>

      <q-expansion-item
        icon="playlist_add_check"
        label="PDP RM Indicators"
        expand-separator
        :caption="`${project.selected_pdp_indicators.length} selected`"
      >
        <template v-if="filteredIndicators.length">
          {{ project.selected_indicators }}
          <q-tree
            :nodes="filteredIndicators"
            nodeKey="value"
            tick-strategy="leaf"
            :ticked.sync="project.selected_pdp_indicators"
            default-expand-all
          />
        </template>
        <q-item v-else>
          <q-item-section>
            <q-item-label>Select PDP Chapters first.</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>

      <q-expansion-item
        icon="playlist_add_check"
        label="Sustainable Developments"
        expand-separator
        :caption="
          `${project.selected_sustainable_development_goals.length} selected`
        "
      >
        <list-item
          v-model="project.selected_sustainable_development_goals"
          folder="sdg"
          ext="jpg"
          :options="sustainable_development_goals"
        ></list-item>
      </q-expansion-item>

      <q-expansion-item
        icon="playlist_add_check"
        label="Implementation Bases"
        expand-separator
        :caption="`${project.selected_bases.length} selected`"
      >
        <list-item
          v-model="project.selected_bases"
          folder="tpa"
          ext="png"
          :options="bases"
        ></list-item>
      </q-expansion-item>

      <q-expansion-item
        icon="playlist_add_check"
        label="Ten Point Agenda"
        expand-separator
        :caption="`${project.selected_ten_point_agenda.length} selected`"
      >
        <list-item
          v-model="project.selected_ten_point_agenda"
          folder="tpa"
          ext="png"
          :options="ten_point_agenda"
        ></list-item>
      </q-expansion-item>

      <q-expansion-item
        icon="playlist_add_check"
        label="New Thinking"
        expand-separator
        :caption="`${project.selected_paradigms.length} selected`"
      >
        <list-item
          v-model="project.selected_paradigms"
          folder="nt"
          ext="png"
          :options="paradigms"
        ></list-item>
      </q-expansion-item>

      <q-expansion-item label="Readiness" class="text-grey-7">
        <q-item tag="label">
          <q-item-section avatar>
            <q-checkbox v-model="within_period"></q-checkbox>
          </q-item-section>
          <q-item-section>
            <q-item-label>To be implemented within 2017-2022</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <single-select
            label="Level of Readiness"
            v-model="readiness_id"
            :options="readinesses"
          ></single-select>
        </q-item>
      </q-expansion-item>

      <q-expansion-item label="Typology" class="text-grey-7">
        <q-item>
          <typology v-model="typology_id"></typology>
        </q-item>
        <q-item tag="label">
          <q-item-section avatar>
            <q-checkbox v-model="cip"></q-checkbox>
          </q-item-section>
          <q-item-section>
            Core Investment Program/Project
          </q-item-section>
        </q-item>
        <q-item v-if="cip">
          <single-select
            label="CIP Type"
            v-model="cip_type_id"
            :options="cip_types"
          ></single-select>
        </q-item>
        <q-item tag="label">
          <q-item-section avatar>
            <q-checkbox v-model="trip"></q-checkbox>
          </q-item-section>
          <q-item-section>
            Three-Year Rolling Infrastructure Program
          </q-item-section>
        </q-item>
      </q-expansion-item>

      <q-item>
        <text-input
          type="textarea"
          label="Remarks"
          v-model="remarks"
        ></text-input>
      </q-item>

      <div class="row justify-end q-pa-sm">
        <q-btn
          label="Save"
          color="primary"
          @click="handleReviewProject"
        ></q-btn>
      </div>
    </template>
  </q-list>
</template>

<script>
import Vue from 'vue';
import gql from 'graphql-tag';
import Typology from './dropdowns/Typology';
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import TextInput from '@/ui/form-inputs/TextInput';
import ListItem from './review-form/ListItem';
import { PDP_INDICATORS } from '@/constants/pdp';
import { FETCH_REVIEW_QUERY } from '@/graphql/queries';
import InnerLoading from '@/ui/components/InnerLoading';
import { mapActions } from 'vuex';

export default {
  components: { SingleSelect, TextInput, Typology, ListItem, InnerLoading },
  name: 'ReviewForm',
  props: ['id'],
  apollo: {
    sustainable_development_goals: {
      query: gql`
        {
          sustainable_development_goals {
            id
            name
          }
        }
      `
    },
    ten_point_agenda: {
      query: gql`
        {
          ten_point_agenda {
            id
            name
          }
        }
      `
    },
    paradigms: {
      query: gql`
        {
          paradigms {
            id
            name
          }
        }
      `
    },
    bases: {
      query: gql`
        {
          bases {
            id
            name
          }
        }
      `
    },
    readinesses: {
      query: gql`
        {
          readinesses {
            id
            name
          }
        }
      `
    },
    cip_types: {
      query: gql`
        {
          cip_types {
            id
            name
          }
        }
      `
    },
    pdp_chapters: {
      query: gql`
        {
          pdp_chapters {
            id
            name
          }
        }
      `
    },
    project: {
      query: FETCH_REVIEW_QUERY,
      variables() {
        return {
          id: this.$props.id
        };
      }
    }
  },
  data() {
    return {
      project: {},
      bases: [],
      sustainable_development_goals: [],
      ten_point_agenda: [],
      paradigms: [],
      readinesses: [],
      cip_types: [],
      pdp_chapters: [],
      pdp_indicators: PDP_INDICATORS
    };
  },
  computed: {
    filteredIndicators() {
      let filteredIndicators = [];

      const pdpIndicators = this.pdp_indicators;
      const selectedPdpChapters = this.project.selected_pdp_chapters;

      if (!selectedPdpChapters.length) {
        filteredIndicators = [];
      } else {
        filteredIndicators = pdpIndicators.filter(chapter => {
          return selectedPdpChapters.includes(chapter.value.toString());
        });
      }

      return filteredIndicators;
    },
    within_period: {
      get() {
        return this.project.review ? this.project.review.within_period : null;
      },
      set(val) {
        this.project.review.within_period = val;
      }
    },
    readiness_id: {
      get() {
        return this.project.review ? this.project.review.readiness_id : null;
      },
      set(val) {
        this.project.review.readiness_id = val;
      }
    },
    cip() {
      return false;
    },
    typology_id() {
      return null;
    },
    remarks() {
      return '';
    },
    trip() {
      return false;
    }
  },
  methods: {
    ...mapActions('projects', ['reviewProject']),
    handleReviewProject() {
      const {
        selected_bases,
        selected_pdp_chapters,
        selected_ten_point_agenda,
        selected_paradigms,
        selected_sustainable_development_goals,
        // selected_pdp_indicators,
        review
      } = this.project;

      const payload = {
        id: this.$props.id,
        bases: {
          sync: selected_bases
        },
        pdp_chapters: {
          sync: selected_pdp_chapters
        },
        ten_point_agenda: {
          sync: selected_ten_point_agenda
        },
        paradigms: {
          sync: selected_paradigms
        },
        sustainable_development_goals: {
          sync: selected_sustainable_development_goals
        },
        review: {
          upsert: Vue.delete(review, '__typename')
        }
      };
      console.dir(payload.review);
      this.reviewProject(payload);
    }
  }
};
</script>
