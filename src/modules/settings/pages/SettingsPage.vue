<template>
  <page-container>
    <page-title title="Settings"></page-title>

    <div class="row q-pa-sm">
      <div class="col-lg-4 col-md-6 col-xs-12">
        <span
          class="text-subtitle1"
          :class="dark ? 'text-purple' : 'text-primary'"
          >Appearance</span
        >
        <p class="text-caption">
          Change the appearance of the app.
        </p>
      </div>
      <div class="col-lg-8 col-md-6 col-xs-12">
        <q-list>
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
      </div>
    </div>
    <q-separator inset />
    <div class="row q-pa-sm">
      <div class="col-lg-4 col-md-6 col-xs-12">
        <span
          class="text-subtitle1"
          :class="dark ? 'text-purple' : 'text-primary'"
          >Change Log</span
        >
        <p class="text-caption">
          Lists features and bug fixes made for past versions of the application
        </p>
      </div>
      <div class="col-lg-8 col-md-6 col-xs-12 q-pl-md">
        <q-btn outline label="VIEW" @click="changeLogDialog = true"></q-btn>
      </div>
    </div>
    <q-separator inset />
    <div class="row q-pa-sm">
      <div class="col-lg-4 col-md-6 col-xs-12">
        <span
          class="text-subtitle1"
          :class="dark ? 'text-purple' : 'text-primary'"
          >Reset App</span
        >
        <p class="text-caption">
          Reset the application if you are encountering problems.
        </p>
      </div>
      <div class="col-lg-8 col-md-6 col-xs-12 q-pl-md">
        <q-btn
          outline
          color="negative"
          label="RESET"
          @click="confirmReset"
        ></q-btn>
      </div>
    </div>

    <q-dialog v-model="changeLogDialog" v-close-popup>
      <q-card square style="max-width:400px;width:80vw">
        <q-toolbar class="bg-dark text-white">
          <q-toolbar-title>Change Logs</q-toolbar-title>
        </q-toolbar>
        <q-card-section class="q-pa-sm">
          <q-markdown :src="markdown"></q-markdown>
        </q-card-section>
      </q-card>
    </q-dialog>
  </page-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PageContainer from '@/ui/page/PageContainer';
import PageTitle from '@/ui/page/PageTitle';
import changelog from '@/markdowns/changelog.md';

export default {
  name: 'PageSettings',
  components: { PageTitle, PageContainer },
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
      compact: true,
      shortcuts: [],
      changeLogDialog: false,
      markdown: changelog
    };
  },
  methods: {
    ...mapActions('settings', ['setDark', 'setDense']),
    toggleDark(e) {
      this.setDark(e);
    },
    confirmReset() {
      this.$q
        .dialog({
          title: 'Reset Application',
          message:
            'Are you sure you want to reset the app? This will log you out from application.',
          cancel: true
        })
        .onOk(() => {
          localStorage.clear();
          window.location.reload();
          this.$router.push('/login');
        });
    }
  }
};
</script>
