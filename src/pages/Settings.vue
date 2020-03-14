<template>
  <q-page>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <div class="q-pa-sm">
      <q-card square>
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-avatar
            flat
            round
            dense
            icon="settings"
            color="white"
            class="text-primary"
          />
          <q-toolbar-title>Settings</q-toolbar-title>
        </q-toolbar>
        <q-list>
          <q-item-label header>
            Appearance
          </q-item-label>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Compact Mode</q-item-label>
              <q-item-label caption> </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle color="blue" v-model="denseMode" val="compact" />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Dark Mode</q-item-label>
              <q-item-label caption> </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                color="purple"
                v-model="darkMode"
                val="dark"
                @input="toggleDark"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PageBreadcrumbs from '../components/PageBreadcrumbs';

export default {
  name: 'PageSettings',
  components: { PageBreadcrumbs },
  computed: {
    ...mapState('settings', ['dark', 'dense']),
    darkMode: {
      get() {
        return this.dark;
      },
      set(val) {
        this.setDark(val);
      }
    },
    denseMode: {
      get() {
        return this.dense;
      },
      set(val) {
        this.setDense(val);
      }
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Home',
          url: '/'
        },
        {
          title: 'Settings'
        }
      ],
      compact: true
    };
  },
  methods: {
    ...mapActions('settings', ['setDark', 'setDense']),
    toggleDark(e) {
      this.setDark(e);
    }
  }
};
</script>
