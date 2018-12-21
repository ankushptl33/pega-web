import React from 'react';
import PracticeCard from './PracticeCard';
import './PracticeCardList.less';
import { shallow, configure, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import listViewData from '../../json/PracticeCardList.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

Enzyme.configure({ adapter: new Adapter() });

describe('<PracticeCard />', () => {
  let practiceCard;
  beforeEach(() => {
    practiceCard = {
      id: listViewData.data[0].id,
      logo: listViewData.data[0].logo,
      paidStatus: listViewData.data[0].paidStatus,
      agreementStatus: listViewData.data[0].agreementStatus,
      name: listViewData.data[0].name,
      progressStatus: listViewData.data[0].progressStatus,
      address: listViewData.data[0].address,
    };
  });
  it('renders <PracticeCard /> component', () => {
    const component = shallow(<PracticeCard />);
    expect(component.exists()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
  it('Test click event phoneClick', () => {
    const phoneClick = jest.fn(e => {});
    const component = mount(<button onClick={phoneClick} />);
    component.find('button').simulate('click');
    expect(phoneClick).toHaveBeenCalledTimes(1);
  });
});
