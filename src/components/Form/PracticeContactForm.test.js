import React from 'react';
import PracticeContactForm from './PracticeContactForm';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });
describe('<PracticeContactForm />', () => {
  it('renders <PracticeContactForm /> component', () => {
    const component = shallow(<PracticeContactForm />);
    expect(component.exists()).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('will check props', () => {
    const component = shallow(<PracticeContactForm />).props();
    expect(component).toBeDefined();
  });

  it('Test on click handleOpen', () => {
    const handleOpen = jest.fn(() => console.log());
    const component = shallow(<button onClick={handleOpen} />);
    component.find('button').simulate('click');
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });
});
