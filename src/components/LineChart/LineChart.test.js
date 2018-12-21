import React from 'react';
import LineChart from './LineChart';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Label from 'semantic-ui-react';
import LineChartData from '../../json/PracticeMeasureDetailsData.json';
import AmCharts from '@amcharts/amcharts3-react';

Enzyme.configure({ adapter: new Adapter() });

describe('<Line Chart />', () => {
  it('renders 1 <LineChart /> component', () => {
    const Line = shallow(<LineChart LineChartData={LineChartData} />);
    expect(Line.exists()).toBe(true);
    expect(Line).toHaveLength(1);
    expect(Line).toMatchSnapshot();
  });

  //   it('renders 1 <DateComponent /> component', () => {
  //     const Line = shallow(<LineChart LineChartData={LineChartData} />);
  //     expect(Line.exists()).toBe(true);
  //     expect(Line).toHaveLength(1);
  //     expect(Line).toMatchSnapshot();
  // });

  // it('Three Moment for Dates', () => {
  //     const Line = shallow(<DateComponent dates={DateData} />);
  //     expect(Line.find('ListItem').exists()).toBe(true);
  //     expect(Line.find('ListItem')).toHaveLength(3);

  // });
});
