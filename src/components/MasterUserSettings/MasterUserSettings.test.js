import React from 'react';
import { shallow } from 'enzyme';
import MasterUserSettings from './MasterUserSettings';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<MasterUserSettings />', () => {
  test('renders', () => {
    const wrapper = shallow(<MasterUserSettings />);
    expect(wrapper).toMatchSnapshot();
  });
});
