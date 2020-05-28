<template>
  <td class="text-right">
    {{ value | formatMoney }}
    <copy-button v-copy="value"></copy-button>
  </td>
</template>

<script>
import CopyButton from '@/ui/buttons/CopyButton';
export default {
  name: 'TableData',
  components: { CopyButton },
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  filters: {
    formatMoney(val) {
      if (!val) {
        return 0.0;
      }
      return val.toLocaleString('en-GB', { maximumFractionDigits: 2 });
    }
  }
};
</script>
