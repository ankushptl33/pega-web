import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import SearchAndExport from './SearchAndExport';
Enzyme.configure({ adapter: new Adapter() });

describe('<SearchAndExport />', () => {
  test('renders', () => {
    const wrapper = shallow(<SearchAndExport />);
    expect(wrapper).toMatchSnapshot();
  });
});
