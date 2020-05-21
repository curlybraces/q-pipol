/**
 * Create a test directive (v-test) to affix to elements for testing
 *
 */

import TestDirective from '../directives/test';

export default ({ Vue }) => {
  // define v-test directive
  Vue.directive('test', TestDirective);
};
