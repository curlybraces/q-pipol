<template>
  <div>
    <div class="row q-pa-sm q-gutter-xs items-center">
      <q-btn flat dense type="a" class="text-lowercase gt-sm">
        da-ipms2020.web.app
      </q-btn>
      <q-btn
        flat
        dense
        type="a"
        class="text-capitalize"
        href="https://ipms-docs.web.app"
        target="_blank"
        icon-right="open_in_new"
        label="Docs"
      >
      </q-btn>
      <q-btn
        flat
        dense
        type="a"
        class="text-capitalize"
        @click="showAbout = true"
      >
        About
      </q-btn>
      <q-btn
        flat
        dense
        type="a"
        class="text-capitalize"
        href="https://github.com/mlab817/q-pipol/issues"
        target="_blank"
        icon-right="open_in_new"
        label="Report Issues"
      >
      </q-btn>
      <q-space />
      <span> v. {{ version }} </span>
    </div>
    <q-dialog v-model="showAbout">
      <about-component @close="showAbout = false"></about-component>
    </q-dialog>
  </div>
</template>

<script>
import AboutComponent from './About';
import { CONFIG } from '@/config';
import { versionService } from '@/services'

export default {
  name: 'AppFooter',
  components: { AboutComponent },
  data() {
    return {
      showAbout: false,
      version: CONFIG.version
    };
  },
  created() {
    versionService.getCurrentVersion()
      .then(res => {
        this.version = res.currentVersion.version
      })
      .catch(err => console.log(err.message))
  }
};
</script>
