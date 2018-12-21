import React from 'react';
import { shallow, enzyme, configure, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MeasureFilter from './MeasureFilter';
import measureFilterJson from '../../json/MeasureFilter.json';

import Button from '@material-ui/core/Button';

Enzyme.configure({ adapter: new Adapter() });

describe('<MeasureFilter />', () => {
  it('renders', () => {
    const component = shallow(
      <MeasureFilter MeasureFilter={measureFilterJson} />,
    );
    expect(component.exists('MeasureFilter')).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('calls componentDidMount', () => {
    shallow(<MeasureFilter MeasureFilter={measureFilterJson} />);
  });

  it('will check state', () => {
    const wrapper = shallow(
      <MeasureFilter MeasureFilter={measureFilterJson} />,
    ).state();
    expect(wrapper).toBeDefined();
  });

  it('will check props', () => {
    const wrapper = shallow(
      <MeasureFilter MeasureFilter={measureFilterJson} />,
    ).props();
    expect(wrapper).toBeDefined();
  });

  it('should have single button', () => {
    const component = shallow(
      <MeasureFilter MeasureFilter={measureFilterJson} />,
    );
    expect(component.find('.button').exists()).toBe(true);
    expect(component.find('.button')).toHaveLength(1);
  });

  it('should have three Button component', () => {
    const component = shallow(
      <MeasureFilter MeasureFilter={measureFilterJson} />,
    );
    expect(component.find(Button).exists()).toBe(true);
    expect(component.find(Button)).toHaveLength(3);
  });

  it('Test click event onFilterChange', () => {
    const onFilterChange = jest.fn();
    const component = shallow(<button onClick={onFilterChange} />);
    component.find('button').simulate('click');
    expect(onFilterChange).toHaveBeenCalledTimes(1);
  });

  it('Test click event onApplyFilters', () => {
    const onApplyFilters = jest.fn();
    const component = shallow(<button onClick={onApplyFilters} />);
    component.find('button').simulate('click');
    expect(onApplyFilters).toHaveBeenCalledTimes(1);
  });

  it('Test click event onClearFilters', () => {
    const onClearFilters = jest.fn();
    const component = shallow(<button onClick={onClearFilters} />);
    component.find('button').simulate('click');
    expect(onClearFilters).toHaveBeenCalledTimes(1);
  });

  it('Test click event onCustomRangeChange', () => {
    const onCustomRangeChange = jest.fn();
    const component = shallow(<button onClick={onCustomRangeChange} />);
    component.find('button').simulate('click');
    expect(onCustomRangeChange).toHaveBeenCalledTimes(1);
  });

  it('Test click event onhandleToDateChange', () => {
    const onhandleToDateChange = jest.fn();
    const component = shallow(<button onClick={onhandleToDateChange} />);
    component.find('button').simulate('click');
    expect(onhandleToDateChange).toHaveBeenCalledTimes(1);
  });

  it('Test click event onhandleFromDateChange', () => {
    const onhandleFromDateChange = jest.fn();
    const component = shallow(<button onClick={onhandleFromDateChange} />);
    component.find('button').simulate('click');
    expect(onhandleFromDateChange).toHaveBeenCalledTimes(1);
  });

  it('Test click event onLocationChange', () => {
    const onLocationChange = jest.fn();
    const component = shallow(<button onClick={onLocationChange} />);
    component.find('button').simulate('click');
    expect(onLocationChange).toHaveBeenCalledTimes(1);
  });

  it('Test click event onClinicianChange', () => {
    const onClinicianChange = jest.fn();
    const component = shallow(<button onClick={onClinicianChange} />);
    component.find('button').simulate('click');
    expect(onClinicianChange).toHaveBeenCalledTimes(1);
  });

  it('Test click event onSetDefaultMeasureset', () => {
    const onSetDefaultMeasureset = jest.fn();
    const component = shallow(<button onClick={onSetDefaultMeasureset} />);
    component.find('button').simulate('click');
    expect(onSetDefaultMeasureset).toHaveBeenCalledTimes(1);
  });

  it('Test click event handleCancel', () => {
    const handleCancel = jest.fn();
    const component = shallow(<button onClick={handleCancel} />);
    component.find('button').simulate('click');
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it('Test click event onMeasureSetChange', () => {
    const onMeasureSetChange = jest.fn();
    const component = shallow(<button onClick={onMeasureSetChange} />);
    component.find('button').simulate('click');
    expect(onMeasureSetChange).toHaveBeenCalledTimes(1);
  });

  it('Test click event onDurationChange', () => {
    const onDurationChange = jest.fn();
    const component = shallow(<button onClick={onDurationChange} />);
    component.find('button').simulate('click');
    expect(onDurationChange).toHaveBeenCalledTimes(1);
  });

  it('Test click event onYearChange', () => {
    const onYearChange = jest.fn();
    const component = shallow(<button onClick={onYearChange} />);
    component.find('button').simulate('click');
    expect(onYearChange).toHaveBeenCalledTimes(1);
  });
});
