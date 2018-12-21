import React from 'react';
import PracticeInformation from './PracticeInformation';
import './PracticeCardList.less';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import listViewData from '../../json/PracticeCardList.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<PracticeInformation />', () => {
  let PracticeInformation1;
  beforeEach(() => {
    PracticeInformation1 = {
      id: listViewData.data[0].id,
      logo: listViewData.data[0].logo,
      paidStatus: listViewData.data[0].paidStatus,
      agreementStatus: listViewData.data[0].agreementStatus,
      name: listViewData.data[0].name,
      progressStatus: listViewData.data[0].progressStatus,
      address: listViewData.data[0].address,
    };
  });

  it('renders <PracticeInformation /> component', () => {
    const component = shallow(
      <PracticeInformation {...PracticeInformation1} />,
    );
    expect(component.exists()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
