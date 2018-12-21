import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import ProgressBar from './ProgressBar';
import Adapter from 'enzyme-adapter-react-16';
import MasterProgressProps from '../../json/ProgressBar.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<ProgressBar />', () => {
  it('renders', () => {
    const wrapper = shallow(<ProgressBar />);
    expect(wrapper.exists('ProgressBar')).toBe(true);
    expect(wrapper).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('component with default props', () => {
    const wrapper = shallow(<ProgressBar />);
    expect(wrapper.exists()).toBe(true);
  });

  it('will check props', () => {
    const wrapper = shallow(
      <ProgressBar ProgressBar={MasterProgressProps} />,
    ).props();
    expect(wrapper).toBeDefined();
  });
});
