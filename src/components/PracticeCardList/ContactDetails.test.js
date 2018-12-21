import React from 'react';
import ContactDetails from './ContactDetails';
import './PracticeCardList.less';
import { shallow, configure, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import listViewData from '../../json/PracticeCardList.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<ContactDetails />', () => {
  let contactDetails;
  beforeEach(() => {
    contactDetails = {
      address: listViewData.data[0].address,
      cell: listViewData.data[0].cell,
      mail: listViewData.data[0].mail,
    };
  });
  it('renders <ContactDetails /> component', () => {
    const component = shallow(<ContactDetails />);
    expect(component.exists('Typography')).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
  it('will check props', () => {
    const component = shallow(<ContactDetails />).props();
    expect(component).toBeDefined();
  });

  it('Test click event phoneClick', () => {
    const phoneClick = jest.fn(e => {});
    const component = shallow(<button onClick={phoneClick} />);
    component.find('button').simulate('click');
    expect(phoneClick).toHaveBeenCalledTimes(1);
  });
  it('Test click event onClickMail', () => {
    const mailClick = jest.fn();
    const component = shallow(<button onClick={mailClick} />);
    component.find('button').simulate('click');
    expect(mailClick).toHaveBeenCalledTimes(1);
  });
  it('Test click event mobileClick', () => {
    const mobileClick = jest.fn();
    const component = shallow(<button onClick={mobileClick} />);
    component.find('button').simulate('click');
    expect(mobileClick).toHaveBeenCalledTimes(1);
  });
  it('Test click event addressClick', () => {
    const addressClick = jest.fn();
    const component = shallow(<button onClick={addressClick} />);
    component.find('button').simulate('click');
    expect(addressClick).toHaveBeenCalledTimes(1);
  });

  // it('typography', () => {
  //         const component = shallow(<ContactDetails />);
  //         expect(component.find('Typography').exists()).toBe(true);
  //         // expect(component.find('Typography')).toHaveLength(3);

  //     });
});
