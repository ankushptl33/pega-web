import React from 'react';
import MasterCard from './MasterCard';
import { shallow, enzyme, configure, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<MasterCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<MasterCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
