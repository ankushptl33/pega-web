import React from 'react';
import PracticeEntityStats from './PracticeEntityStats';
import './PracticeCardList.less';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import listViewData from '../../json/PracticeCardList.json';
import Label from 'semantic-ui-react';

Enzyme.configure({ adapter: new Adapter() });

describe('<PracticeEntityStats />', () => {
  it('renders <PracticeEntityStats /> component', () => {
    const component = shallow(
      <PracticeEntityStats
        singleCard={listViewData.data[0]}
        labels={listViewData.labels}
      />,
    );
    expect(component.exists()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('Test click event onClickLocations', () => {
    const onClickLocations = jest.fn();
    const component = shallow(<button onClick={onClickLocations} />);
    component.find('button').simulate('click');
    expect(onClickLocations).toHaveBeenCalledTimes(1);
  });
  it('Test click event onClickClinicians', () => {
    const onClickClinicians = jest.fn();
    const component = shallow(<button onClick={onClickClinicians} />);
    component.find('button').simulate('click');
    expect(onClickClinicians).toHaveBeenCalledTimes(1);
  });
  it('Test click event onClickTINs', () => {
    const onClickTINs = jest.fn();
    const component = shallow(<button onClick={onClickTINs} />);
    component.find('button').simulate('click');
    expect(onClickTINs).toHaveBeenCalledTimes(1);
  });
});
