import React from 'react';
import { shallow } from 'enzyme';
import MasterNotifications from './MasterNotifications';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<MasterNotifications />', () => {
  test('renders', () => {
    const wrapper = shallow(<MasterNotifications />);
    expect(wrapper).toMatchSnapshot();
  });
});
