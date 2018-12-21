import React, { Component } from 'react';

const SearchContext = React.createContext();

export default class SearchProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: 'amjad',
    };
  }
  render() {
    return (
      <SearchContext.Provider value="I am the value">
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}
