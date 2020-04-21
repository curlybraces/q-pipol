<template>
  <q-card :style="$q.screen.xs ? void 0 : 'width:400px'">
    <q-toolbar class="bg-info text-white">
      <q-toolbar-title class="absolute-center text-subtitle1"
        >Assign Operating Unit</q-toolbar-title
      >
      <q-space />
      <q-btn flat round dense icon="close" @click="$emit('close')"></q-btn>
    </q-toolbar>
    <q-separator></q-separator>
    <div class="row q-pa-sm">
      <q-input class="col" outlined :dense="dense" v-model="search">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <q-list class="q-px-sm" separator>
      <template v-for="ou in filteredOus">
        <q-item tag="label" v-ripple :key="ou.id">
          <q-item-section avatar>
            <q-checkbox v-model="selectedOu" :val="ou.id" color="primary" />
          </q-item-section>
          <q-item-section avatar>
            <q-avatar>
              <q-img :src="ou.image" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ ou.acronym }}</q-item-label>
            <q-item-label caption :lines="1">{{ ou.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
    <q-card-actions align="right">
      <q-btn flat label="cancel" @click="$emit('close')"></q-btn>
      <q-btn
        color="primary"
        label="save"
        @click="onSubmit"
        :loading="loading"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { FETCH_OPERATING_UNITS } from '../../graphql/queries';

export default {
  name: 'AssignOus',
  props: ['ous', 'id'],
  apollo: {
    operating_units: {
      query: FETCH_OPERATING_UNITS
    }
  },
  computed: {
    ...mapState('settings', ['dense']),
    filteredOus() {
      const search = this.search;
      const ous = this.operating_units;
      let filteredOus = {};

      if (search) {
        const searchLowerCase = search.toLowerCase();

        Object.keys(ous).forEach(key => {
          let ou = ous[key];
          let ouTitleLowerCase = ou.acronym.toLowerCase();

          // Add the project to projects filtered if title matches search
          if (ouTitleLowerCase.includes(searchLowerCase)) {
            filteredOus[key] = ou;
          }
        });

        return filteredOus;
      }
      return ous;
    }
  },
  data() {
    return {
      operating_units: [],
      search: '',
      selectedOu: []
    };
  },
  methods: {
    ...mapActions('operatingUnits', ['fetchOperatingUnits']),
    ...mapActions('users', ['assignOperatingUnitToReview']),
    addMe(id) {
      if (this.selectedOu.includes(id)) {
        const index = this.selectedOu.indexOf(id);
        this.selectedOu.splice(index, 1);
      } else {
        this.selectedOu.push(id);
      }
      this.$emit('update', this.selectedOu);
      console.log(this.selectedOu);
    },
    selected(id) {
      return this.selectedOu.includes(id);
    },
    onSubmit() {
      this.loading = true;
      this.assignOperatingUnitToReview({
        id: this.$props.id,
        operating_units: this.selectedOu
      }).then(() => {
        this.$emit('close');
      });
    }
  },
  mounted() {
    this.fetchOperatingUnits();
  }
};
</script>
