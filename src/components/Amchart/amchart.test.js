import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
// import Amchart from './amserialchart'
import renderer from 'react-test-renderer';
describe('Multiply module', function() {
  // it('renders correctly', () => {
  //   const tree = renderer.create(
  //     <Amchart />
  //   ).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('multiply numbers', () => {
    expect(2 * 5).toBe(10);
  });

  it('add numbers', () => {
    expect(2 + 5).toBe(7);
  });
});
