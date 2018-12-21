import React from 'react';
import PropTypes from 'prop-types';
import './PracticeCardList.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import './ContactDetails.less';

const ContactDetails = props => {
  return (
    <React.Fragment>
      <div className="contact-details">
        {/* Layout for Address Details */}
        {props.address ? (
          <Typography
            className="singleCard__address_detail"
            onClick={e => props.addressClick(e, props.address)}>
            {props.address}
          </Typography>
        ) : null}

        {/* Layout for Contact Details, Ex- Phone No, Mobile No, Mail ID */}
        <List className="singleCard-contact_details">
          {props.phone ? (
            <ListItem
              onClick={e => props.phoneClick(e, props.phone)}
              className="contact-detail-item">
              <FontAwesomeIcon
                className="singlecard-call__icon"
                icon={['fal', 'phone']}
              />
              <ListItemText className="contact-text" primary={props.phone} />
            </ListItem>
          ) : null}
          {props.mobile ? (
            <ListItem
              onClick={e => props.mobileClick(e, props.mobile)}
              className="contact-detail-item">
              <FontAwesomeIcon
                className="singlecard-call__icon"
                icon={['fal', 'mobile']}
              />
              <ListItemText className="contact-text" primary={props.mobile} />
            </ListItem>
          ) : null}
        </List>

        {props.mail ? (
          <Typography
            className="singleCard__address_detail"
            onClick={e => props.mailClick(e, props.mail)}>
            <FontAwesomeIcon
              icon={['fal', 'envelope']}
              className="singlecard-mail__icon"
            />
            <Typography
              component={'span'}
              variant={'body2'}
              className="email--span">
              {props.mail}
            </Typography>
          </Typography>
        ) : null}
      </div>
    </React.Fragment>
  );
};

ContactDetails.defaultProps = {
  address: 'testing',
  phone: '9867541133',
  mobile: '1234567890',
  mail: 'abcdefg@gmail.com',
  isPropagationStopped: true,
  phoneClick: (e, phone) => {
    e.stopPropagation();
    // console.log(('Phone is executed', e, phone);
  },
  mailClick: (e, mail) => {
    e.stopPropagation();
    // console.log(('Mail is executed', e, mail);
  },
  mobileClick: (e, mobile) => {
    e.stopPropagation();
    // console.log(('Mobile is executed', e, mobile);
  },
  addressClick: (e, address) => {
    e.stopPropagation();
    // console.log(('Address is executed', e, address);
  },
};
ContactDetails.propTypes = {
  address: PropTypes.string,
  phone: PropTypes.string,
  mobile: PropTypes.string,
  mail: PropTypes.string,
};

export default ContactDetails;
