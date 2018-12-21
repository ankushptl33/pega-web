import React from 'react';
import { shallow } from 'enzyme';
import ComponentStacker from './ComponentStacker';

describe('<ComponentStacker />', () => {
  test('renders', () => {
    const wrapper = shallow(<ComponentStacker />);
    expect(wrapper).toMatchSnapshot();
  });
});
