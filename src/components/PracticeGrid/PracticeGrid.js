import React, { Component } from 'react';
import {
  Table,
  Image,
  Grid,
  Container,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../../assets/images/logo.jpg';

const PracticeGrid = props => {
  //// console.log((this.props.practiceadmin, "\n", this.props.practicetin);
  const { header } = props.PracticeGridprops;
  const cols = props.PracticeGridprops.content.heading;
  const data = props.PracticeGridprops.content.data;
  const { heading } = props.PracticeGridprops.content;

  return (
    <Grid.Row attached>
      <Grid.Column>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              {header.title} ({header.count})
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FontAwesomeIcon className="plus--icon" icon={['fas', 'plus']} />
              {header.buttontext}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Grid.Column>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            {heading.map(function(heading, index) {
              return <Table.Cell key={index}>{heading.label}</Table.Cell>;
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(function(item, i) {
            var cells = cols.map(function(colData, index) {
              if (colData.key == 'logo') {
                return (
                  <Table.Cell key={index}>
                    <Image src={logo} size="mini" />
                  </Table.Cell>
                );
              } else if (colData.key == 'editicon') {
                return (
                  <Table.Cell key={index}>
                    <FontAwesomeIcon className="edit" icon={['fal', 'pen']} />
                  </Table.Cell>
                );
              } else {
                return <Table.Cell key={index}>{item[colData.key]}</Table.Cell>;
              }
            });
            return <Table.Row key={i}>{cells}</Table.Row>;
          })}
        </Table.Body>
      </Table>
    </Grid.Row>
  );
};

PracticeGrid.defaultProps = {
  PracticeGridprops: {
    header: {
      title: 'PRACTICE TIN DETAILS',
      count: '28',
      buttontext: ' Add New TIN',
    },
    content: {
      heading: [
        { key: 'tin', label: 'TIN DETAILS' },
        { key: 'startdate', label: 'DURATION' },
        { key: 'enddate', label: '' },
        { key: 'editicon', label: '' },
      ],
      data: [
        {
          tin: '3456782390',
          startdate: '01 Jan 2018',
          enddate: '31 Dec 2018',
          editicon: '',
        },
        {
          tin: '3456782390',
          startdate: '01 Jan 2018',
          enddate: '31 Dec 2018',
          editicon: '',
        },
        {
          tin: '3456782390',
          startdate: '01 Jan 2018',
          enddate: '31 Dec 2018',
          editicon: '',
        },
        {
          tin: '3456782390',
          startdate: '01 Jan 2018',
          enddate: '31 Dec 2018',
          editicon: '',
        },
        {
          tin: '3456782390',
          startdate: '01 Jan 2018',
          enddate: '31 Dec 2018',
          editicon: '',
        },
      ],
    },
  },
};

PracticeGrid.propTypes = {
  PracticeGridprops: PropTypes.object.isRequired,
};

export default PracticeGrid;
