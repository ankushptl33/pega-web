import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RightCornerFlag from './RightCornerFlag';
import PracticeInformation from './PracticeInformation';
import ContactDetails from './ContactDetails';
import PracticeEntityStats from './PracticeEntityStats';

import { Card, CardActions } from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import DataFormatExport from '../../components/DataFormatExport/DataFormatExport';
import './PracticeCard.less';

const PracticeCard = props => {
  return (
    <Card
      className={
        props.currentStatus == 'Active'
          ? 'figmd-list_view active--card'
          : 'figmd-list_view inactive--card'
      }
      onClick={e => props.onClickIdentity(e, props)}>
      <RightCornerFlag currentStatus={props.currentStatus} />

      {/* Main card content */}
      <CardContent className="practice--card_body">
        {/* PracticeInformation component will show image with text in card view */}
        <PracticeInformation {...props.practiceInformation} />

        {/* ContactDetails component will show communication details*/}
        <ContactDetails {...props.contactDetails} />
        <Divider light />

        {/* -------Card Footer------ */}
        <PracticeEntityStats {...props.practiceEntityStats} />
        <Divider light />
      </CardContent>

      <CardActions className="practice--card_footer--wrapper">
        {/* Expand button at the bottom */}
        <Grid className="export-container">
          <Grid className="export-dropdown">
            <DataFormatExport
              listExportProp={props.singleCard}
              labels={props.labels}
            />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

PracticeCard.defaultProps = {
  index: 1,
  currentStatus: 'Active',
  practiceInformation: {
    id: '437102',
    logo: '../../../assets/images/logo.jpg',
    paidStatus: 'Unpaid',
    agreementStatus: 'Pending',
    name: 'VIT College Pune',
    progressStatus: 'Student is in Learning Phase',
  },
  contactDetails: {
    address: 'testing',
    phone: '9867541133',
    mobile: '1234567890',
    mail: 'abcdefg@gmail.com',
    phoneClick: (e, propsData) => {
      e.stopPropagation();
      // console.log(('Phone is executed', e, propsData);
    },
    mailClick: (e, propsData) => {
      e.stopPropagation();
      // console.log(('Mail is executed', e, propsData);
    },
    mobileClick: (e, propsData) => {
      e.stopPropagation();
      // console.log(('Mobile is executed', e, propsData);
    },
    addressClick: (e, propsData) => {
      e.stopPropagation();
      // console.log(('Address is executed', e, propsData);
    },
  },
  practiceEntityStats: {
    counts: {
      serviceCount: '173',
      tinCount: '28',
      locationCount: '170',
    },
    labels: {
      serviceCount: 'Clinician/s',
      tinCount: 'TIN/s',
      locationCount: 'Location/s',
    },
    icon: {
      serviceCount: 'stethoscope',
      tinCount: 'copy',
      locationCount: 'map-marker-alt',
    },
    handlers: {
      serviceCount: (e, label, count) => {
        e.stopPropagation();
        // console.log(('serviceCount is executed', e, label, count);
      },
      tinCount: (e, label, count) => {
        e.stopPropagation();
        // console.log(('tinCount is executed', e, label, count);
      },
      locationCount: (e, label, count) => {
        e.stopPropagation();
        // console.log(('locationCount is executed', e, label, count);
      },
    },
  },
  onClickIdentity: (e, propsData) => {
    // console.log(('onClickIdentity is executed', e, propsData);
  },
};

PracticeCard.propTypes = {
  index: PropTypes.number,
  currentStatus: PropTypes.string,
  contactDetails: PropTypes.object,
  practiceInformation: PropTypes.object,
  practiceEntityStats: PropTypes.object,
  onClickIdentity: PropTypes.func,
};

export default PracticeCard;
