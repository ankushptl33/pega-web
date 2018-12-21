import React, { Component } from 'react';
import { Icon, Grid, Label, Popup } from 'semantic-ui-react';

class MasterIndicators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      url: '',
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
  }
  pdf = () => {
    this.setState({
      url: this.props.url,
    });
    window.open(this.props.url, '_blank');
  };

  render() {
    const value = this.state.value;
    const url = this.props.url;
    //// console.log((url)

    return (
      <Grid.Row>
        <Popup
          trigger={<Icon name="exclamation circle outline" />}
          content={this.props.info}
          basic
        />

        <Icon name="file alternate outline" onClick={this.pdf} />

        {value ? <Icon name="arrow up" /> : <Icon name="arrow down" />}
        <Popup
          trigger={<Icon name="thumbs up outline" />}
          content={this.props.value}
          basic
        />
      </Grid.Row>
    );
  }
}
MasterIndicators.defaultProps = {
  info: ['FIGmd-abc@figmd.in', 'Registry-xyz@Registry.com'],

  value1: ['higher score for this measure is better'],
  value: 0,
  url: './src/components/MajorIndicator/Hello.txt',
  melanoma: 'Overutilization of imaging studies in Melanoma',
};

export default MasterIndicators;
