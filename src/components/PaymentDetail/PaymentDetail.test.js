import React from 'react';
import { shallow, enzyme, configure, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PaymentDetail from './PaymentDetail';
import PaymentDetailsProps from '../../json/PaymentDetail.json';

Enzyme.configure({ adapter: new Adapter() });

const DataPaymentDetailsProps = PaymentDetailsProps.PaymentDetailsProps;

describe('<PaymentDetail />', () => {
  it('renders <PaymentDetail  /> component', () => {
    const component = shallow(<PaymentDetail />);
    expect(component.exists('DataFormatExport')).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('mount component with default props', () => {
    const component = shallow(<PaymentDetail />);
    expect(component.exists()).toBe(true);
  });

  it('will check props', () => {
    const component = shallow(
      <PaymentDetail PaymentDetailsProps={DataPaymentDetailsProps} />,
    ).props();
    expect(component).toBeDefined();
  });
});
