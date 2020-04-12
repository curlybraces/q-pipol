// import test directive from directives folder
import TestDirective from '../directives/test';

export default ({ Vue }) => {
  // define v-test directive
  Vue.directive('test', TestDirective);
};
