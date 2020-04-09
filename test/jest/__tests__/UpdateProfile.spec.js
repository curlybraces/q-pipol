import { createLocalVue, shallowMount } from '@vue/test-utils';
import UpdateProfile from 'src/components/Account/UpdateProfile';
import createStore from 'src/store/index';

const localVue = createLocalVue()
const store = createStore();

describe('Update Profile', () => {
  it('mounts', () => {
    const wrapper = shallowMount(UpdateProfile, {
      localVue,
      store
    })

    console.log(wrapper.vm.$store)
  })
})