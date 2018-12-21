import React from 'react';
import { shallow, enzyme, configure, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PracticeGrid from './PracticeGrid';
import PracticeGridprops from '../../json/PracticeGridData.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<PracticeGrid />', () => {
  it('renders 1 <PracticeGrid /> component', () => {
    const component = shallow(
      <PracticeGrid PracticeGridprops={PracticeGridprops.practicetin} />,
    );
    expect(component.exists('PracticeGrid')).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('it should have Table ', () => {
    const wrapper = shallow(
      <PracticeGrid PracticeGridprops={PracticeGridprops.practicetin} />,
    );
    expect(wrapper.exists('Table')).toEqual(true);
    expect(wrapper.find('Table').exists()).toEqual(true);
    expect(wrapper.find('Table')).toHaveLength(1);
  });

  it('will check props', () => {
    const component = mount(
      <PracticeGrid PracticeGridprops={PracticeGridprops.practicetin} />,
    ).props();
    expect(component).toBeDefined();
  });
});
