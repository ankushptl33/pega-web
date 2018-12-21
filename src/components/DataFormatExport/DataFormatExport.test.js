import React from 'react';
import { shallow } from 'enzyme';
import DataFormatExport from './DataFormatExport';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('<DataFormatExport />', () => {
  it('renders 1 <DataFormatExport /> component', () => {
    const component = shallow(<DataFormatExport />);
    expect(component.exists('DataFormatExport')).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('will check Button', () => {
    const component = shallow(<DataFormatExport props />);
    expect(component.exists('Button')).toBe(true);
  });

  it('will check single MenuItem', () => {
    const component = shallow(<DataFormatExport />);
    expect(component.exists('MenuItem')).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('will check type', () => {
    const component = shallow(<DataFormatExport />);
    expect(component.exists('type')).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
