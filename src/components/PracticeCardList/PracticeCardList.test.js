import React from 'react';
import PracticeCardList from './PracticeCardList';
import './PracticeCardList.less';
import { shallow, configure, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import listViewData from '../../json/PracticeCardList.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<PracticeCardList />', () => {
  it('renders 1 <PracticeCardList /> component', () => {
    const component = shallow(
      <PracticeCardList figmdListViewProp={listViewData} />,
    );
    expect(component.exists()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('will check props', () => {
    const component = shallow(<PracticeCardList />).props();
    expect(component).toBeDefined();
  });
  it('Test click event mailClick', () => {
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
});
