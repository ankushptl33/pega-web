import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './PaymentDetail.less';

import {
  Divider,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@material-ui/core';

const PaymentDetail = props => {
  const { PaymentDetailsProps } = props.PaymentProps;
  const { labels } = props.PaymentProps.PaymentDetailsProps;
  const { config } = props;
  return (
    <Grid container className="payment_history">
      <Typography
        component={config.first_component}
        className="payment__header">
        {' '}
        {props.PaymentProps.header}{' '}
      </Typography>
      {PaymentDetailsProps.map((OuterObject, index) => {
        return (
          <Grid container index={index} className="payment__grid--container">
            <Grid item xs className="payment__date--block">
              {/*As per discussion with UX team will move it in less and remove the code from here */}

              <Grid container xs={12} className="payment__month--container">
                <Grid container xs={12} className="payment__month--block">
                  <Typography variant="body2" className="payment__month">
                    {OuterObject.month}
                  </Typography>
                  <Typography
                    component={config.middle_component}
                    className="payment__day">
                    {OuterObject.day}
                  </Typography>
                  <span className="payment__year">{OuterObject.year}</span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs className="payment__info--block">
              <List className="payment__infolist">
                {Object.keys(OuterObject.labels).map((InnerObject, index) => (
                  <ListItem index={index} className="payment__info--list">
                    <span className="payment__info--itemname">
                      {OuterObject.labels[InnerObject]} :
                    </span>{' '}
                    <span className="payment__info--itemvalue">
                      {OuterObject.values[InnerObject]}
                    </span>{' '}
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid
              item
              xs
              textalign={'center'}
              className="payment__amount--block">
              <List className="payment__amount--list">
                <ListItemText className="payment__amount--listitemtext no__padding">
                  {' '}
                  <span className="payment__amount--listitem">
                    {OuterObject.heading}
                  </span>{' '}
                </ListItemText>
                <ListItemText className="no__padding">
                  <Typography
                    component={config.list_component}
                    className="payment__amount--listheader">
                    ${OuterObject.amountPaid}
                  </Typography>
                </ListItemText>
                <ListItemText className="no__padding">
                  {' '}
                  <span className="payment__amount--listitem">
                    {' '}
                    {OuterObject.amountPaidStatus}
                  </span>{' '}
                </ListItemText>
              </List>
            </Grid>
            <Grid item xs className="payment__download--block">
              <FontAwesomeIcon
                icon={['fal', 'arrow-to-bottom']}
                className="payment__download--icon"
                onClick={e => props.PaymentProps.downloadData(e, props)}
              />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

// Specifies the default values for props:
PaymentDetail.defaultProps = {
  config: {
    xs_middle: 4,
    xs_outer: 2,
    list_component: 'h1',
    middle_component: 'h2',
    first_component: 'h3',
  },
  PaymentProps: {
    header: 'PAYMENTS',
    PaymentDetailsProps: [
      {
        month: 'Aug',
        day: '05',
        year: 2018,
        time: '2PM',
        isTimeShow: true,
        heading: 'Amount Paid',
        amountPaid: '51,208',
        amountPaidStatus: 'SUCCESSFUL',

        labels: {
          receiptNo: 'ReceiptNo',
          termPlan: 'Term Plan',
          paymentMode: 'Payment Mode',
        },
        values: {
          receiptNo: '1234rere567890',
          termPlan: 'Web',
          paymentMode: 'Credit Card',
        },
      },
    ],
    downloadData: (e, data) => {
      // console.log((e, data);
    },
  },
};
export default PaymentDetail;
