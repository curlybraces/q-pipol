<template>
  <q-card style="min-width:640px;" square>
    <div class="row q-pa-sm justify-between">
      Assign Operating Unit
      <q-icon name="close" @click="$emit('close')" class="cursor-pointer"></q-icon>
    </div>
    <q-separator></q-separator>
    <div class="row q-pa-sm">
      <q-input class="col" outlined :dense="dense" v-model="search">
        <template v-slot:prepend>
          <q-icon name="search"/>
        </template>
      </q-input>
    </div>
    <q-scroll-area style="height:500px;">
      <div class="row q-pa-sm q-col-gutter-sm">
        <template v-for="(ou, key) in filteredOus">
          <div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-6" :key="key">
            <q-card fit class="q-pa-sm cursor-pointer" @click="addMe(ou.id)" square bordered flat :class="selected(ou.id) ? 'bg-blue-1': ''">
              <q-img :src="'statics/agency_logos/' + ou.image"></q-img>
              <q-item-label class="text-center q-pt-xs text-caption">{{ou.acronym}}</q-item-label>
            </q-card>
          </div>
        </template>
      </div>
    </q-scroll-area>
    <q-card-actions align="right">
      <q-btn flat label="cancel" @click="$emit('close')"></q-btn>
      <q-btn color="primary" label="save" @click="onSubmit"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AssignOus',
  props: ['ous','id'],
  computed: {
    ...mapState('operatingUnits',['operating_units']),
    ...mapState('settings',['dense']),
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
      search: '',
      selectedOu: []
    };
  },
  methods: {
    ...mapActions('operatingUnits',['fetchOperatingUnits']),
    addMe(id) {
      if (this.selectedOu.includes(id)) {
        const index = this.selectedOu.indexOf(id);
        this.selectedOu.splice(index,1);
      } else {
        this.selectedOu.push(id);
      }
      this.$emit('update',this.selectedOu);
      console.log(this.selectedOu);
    },
    selected(id) {
      return this.selectedOu.includes(id);
    },
    onSubmit() {
      console.log(this.$props.id, this.selectedOu);
    }
  },
  mounted() {
    this.fetchOperatingUnits();
  }
}
</script>
