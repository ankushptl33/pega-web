import React from 'react';
import MasterIndicators from './MasterIndicators';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Popup } from 'semantic-ui-react';

Enzyme.configure({ adapter: new Adapter() });
describe('<MasterIndicators />', () => {
  it('renders <MasterIndicators /> component', () => {
    const component = shallow(<MasterIndicators />);
    expect(component.exists()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should have single Button', () => {
    const component = shallow(<MasterIndicators />);
    expect(component.find('Popup').exists()).toBe(true);
    expect(component.find('Popup')).toHaveLength(2);
  });
  test('should have default props', () => {
    expect(MasterIndicators.defaultProps.value1).toBeDefined();
  });
});
