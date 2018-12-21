import React from 'react';
import { shallow, enzyme, configure, mount } from 'enzyme';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });
import Header from './Header';
import Adapter from 'enzyme-adapter-react-16';
import { Route, Link, MemoryRouter } from 'react-router-dom';
// import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });
describe('<Header />', () => {
  test('renders', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
  // it('it should have grid classes', () => {
  //   const wrapper = mount(<MasterAccordian />);
  //   expect(wrapper.exists('.header')).toEqual(true);
  //   expect(wrapper.find('.description').exists()).toEqual(true);
  //   // expect(wrapper.find('.extra content')).toHaveLength(1);
  // });
  // it('Logout Button', () => {
  //   const component = renderer
  //     .create(
  //       <MemoryRouter>
  //         <MasterHeader />
  //       </MemoryRouter>
  //     )
  //     .toJSON();
  //   expect(component).toMatchSnapshot();
  // });
  it('it should have button class', () => {
    const wrapper = shallow(<Header />);
    // expect(wrapper.find('.btn-link').exists()).toEqual(true);
  });
});