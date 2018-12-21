import React from 'react';
import PracticeForm from './PracticeForm';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormControl, { Button, FormControlLabel } from '@material-ui/core';
Enzyme.configure({ adapter: new Adapter() });
describe('<PracticeForm />', () => {
  it('renders <PracticeForm /> component', () => {
    const component = shallow(<PracticeForm />);
    expect(component.exists()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should have single Button', () => {
    const component = shallow(<PracticeForm />);
    expect(component.exists(Button)).toBe(true);
  });
  it('should have single Button', () => {
    const component = shallow(<PracticeForm />);
    expect(component.exists(FormControlLabel)).toBe(true);
  });

  /*  it('Test click event onClickCell', () => {
        const addButton = jest.fn();
        const component = shallow(<Button onClick={(e) => addButton(e, this.props)} />);
       // component.find(Button).simulate('click');
    
        expect(addButton).toHaveBeenCalledTimes(1)
        }); */

  test('should have default props', () => {
    expect(
      PracticeForm.defaultProps.practiceFormProps.labels.practiceName,
    ).toBeDefined();
  });
});
