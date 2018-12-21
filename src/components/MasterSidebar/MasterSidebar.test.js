import React from 'react';
import { shallow, enzyme, configure, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import MasterSidebar from './MasterSidebar';

describe('<MasterSidebar />', () => {
  test('renders', () => {
    const wrapper = shallow(<MasterSidebar />);
    expect(wrapper).toMatchSnapshot();
  });
});
