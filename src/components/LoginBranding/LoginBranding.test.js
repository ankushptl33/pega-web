import React from 'react';
import LoginBranding from './LoginBranding';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Typography from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });
describe('<LoginBranding/>', () => {
  it('renders <LoginBranding /> component', () => {
    const component = shallow(<LoginBranding />);
    expect(component.exists()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  test('should have default props', () => {
    expect(LoginBranding.defaultProps.loginleftProp.path).toBeDefined();
  });
});
