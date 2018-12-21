import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PracticeCardList.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PracticeCard from './PracticeCard';
import Grid from '@material-ui/core/Grid';

const practiceLogo = '../../assets/svg/user_profile.png';

/**
 *  PracticeCardList component
 */
const PracticeCardList = props => {
  const { labels, data } = props.figmdListViewProp;

  return (
    <Grid spacing={32} container>
      {data.map((singleCard, index) => {
        return (
          <Grid item key={index} xs className="figmd-list_view--wrapper ">
            <PracticeCard
              key={index}
              onClickIdentity={props.onClickIdentity}
              phoneClick={props.phoneClick}
              mailClick={props.mailClick}
              mobileClick={props.mobileClick}
              addressClick={props.addressClick}
              serviceCount={props.serviceCount}
              tinCount={props.tinCount}
              locationCount={props.locationCount}
              key={index}
              singleCard={singleCard}
              labels={props.labels}
              practiceLogo={props.practiceLogo}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

PracticeCardList.defaultProps = {
  figmdListViewProp: {
    labels: {
      id: 'Pract. ID.',
      logo: '../../../assets/svg/call.svg',
      name: 'College Name',
      currentStatus: 'Active/In-active Status',
      progressStatus: 'Status',
      agreementStatus: 'Active/rejected/pending',
      paidStatus: 'Paid/Unpaid Status',
      address: 'Address',
      cell: 'Contact No.',
      mail: 'Email ID.',
      serviceCount: 'Teacher',
      tinCount: 'Labs',
      locationCount: 'Students',
    },
    data: [
      {
        id: '437102',
        logo: '../../../assets/images/logo.jpg',
        name: 'ABC College',
        currentStatus: 'Active',
        paidStatus: 'Paid',
        agreementStatus: 'Active',
        progressStatus: 'Development',
        address: '1250 16th street santa monica, CA 90404',
        cell: '424-259-6000',
        mail: 'abccollege@gmail.com',
        serviceCount: '173',
        tinCount: '28',
        locationCount: '179',
      },
      {
        id: '437103',
        logo: '../../../assets/images/logo.jpg',
        name: 'MGC College',
        currentStatus: 'Inactive',
        agreementStatus: 'Rejected',
        paidStatus: 'Unpaid',
        progressStatus: 'Improved',
        address: 'Baner pashan road',
        cell: '424-259-6999',
        mail: 'mgccollege@gmail.com',
        serviceCount: '200',
        tinCount: '80',
        locationCount: '10',
        ehrCount: '100',
      },
    ],
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
    onClickIdentity: (e, propsData) => {
      // console.log(('onClickIdentity is executed', e, propsData);
    },
  },
};

PracticeCardList.propTypes = {
  figmdListViewProp: PropTypes.object,
  phoneClick: PropTypes.func,
  mailClick: PropTypes.func,
  mobileClick: PropTypes.func,
  addressClick: PropTypes.func,
  serviceCount: PropTypes.func,
  tinCount: PropTypes.func,
  locationCount: PropTypes.func,
  onClickIdentity: PropTypes.func,
};

export default PracticeCardList;
