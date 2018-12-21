import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Chip,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import './PracticeInformation.less';

const PracticeInformation = props => {
  return (
    <Grid container className="practice-card--header">
      <Grid item xs={props.config.xs_logo} className="logo-practice--wrapper">
        <img src={props.logo} className="logo-practice" />
      </Grid>
      <Grid
        item
        xs={props.config.xs_content}
        className="practice__singlecard--wrapper">
        <List className="singlecard__group--content">
          <ListItem as={props.config.heading} className="singlecard__group">
            {/* ID name with value(data) */}
            <span className="singlecard__id">{props.id}</span>
            <Chip
              label={props.paidStatus}
              className="singlecard-payment__status"
            />
            <FontAwesomeIcon
              className={
                props.agreementStatus == 'Active'
                  ? 'singlecard-stamp active--agreement'
                  : props.agreementStatus == 'Pending'
                  ? 'singlecard-stamp pending--agreement'
                  : 'singlecard-stamp rejected--agreement'
              }
              icon={['fal', 'file-contract']}
            />
          </ListItem>

          <ListItemText className="singlecard-status__practice">
            <Typography
              variant="h6"
              className="singlecard-status__practice-name">
              {/* Name of Hospital/Clinic/Medical */}
              {props.name}
            </Typography>
          </ListItemText>

          <ListItem className="singlecard-status__circular">
            <Chip
              className="singlecard-status__circular-chip"
              label={props.progressStatus}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

PracticeInformation.defaultProps = {
  config: {
    xs_logo: 2,
    xs_content: 10,
    heading: 'h3',
  },
  id: '44444',
  logo: '../../../assets/images/logo.jpg',
  paidStatus: 'Unpaid',
  agreementStatus: 'Pending',
  name: 'Divya Medical Center',
  progressStatus: 'Status 5: Production (Onboard)',
  address: '1250 16th street santa Radhika, CA 90404',
};

PracticeInformation.propTypes = {
  id: PropTypes.string,
  logo: PropTypes.string,
  paidStatus: PropTypes.string,
  agreementStatus: PropTypes.string,
  name: PropTypes.string,
  progressStatus: PropTypes.string,
  address: PropTypes.string,
};
export default PracticeInformation;
