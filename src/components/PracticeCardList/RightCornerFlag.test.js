import React from 'react';
import RightCornerFlag from './RightCornerFlag';
//import './PracticeCardList.less';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Chip from '@material-ui/core/Chip';

Enzyme.configure({ adapter: new Adapter() });

describe('<RightCornerFlag />', () => {
  it('renders <RightCornerFlag /> component', () => {
    const component = shallow(<RightCornerFlag />);
    expect(component.exists()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('will check props', () => {
    const component = shallow(<RightCornerFlag />).props();
    expect(component).toBeDefined();
  });
});
