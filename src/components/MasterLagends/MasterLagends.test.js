import React from 'react';
import { shallow } from 'enzyme';
import MasterLagends from './MasterLagends';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<MasterLagends />', () => {
  test('renders', () => {
    const wrapper = shallow(<MasterLagends />);
    expect(wrapper).toMatchSnapshot();
  });
});
