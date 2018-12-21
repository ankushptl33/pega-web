import React from 'react';
import { shallow, enzyme, configure, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import Footer from './Footer';
import { Route, Link, MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });
{
  /*test case for footer component*/
}
describe('<Footer />', () => {
  test('footer', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });

  {
    /*test case for route*/
  }
  it('Footer Route', () => {
    const component = renderer
      .create(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  {
    /*test case for button class*/
  }
  it('it should have button class', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.btn-link').exists()).toEqual(true);
  });
});
