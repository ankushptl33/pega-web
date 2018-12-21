import React from 'react';
import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import PasswordInput from '@/components/PasswordInput';
import RegexMatchDashboard from '@/components/RegexMatchDashboard';
const Resetpasswordform = props => {
  const { passwordInputProps, repasswordInputProps } = props;
  return (
    <React.Fragment>
      <Grid
        container
        justify="center"
        alignItems="center"
        className="login__contanier reset-password__wrapper">
        <Grid item className="login__signin">
          <Grid item className="login__head">
            <Typography variant="h3" className="login__title" component="h2">
              {props.type.heading}
            </Typography>
            <Typography variant="h3" className="login__subtitle">
              {props.type.subheading}
            </Typography>
          </Grid>

          <Grid item xs={12} className="login__form reset-password__form">
            <FormControl fullWidth error={props.errors.password ? true : false}>
              <PasswordInput
                error={props.errors.password ? true : false}
                inputProps={passwordInputProps}
                onChange={event => {
                  props.onChange(event.target.name, event.target.value);
                }}
                onKeyUp={event => {
                  props.onKeyUp(event);
                }}
              />
              {props.errors['password'] ? (
                <FormHelperText>{props.errors.password}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <RegexMatchDashboard
              value={props.inputProps.value}
              custom={props.inputProps.custom}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={props.errors.confirmpassword ? true : false}>
              <PasswordInput
                error={props.errors.confirmpassword ? true : false}
                inputProps={repasswordInputProps}
                onChange={event => {
                  props.onChange(event.target.name, event.target.value);
                }}
                onKeyUp={event => {
                  props.onKeyUp(event);
                }}
              />
              {props.errors.confirmpassword ? (
                <FormHelperText>{props.errors.confirmpassword}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {props.errors.error ? (
              <FormHelperText error={props.errors.error ? true : false}>
                {props.errors.error}
              </FormHelperText>
            ) : null}
          </Grid>
          <Grid item className="login__form-action">
            <Fab color="primary" onClick={event => props.onSubmit()}>
              {props.type.buttonValue}
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Resetpasswordform.defaultProps = {
  type: {
    heading: 'Reset Password',
    subheading: 'Please enter your new password',
    buttonValue: ' Submit',
  },

  onChange: (e, v) => {
    // console.log(('onHandleChange:' + e + ' : ' + v);
  },
  onSubmit: e => {
    e.stopPropagation();
    // console.log(('Form submitted');
  },
  passwordInputProps: {
    name: 'password',
    placeholder: 'Enter new password here',
    label: 'New Password',
    minLength: 4,
    maxLength: 10,
    readOnly: false,
    disabled: false,
    required: false,
    showToggle: false,
  },
  repasswordInputProps: {
    name: 'confirmpassword',
    placeholder: 'Enter confirm password here',
    label: 'Confirm Password',
    minLength: 4,
    maxLength: 10,
    readOnly: false,
    disabled: false,
    required: false,
    showToggle: false,
  },
  errors: {
    error: '',
    password: '',
    confirmpassword: '',
  },
  inputProps: {
    value: '',
    custom: [],
  },
};

Resetpasswordform.propTypes = {
  passwordInputProps: PropTypes.object,
  repasswordInputProps: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  type: PropTypes.object,
  errors: PropTypes.object,
};
export default Resetpasswordform;
