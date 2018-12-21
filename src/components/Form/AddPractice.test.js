import React from 'react';
import AddPractice from './AddPractice';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from 'semantic-ui-react';

Enzyme.configure({ adapter: new Adapter() });
describe('<AddPractice />', () => {
  it('renders <AddPractice /> component', () => {
    const component = shallow(<AddPractice />);
    expect(component.exists()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should have single Button', () => {
    const component = shallow(<AddPractice />);
    expect(component.find('Button').exists()).toBe(true);
    expect(component.find('Button')).toHaveLength(1);
  });

  test('should have default props', () => {
    expect(AddPractice.defaultProps.address1).toBeDefined();
  });
});
