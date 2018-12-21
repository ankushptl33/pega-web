import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as AllComponents from '@/json/NavigationMapping';

import './MasterTab.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * As discussed with Abhijit Raut, we commented this hard-coded style
 *
 * UX team will implement css-styles in .less file.
 * They can use below commented style.
 *
 */

const styles = theme => ({
  tabContainerSpace: {
    padding: theme.spacing.unit * 3,
  },
});

/**
 * This is a MasterTab component
 *
 * You can use this component to create Tab and its respective content layout
 * In this, there are two varients, one is simple Tab and sencond is Tab with icon
 * You can refer default props for the implementation of this component
 */
class MasterTab extends React.Component {
  constructor(props) {
    super(props);

    // console.log(('MasterTab===>', this);

    this.state = {
      value: 0,
    };
  }

  /**
   * This lifecycle method will check, if there is default tab selection props
   * i.e activeIndex is passed,
   * if exists, it will render respective tab else default tab will be of 0 th index
   */
  componentDidMount() {
    {
      this.props.activeIndex
        ? this.setState({ value: this.props.activeIndex })
        : null;
    }
  }

  /**
   * This funtion will call when click event occured on tab
   */
  handleChange = (event, value) => {
    this.setState({ value });
    {
      this.props.action ? this.props.action(value) : null;
    }
  };

  /**
   * This is render funtion of the MasterTab Component
   */
  render() {
    const { value } = this.state;
    const { classes } = this.props;
    const tabProps = this.props.masterTabProp;
    let tabs = [];
    let tabIcons = [];
    let tabContentProps = [];

    tabProps.map((value, key) => {
      tabs.push(tabProps[key].menuItem);
      tabIcons.push(tabProps[key].fontIcon);
      tabContentProps.push(tabProps[key].tabContentProps);
    });

    // console.log(('tabProps[value].router===>', tabProps[value].router);
    // console.log(('AllComponents===>', AllComponents);
    const TabPane = AllComponents[tabProps[value].router];

    return (
      <Paper square className="mastertab-outer">
        <Tabs
          className="mastertab__tab"
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          // scrollable
          scrollButtons="auto">
          {tabs.map((tab, key) => {
            if (tabIcons[key]) {
              return (
                <Tab
                  className="mastertab__tab__tab-content"
                  key={key}
                  label={tab}
                  icon={
                    <FontAwesomeIcon
                      icon={['fal', tabIcons[key]]}
                      className="tabgroup__iconimage"
                    />
                  }
                />
              );
            } else {
              return <Tab key={key} label={tab} />;
            }
          })}
        </Tabs>
        {value >= 0 && (
          <div className={classes.tabContainerSpace}>
            <TabPane tabContentProps={tabContentProps[value]} />
          </div>
        )}
      </Paper>
    );
  }
}

MasterTab.defaultProps = {
  masterTabProp: [
    {
      menuItem: 'PRACTICE',
      defaultActiveIndex: true,
      iconUrl: '../../assets/svg/practice.svg',
      fontIcon: 'hospital-alt',
      router: 'BasicGrid',
    },
    {
      menuItem: 'CLINICIANS',
      defaultActiveIndex: false,
      iconUrl: '../../assets/svg/clinician.svg',
      fontIcon: 'stethoscope',
      router: 'BasicAccordion',
    },
    {
      menuItem: 'LOCATIONS',
      defaultActiveIndex: false,
      iconUrl: '../../assets/svg/ehr.svg',
      fontIcon: 'map-marker-alt',
      router: 'BasicAccordion',
    },
  ],
  action: value => {
    // console.log(('Put Action here', value);
  },
  activeIndex: 0,
};

MasterTab.propTypes = {
  masterTabProp: PropTypes.array.isRequired,
};

export default withStyles(styles)(MasterTab);
