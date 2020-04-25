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
  </page-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PageContainer from '../../shared/components/PageContainer';
import PageTitle from '../../shared/components/PageTitle';

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