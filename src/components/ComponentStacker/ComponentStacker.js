import React, { Component } from 'react';
import * as AllComponents from '../../json/NavigationMapping';
import { Container, Segment, Grid } from 'semantic-ui-react';

/**
 * This component is design to add multiple components in single container
 */
class ComponentStacker extends Component {
  render() {
    const { componentStackerProps } = this.props;
    const data = componentStackerProps.map((singleTab, index) => {
      let ChildComp = AllComponents['' + singleTab];
      return <ChildComp key={index} {...this.state} {...this.props} />;
    });

    return <div className="tabcontent--data__wrapper">{data}</div>;
  }
}

ComponentStacker.defaultProps = {
  componentStackerProps: ['MasterUserProfile', 'BasicAccordion'],
};

export default ComponentStacker;
