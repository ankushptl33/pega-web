import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Label, Image, Icon, Container } from 'semantic-ui-react';
import './ClinicianGrid.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../../assets/images/logo.jpg';

const ClinicianGrid = props => {
  const { labels, data } = props.clinicianGridViewProp;

  return (
    //This will render the final table
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>
            {labels.name + ' & ' + labels.npi}
          </Table.HeaderCell>
          <Table.HeaderCell>{labels.clinicianType}</Table.HeaderCell>
          <Table.HeaderCell>{labels.role}</Table.HeaderCell>
          <Table.HeaderCell>{labels.tinDetails}</Table.HeaderCell>
          <Table.HeaderCell>{labels.phone}</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((singleRow, index) => {
          //This will render complete row for a single object passed from through the props
          const RoleLable =
            singleRow.role == '' ? (
              <span>{singleRow.role}</span>
            ) : (
              <Label basic>{singleRow.role}</Label>
            );
          return (
            <Table.Row key={index}>
              <Table.Cell>
                <Image src={logo} size="mini" />
              </Table.Cell>
              <Table.Cell>{singleRow.name + ' ' + singleRow.npi}</Table.Cell>
              <Table.Cell>
                <FontAwesomeIcon icon={['fal', 'stethoscope']} />
              </Table.Cell>
              <Table.Cell>{RoleLable}</Table.Cell>
              <Table.Cell>
                {singleRow.tinDetails +
                  ' ' +
                  singleRow.tinFromDate +
                  ' to ' +
                  singleRow.tinEndDate}
              </Table.Cell>
              <Table.Cell>{singleRow.phone + ' ' + singleRow.mail}</Table.Cell>
              <Table.Cell>
                <FontAwesomeIcon className="edit-icon" icon={['fal', 'pen']} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

ClinicianGrid.defaultProps = {
  clinicianGridViewProp: {
    labels: {
      logo: 'Logo',
      name: 'NAME',
      npi: 'NPI',
      clinicianType: 'CLINICIAN TYPE',
      role: 'ROLE',
      tinDetails: 'TIN DETAILS',
      tinFromDate: 'TIN START DATE',
      tinEndDate: 'TIN END DATE',
      phone: 'CONTACT DETAILS',
      mail: 'EMAIL ID',
      editIcon: 'EDIT ICON',
    },
    data: [
      {
        logo: '../../../assets/images/logo.jpg',
        name: 'Smith Mary',
        npi: '2345634567',
        clinicianType: '../../../assets/images/logo.jpg',
        role: 'Practice Admin',
        tinDetails: '3456782390',
        tinFromDate: '01 Jan 2018',
        tinEndDate: '31 Dec 2018',
        phone: '617-726-2000',
        mail: 'marysmith@gmail.com',
        editIcon: '../../../assets/images/logo.jpg',
      },
    ],
  },
};

ClinicianGrid.propTypes = {
  clinicianGridViewProp: PropTypes.object.isRequired,
};

export default ClinicianGrid;
