import React from 'react';
import MasterAccordion from './MasterAccordion';
import { shallow, enzyme, configure, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MasterAccordionData from '../../json/MasterAccordion.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<MasterAccordion />', () => {
  it('renders', () => {
    const wrapper = shallow(
      <MasterAccordion masterAccordionProps={MasterAccordionData} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('testing onClick accordion', () => {
    const wrapper = shallow(
      <MasterAccordion masterAccordionProps={MasterAccordionData} />,
    );
    wrapper.instance().handleClick = jest.fn();
    let { handleClick } = wrapper.instance();
    wrapper
      .find('AccordionTitle')
      .at(0)
      .simulate('click');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
