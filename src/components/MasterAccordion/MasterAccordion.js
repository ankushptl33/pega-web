import React, { Component } from 'react';
import {
  Container,
  Divider,
  Accordion,
  Icon,
  Segment,
  Grid,
  Header,
  Card,
  Table,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

/**
 * MasterAccordian Class
 *
 * This will generate multiple accordians as per provided props
 */
class MasterAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
      headerColumns: [],
      contentGridCollection: [],
      titleGridCollection: [],
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  componentDidMount() {
    const { header, accordions } = this.props.masterAccordionProps;
    this.createHeader(header, accordions);
  }

  createHeader = (header, accordians) => {
    var headerColumns1 = [];
    var columnSequence = [];
    for (var key in header) {
      columnSequence.push(key);
      headerColumns1.push(
        <Grid.Column key={key} className="accordion__mainheader">
          {header[key]}
        </Grid.Column>,
      );
    }

    const headerColumns = (
      <Grid width="equal" className="accordionGrid">
        {headerColumns1}
      </Grid>
    );
    this.createAccordionPanels(headerColumns, accordians, columnSequence);
  };

  createAccordionPanels(headerColumns, accordians, columnSequence) {
    const { title, content } = accordians;
    let titleGridCollection = [];
    let contentGridCollection = [];
    let columnSize = 95 / columnSequence.length;
    title.data.forEach((singleData, index) => {
      let singleGrids = [];
      columnSequence.forEach((value, key) => {
        if (title.type[value] === 'string' || title.type[value] === 'number') {
          singleGrids.push(
            <Grid.Column key={key} className={singleData.className}>
              {singleData[value]}
            </Grid.Column>,
          );
        } else {
          var ChildComp = AllComponent['' + title.type[value]];
          singleGrids.push(
            <Grid.Column
              key={key}
              className="components components_progressbar">
              <ChildComp {...this.state} {...this.props} />
            </Grid.Column>,
          );
        }
      });
      titleGridCollection.push(
        <Grid
          columns="equal"
          className="accordionGrid accordionGrid__dataTable">
          {singleGrids}
          <Grid.Column className="accordion__dropdown">
            <Icon name="dropdown" />
          </Grid.Column>
        </Grid>,
      );
    });

    content.data.forEach((singleData, index) => {
      let singleGrids = [];
      for (var key in singleData) {
        if (content.type[key] === 'string' || content.type[key] === 'number') {
          singleGrids.push(
            <Grid.Column key={key}>{singleData[key]}</Grid.Column>,
          );
        } else {
          var ChildComp = AllComponent['' + content.type[key]];
          singleGrids.push(
            <Grid.Column
              key={key}
              mobile={16}
              tablet={16}
              computer={8}
              largescreen={8}
              widescreen={8}
              className="components">
              <ChildComp {...this.state} {...this.props} />
            </Grid.Column>,
          );
        }
      }
      contentGridCollection.push(
        <Grid columns="equal" className="accordionGrid">
          {singleGrids}
        </Grid>,
      );
    });
    this.setState({
      headerColumns,
      titleGridCollection,
      contentGridCollection,
    });
  }

  /**
   * render function of MasterAccordian
   */
  render() {
    const {
      headerColumns,
      titleGridCollection,
      contentGridCollection,
      activeIndex,
    } = this.state;
    let size = titleGridCollection.length;
    var content = [];

    /**
     * This loop will create accordion as per the array created from props
     */
    for (let i = 0; i < size; i++) {
      content.push(
        <React.Fragment key={i}>
          <Accordion.Title
            active={activeIndex === i}
            index={i}
            onClick={this.handleClick}
            className="accordiontitle">
            {titleGridCollection[i]}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === i}>
            {contentGridCollection[i]}
          </Accordion.Content>
        </React.Fragment>,
      );
    }

    return (
      <div className="accordionContainer">
        {headerColumns}
        <Accordion>{content}</Accordion>
      </div>
    );
  }
}

MasterAccordion.defaultProps = {
  masterAccordionProps: {
    header: {
      location: 'LOCATION NAME',
      qualified: 'QUALIFIED(ALL)',
      met: 'MET(+)',
      notMet: 'MET(-)',
      denExcl: 'DEN EXCL',
      numExcl: 'NUM EXCL',
      performance: 'PERFORMANCE',
    },
    accordions: {
      title: {
        type: {
          location: 'string',
          qualified: 'number',
          met: 'number',
          notMet: 'number',
          denExcl: 'number',
          numExcl: 'number',
          performance: 'MasterProgressBar',
        },
        data: [
          {
            location: 'DEMO LOCATION',
            qualified: '96',
            met: '96',
            notMet: '0',
            denExcl: '0',
            numExcl: '45',
            performance: '0',
          },
          {
            location: 'DEMO LOCATION',
            qualified: '96',
            met: '96',
            notMet: '0',
            denExcl: '0',
            numExcl: '45',
            performance: '0',
          },
        ],
      },
      content: {
        type: {
          component: 'MasterProgressBar',
          component1: 'MasterProgressBar',
        },
        data: [
          {
            component: 'MasterProgressBar',
            component1: 'MasterProgressBar',
          },
          {
            component: 'MasterProgressBar',
            component1: 'MasterProgressBar',
          },
        ],
      },
    },
  },
};
export default MasterAccordion;
