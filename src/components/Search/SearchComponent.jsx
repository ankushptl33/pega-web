import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import { getSearchMapping } from '../../utils/utils';

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.state = {
      searchParam: props.searchParam,
    };
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    if (value.length > 1) {
      var postParam = this.props.searchParam.params;
      postParam.search = value;
      axios({
        method: 'post',
        url: this.props.searchParam.url,
        headers: { 'Content-Type': 'application/json' },
        data: postParam,
      })
        .then(response => {
          this.setState({
            isLoading: false,
            results: getSearchMapping(response.data.result),
          });
        })
        .catch(error => {}); // console.log((error));
    }
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
        {...this.props}
        placeholder={'Search.....'}
        size={'mini'}
      />
    );
  }
}
