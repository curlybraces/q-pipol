<template>
  <q-page padding>
    <q-markdown :src="gettingStarted"></q-markdown>
  </q-page>
</template>

<script>
import gettingStarted from '../../../markdowns/getting-started.md';

export default {
  name: 'GettingStarted',
  data() {
    return {
      gettingStarted: gettingStarted
    };
  }
};
</script>
