import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import PracticeNameHeader from './PracticeNameHeader';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('<PracticeNameHeader />', () => {
  it('renders <PracticeNameHeader /> component', () => {
    const component = shallow(<PracticeNameHeader />);
    expect(component.exists()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
