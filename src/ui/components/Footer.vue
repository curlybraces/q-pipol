<template>
  <div>
    <div class="row q-pa-sm q-gutter-xs items-center">
      <q-btn flat dense type="a" class="text-lowercase gt-sm">
        da-ipms2020.web.app
      </q-btn>
      <q-btn flat dense type="a" class="text-capitalize" to="/docs">
        Docs
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

export default {
  name: 'AppFooter',
  components: { AboutComponent },
  data() {
    return {
      showAbout: false,
      version: CONFIG.version
    };
  }
};
</script>
