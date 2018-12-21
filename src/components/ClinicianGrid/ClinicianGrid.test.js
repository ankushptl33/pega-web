import React from 'react';
import { shallow, enzyme, configure, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ClinicianGrid from './ClinicianGrid';
import clinicianGridViewProp from '../../json/ClinicianGrid.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<ClinicianGrid />', () => {
  it('renders 1 <ClinicianGrid /> component', () => {
    const component = shallow(
      <ClinicianGrid clinicianGridViewProp={clinicianGridViewProp} />,
    );
    expect(component.exists('ClinicianGrid')).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('it should have Table ', () => {
    const wrapper = shallow(
      <ClinicianGrid clinicianGridViewProp={clinicianGridViewProp} />,
    );
    expect(wrapper.exists('Table')).toEqual(true);
    expect(wrapper.find('Table').exists()).toEqual(true);
    expect(wrapper.find('Table')).toHaveLength(1);
  });

  it('will check props', () => {
    const component = mount(
      <ClinicianGrid clinicianGridViewProp={clinicianGridViewProp} />,
    ).props();
    expect(component).toBeDefined();
  });
});
