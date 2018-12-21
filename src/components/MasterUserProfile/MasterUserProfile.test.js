import React from 'react';
import { shallow } from 'enzyme';
import MasterUserProfile from './MasterUserProfile';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<MasterUserProfile />', () => {
  test('renders', () => {
    const wrapper = shallow(<MasterUserProfile />);
    expect(wrapper).toMatchSnapshot();
  });
});
