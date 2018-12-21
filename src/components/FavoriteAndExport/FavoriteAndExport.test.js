import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import FavoritesAndExport from './FavoritesAndExport';

describe('<FavoritesAndExport />', () => {
  it('renders <FavoritesAndExport /> component', () => {
    const component = shallow(<FavoritesAndExport />);
    expect(component.exists('DataFormatExport')).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('will check ListFavorites', () => {
    const component = shallow(<FavoritesAndExport />);
    expect(component.exists('ListFavorites')).toBe(true);
  });
  it('will check props', () => {
    const component = shallow(<FavoritesAndExport />).props();
    expect(component).toBeDefined();
  });
});
