import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import * as AllComponents from '../../containers/NavigationMapping/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from '@material-ui/core/Icon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './BasicAccordion.less';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  expanded: {
    border: '1px solid #4194F2',
  },
});

/**
 * This is a BasicAccordion Component
 */
class BasicAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
    };
  }

  /* On props change it will initialise state */
  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded) {
      this.setState({ expanded: nextProps.expanded });
    } else {
      this.setState({ expanded: null });
    }
  }

  /**
   * This function is to handle click event for the Accordion- ExpansionPanel
   *
   * User can write his own function and pass it as action through props
   */
  handleChange = (panel, singleAccordion) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
    if (expanded) {
      this.props.accordions.action
        ? this.props.accordions.action(event, singleAccordion)
        : null;
    }
  };

  addFavourite = (event, singleAccordion) => {
    event.stopPropagation();
    {
      this.props.accordions.iconAction
        ? this.props.accordions.iconAction(event, singleAccordion)
        : null;
    }
  };

  onComponentClicked = (event, componentProps) => {
    // console.log((componentProps);
    {
      componentProps.isStopPropagation ? event.stopPropagation() : null;
    }
  };

  render() {
    const { expanded } = this.state;
    const { config } = this.props;
    const { header, accordions } = this.props;

    const { classes } = this.props;

    if (header == undefined || header == null) {
      return "No Records found.";
    }
    if (!accordions.data || accordions.data.length === 0) {
      return "No Records found.";
    }

    var tempHeaderColumns = [];
    var columnSequence = [];
    for (var key in header) {
      columnSequence.push(key);
      if (accordions.type[key] === 'string') {
        tempHeaderColumns.push(
          <Grid
            item
            key={key}
            xs={config.stringColumn}
            className={'fig-ac_' + key}>
            <Typography className="header-column-content">
              {header[key]}
            </Typography>
          </Grid>,
        );
      } else if (accordions.type[key] === 'icon') {
        tempHeaderColumns.push(
          <Grid
            item
            key={key}
            xs={config.iconColumn}
            className={'fig-ac_' + key}>
            <Typography className="header-column-content">
              {header[key]}
            </Typography>
          </Grid>,
        );
      } else if (accordions.type[key] === 'number') {
        tempHeaderColumns.push(
          <Grid
            item
            key={key}
            xs={config.numberColumn}
            className={'fig-ac_' + key}>
            <Typography className="header-column-content">
              {header[key]}
            </Typography>
          </Grid>,
        );
      } else {
        tempHeaderColumns.push(
          <Grid
            item
            key={key}
            xs={config.componentColumn}
            className={'fig-ac_' + key}>
            <Typography className="header-column-content">
              {header[key]}
            </Typography>
          </Grid>,
        );
      }
    }

    const headerColumns = (
      tempHeaderColumns.length > 0 ?
        <ExpansionPanel disabled className="expansionPanal-header">
          <ExpansionPanelSummary className="ExpansionPanelSummary-header">
            <Grid className="header-content" container>
              {tempHeaderColumns}
            </Grid>
          </ExpansionPanelSummary>
        </ExpansionPanel> :
        null
    );

    const { data, type, content } = accordions;
    let accordionCollection = [];
    let row = [];
    let ChildComp = AllComponents['' + content];

    data.forEach((singleData, index) => {
      let accordionTitle = [];
      let accordianContent = [];
      columnSequence.forEach((value, key) => {
        if (accordions.type[value] === 'string') {
          accordionTitle.push(
            <Grid
              item
              xs={config.stringColumn}
              key={key}
              className={'fig-ac_' + value}>
              <Typography>{singleData[value]}</Typography>
            </Grid>,
          );
        } else if (accordions.type[value] === 'icon') {
          let iconClassName = singleData[value]['name'] + ' icon';
          // console.log((singleData[value]['name'], iconClassName);
          accordionTitle.push(
            <Grid
              item
              xs={config.iconColumn}
              key={key}
              className={'fig-ac_' + value}>
              <i
                aria-hidden="true"
                className={iconClassName}
                onClick={e => this.addFavourite(e, singleData)}
              />
            </Grid>,
          );
        } else if (accordions.type[value] === 'number') {
          accordionTitle.push(
            <Grid
              item
              xs={config.numberColumn}
              key={key}
              className={'fig-ac_' + value}>
              <Typography>{singleData[value]}</Typography>
            </Grid>,
          );
        } else {
          var ChildComp = AllComponents['' + accordions.type[value]];
          accordionTitle.push(
            <Grid
              item
              key={key}
              className="fig-accordionTitle"
              xs={config.componentColumn}
              onClick={e => this.onComponentClicked(e, data[index][value])}
              className={'fig-ac_' + value}>
              <ChildComp {...data[index][value]} />
            </Grid>,
          );
        }
      });

      let ChildComp = AllComponents['' + content];
      row.push(
        <ExpansionPanel
          key={index}
          expanded={expanded === index}
          onChange={this.handleChange(index, singleData)}
          classes={{ expanded: classes.expanded }}
          className="ExpansionPanel-tablebody">
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className="ExpansionPanelSummary-tablebody">
            <Grid className="ExpansionPanelSummary-container" container>
              {accordionTitle}
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={24}>
              <Grid item xs className="ExpansionPanel__open">
                {expanded === index ? <ChildComp {...singleData} /> : null}
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>,
      );
    });

    accordionCollection.push(row);

    return (
      <React.Fragment>
        <div className="fig-BasicAccordion">
          <Grid item xs className="expansion-group">
            {headerColumns}
          </Grid>
          <Grid item xs className="expansion-group-tablebody">
            {
              headerColumns !== null && headerColumns !== undefined ?
                (accordionCollection !== null && accordionCollection !== undefined && accordionCollection[0] !== null && accordionCollection[0] !== undefined && accordionCollection[0].length != 0 ?
                  accordionCollection :
                  "No Records found.") :
                "No Records found."
            }
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

BasicAccordion.defaultProps = {
  config: {
    iconColumn: 1,
    numberColumn: 1,
    stringColumn: 5,
    componentColumn: 5,
  },
  header: {
    favourite: 'Favourite',
    id: 'ID',
    measure: 'MEASURE',
    achievePerformance: 'ACHIEVE PERFORMANCE',
  },
  accordions: {
    type: {
      favourite: 'icon',
      id: 'number',
      measure: 'string',
      achievePerformance: 'Performance',
    },
    data: [
      {
        favourite: {
          name: 'heart',
        },
        id: '224-1',
        measure: 'Melanoma: Overutilization of Imaging Studies in Melanoma',
        achievePerformance: {
          performanceData: {
            performanceText: 'Achieved Performance',
            performance: 73.59,
            performancePosition: 'right',
            benchMark: [
              {
                label: 'Registry Average',
                data: 25,
                position: 'above',
                colorcode: '',
              },
              {
                label: 'Registry BenchMark',
                data: 40,
                position: 'above',
                colorcode: '',
              },
              {
                label: 'CMS Average',
                data: 89,
                position: 'below',
                colorcode: '',
              },
            ],
            colorcode: 'progress-bar-success',
          },
        },
      },
      {
        favourite: {
          name: 'heart',
        },
        id: '224-2',
        measure: 'Melanoma: Overutilization of Imaging Studies in Melanoma',
        achievePerformance: {
          performanceData: {
            performanceText: 'Achieved Performance',
            performance: 73.59,
            performancePosition: 'right',
            benchMark: [
              {
                label: 'Registry Average',
                data: 25,
                position: 'above',
                colorcode: '',
              },
              {
                label: 'Registry BenchMark',
                data: 40,
                position: 'above',
                colorcode: '',
              },
              {
                label: 'CMS Average',
                data: 89,
                position: 'below',
                colorcode: '',
              },
            ],
            colorcode: 'progress-bar-success',
          },
        },
      },
    ],
    content: 'Footer',
    action: (e, singleAccordion) => {
      // console.log(('Accordion Action--', e, singleAccordion);
    },
    iconAction: (e, singleAccordion) => {
      // console.log(('Clicked on Icon--', e, singleAccordion);
    },
  },
};

BasicAccordion.propTypes = {
  config: PropTypes.object,
  header: PropTypes.object,
  accordions: PropTypes.object,
};

export default withStyles(styles)(BasicAccordion);
