import React from 'react';
import AddTinForm from './AddTinForm';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '@material-ui/core';
Enzyme.configure({ adapter: new Adapter() });
describe('<AddTinForm />', () => {
  it('renders <AddTinForm /> component', () => {
    const component = shallow(<AddTinForm />);
    expect(component.exists()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should have single Button', () => {
    const component = shallow(<AddTinForm />);
    expect(component.exists(Button)).toBe(true);
  });

  it('check props', () => {
    const component = shallow(<AddTinForm />).props();
    expect(component).toBeDefined();
  });

  // test('should have proptypes props', () => {
  //     expect(AddTinForm.propTypes.heading).toBeDefined();
  // });
});
