import React from 'react';
import Measure from './Measure';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Tooltip, Grid } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });
describe('<Measure />', () => {
  it('renders <Measure /> component', () => {
    const component = shallow(<Measure />);
    expect(component.exists()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('renders', () => {
    const wrapper = shallow(<Measure />);
    expect(wrapper.find(Tooltip).exists()).toBe(true);
    expect(wrapper.find(Tooltip)).toHaveLength(2);
  });

  test('should have default props', () => {
    expect(Measure.defaultProps.value).toBeDefined();
  });
});
