<template>
  <q-page class="q-pt-lg">
    <div class="row q-pa-sm">
      <q-markdown :src="gadhelper"></q-markdown>
    </div>
  </q-page>
</template>

<script>
import gadhelper from '../markdowns/gadhelper.md';

export default {
  name: 'PageGadHelp',
  data() {
    return {
      // eslint-disable-next-line
		  gadhelper: gadhelper
    };
  }
};
</script>
