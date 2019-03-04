import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import MainContainer from '@/components/MainContainer.vue';

describe('MainContainer.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(MainContainer, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
