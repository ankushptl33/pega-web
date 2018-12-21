import React from 'react';
import { shallow } from 'enzyme';
import MasterAmcharts from './MasterAmcharts';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<MasterAmcharts />', () => {
  test('renders', () => {
    const wrapper = shallow(<MasterAmcharts />);
    expect(wrapper).toMatchSnapshot();
  });
});
