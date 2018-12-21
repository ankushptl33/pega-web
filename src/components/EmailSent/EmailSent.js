import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import PropTypes from 'prop-types';

 /* THIS IS EMAIL SENT COMPONENT USED FOR SUCCESS ACTION WITH EMAIL SENT:
  ================================================================ */
const EmailSent = props => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="login__contanier login-email__contanier">
      <Grid item className="login__signin">
        <Grid item className="login__head">
          <ThumbUp name="arrow left" size="large" />
          <Typography variant="h5" component="h2" gutterBottom>
            {props.type.heading}
          </Typography>
          <Typography variant="h5" className="login__subtitle">
            {props.type.subheading}
          </Typography>
        </Grid>
        <Grid className="login__form  forgot-password__form">
          <Grid item className="login__form-action email-sent">
            <Button
              variant="contained"
              color="primary"
              href={'/' + props.type.link}>
              {props.type.buttonLabel}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

 /* ADDED DEFAULT PROPS SO COMPONENT WORK INDEPENDENTLY
  ================================================================ */
EmailSent.defaultProps = {
  type: {
    heading: 'Email sent.',
    subheading: 'Kindly check your email inbox.',
    buttonLabel: ' Back to Login',
    link: '',
  },
  changeHandlers: {
    textfield: e => {
      // console.log((e.target.value);
    },
    submit: e => {
      // console.log(('you', e.target.textContent);
    },
  },
};

 /* PROPTYPES
  ================================================================ */
EmailSent.propTypes = {
  type: PropTypes.object,
  textfield: PropTypes.func,
  submit: PropTypes.func,
};

export default EmailSent;
