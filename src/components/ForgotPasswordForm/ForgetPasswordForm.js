import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import {
  Paper,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  FormHelperText,
  FormControl,
  Fab,
  CircularProgress,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

 /* THIS IS FORGOT PASSWORD FORM COMPONENT USED TO GET RESET PASSWORD LINK USING USERNAME, EMAIL ADDRESS OR BOTH
  ================================================================ */

const ForgetPasswordForm = props => {
  return (
    <React.Fragment>
      <Grid
        container
        justify="center"
        alignItems="center"
        className="login__contanier forgot-password__contanier ">
        <Grid item className="login__signin">
          <Grid item className="login__head">
            <Link to="/">
              <Typography variant="h3" className="login__title" component="h2">
                <ArrowBack name="arrow left" size="large" />{' '}
                {props.type.heading}
              </Typography>
            </Link>

            <Typography variant="h3" className="login__subtitle">
              {props.type.subheading}
            </Typography>
          </Grid>

          <Grid className="login__form forgot-password__form">
            {props.Visibility.username ? (
              <TextField
                fullWidth
                error={props.errors.username ? true : false}
                label={props.type.idlabel}
                name={props.type.idname}
                placeholder={props.type.idplaceholder}
                margin="normal"
                onChange={event => {
                  props.onChange(event.target.name, event.target.value);
                }}
                onKeyUp={event => {
                  props.onKeyUp(event);
                }}
              />
            ) : null}
            {props.errors.username ? (
              <FormHelperText error={true}>
                {props.errors.username}
              </FormHelperText>
            ) : null}

            {props.Visibility.email ? (
              <TextField
                fullWidth
                error={props.errors.email ? true : false}
                label={props.type.emaillabel}
                name={props.type.emailname}
                placeholder={props.type.emailplaceholder}
                margin="normal"
                onChange={event => {
                  props.onChange(event.target.name, event.target.value);
                }}
                onKeyUp={event => {
                  props.onKeyUp(event);
                }}
              />
            ) : null}
            {props.errors.email ? (
              <FormHelperText error={true}>{props.errors.email}</FormHelperText>
            ) : null}
            {props.errors['error'] ? (
              <FormHelperText error={true}>
                {props.errors['error']}
              </FormHelperText>
            ) : null}
          </Grid>

          <Grid item className="login__form-action">
            <React.Fragment>
              <Fab
                variant="extended"
                color="primary"
                onClick={props.onSubmit}
                disabled={props.forgotPasswordbtnClicked}>
                {props.type.buttonValue}
              </Fab>
              {props.forgotPasswordbtnClicked && (
                <CircularProgress
                  className="CircularProgressBarLogin CircularIntegration-buttonProgress-587"
                  size={28}
                />
              )}
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

 /* DEFAULT PROPS
  ================================================================ */
ForgetPasswordForm.defaultProps = {
  type: {
    heading: 'Forgot Password',
    subheading: 'Recover your registry account',
    idname: 'username',
    idlabel: 'Username',
    idplaceholder: 'Enter your username',
    emailname: 'email',
    emaillabel: 'Email address',
    emailplaceholder: 'Enter your email address',
    buttonValue: 'Submit',
  },
  Visibility: {
    username: true,
    email: true,
  },
  errors: {
    username: '',
    email: '',
  },
  onChange: (field, value) => {
    // console.log(('onchange:' + value);
  },
  onSubmit: e => {
    e.stopPropagation();
    // console.log('you', e.target.textContent);
  },
  onKeyUp: value => {
    // console.log(value);
  },
};

 /* PROP TYPES
  ================================================================ */
ForgetPasswordForm.propTypes = {
  type: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ForgetPasswordForm;
