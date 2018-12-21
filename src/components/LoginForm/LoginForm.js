import React, { Component, Fragment } from 'react';
import PasswordInput from '@/components/PasswordInput';
import './LoginForm.less';
import PropTypes from 'prop-types';
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Typography,
  Fab,
  CircularProgress,
} from '@material-ui/core';

 /* THIS IS LOGIN FORM COMPONENT USED TO LOGIN INTO SYSTEM. USERNAME AND PASSWORD ARE INPUT FIELD:
  ================================================================ */
const Login = props => {
  const { passwordProps } = props;
  const {
    heading,
    Userid,
    Password,
    loginButtonValue,
    RegisterLink,
    ForgotPasswordLink,
    Visibility,
    rememberMeLabelName,
  } = props.inputprops;
  return (
    <Grid item className="login__contanier">
      <Grid item className="login__signin">
        <Grid item className="login__head">
          <Typography variant="h3" className="login__title" component="h2">
            {heading}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="login__form">
        <Grid item xs={12} className="login-input--container">
          <FormControl
            fullWidth
            error={props.errors[Userid.name] ? true : false}>
            <InputLabel>{Userid.LabelName}</InputLabel>
            <Input
              id={Userid.id}
              type={Userid.type}
              placeholder={Userid.placeholder}
              name={Userid.name}
              onChange={event =>
                props.onChange(event.target.name, event.target.value)
              }
              onKeyUp={event => {
                props.onKeyUp(event);
              }}
            />
            {props.errors[Userid.name] ? (
              <FormHelperText>{props.errors[Userid.name]}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={12} className="login-input--container">
          <FormControl
            fullWidth
            error={props.errors[passwordProps.name] ? true : false}>
            <PasswordInput
              error={props.errors[passwordProps.name] ? true : false}
              inputProps={passwordProps}
              onChange={event => {
                props.onChange(event.target.name, event.target.value);
              }}
              onKeyUp={event => {
                props.onKeyUp(event);
              }}
            />
            {props.errors[passwordProps.name] ? (
              <FormHelperText>
                {props.errors[passwordProps.name]}
              </FormHelperText>
            ) : null}
            {props.errors['callback'] ? (
              <FormHelperText error={true}>
                {props.errors['callback']}
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid container className="login__form-sub">
          {Visibility.rememberMe || Visibility.forgotPassword ? (
            <Grid container>
              {Visibility.rememberMe ? (
                <Grid item xs>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(event, value) =>
                            props.onChangeRememberMe(event, value)
                          }
                          color="primary"
                        />
                      }
                      label={rememberMeLabelName}
                    />
                  </FormGroup>
                </Grid>
              ) : null}

              {Visibility.forgotPassword ? (
                <Grid item xs className="login__form-sub--forgotPassword">
                  <Button href={'/' + ForgotPasswordLink.link}>
                    {ForgotPasswordLink.label}
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          ) : null}
        </Grid>

        <Grid item xs className="login__form-action">
          <Fragment>
            <Fab
              variant="extended"
              color="primary"
              disabled={props.loginbtnClicked}
              onClick={event => props.onSubmit(event)}>
              {loginButtonValue}
            </Fab>
            {props.loginbtnClicked && (
              <CircularProgress
                className="CircularProgressBarLogin CircularIntegration-buttonProgress-587"
                size={28}
              />
            )}
          </Fragment>

          {Visibility.registerLink ? (
            <Button href={'/' + RegisterLink.link}>{RegisterLink.label}</Button>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

 /* DEFAULT PROPS
  ================================================================ */
Login.defaultProps = {
  inputprops: {
    heading: 'Login To Your Account',
    rememberMeLabelName: 'Remember Me',
    Userid: {
      id: 'UserName',
      type: 'text',
      labelName: 'Username',
      placeholder: 'Enter username',
    },
    Password: {
      LabelName: 'Password',
    },
    loginButtonValue: 'Login',
    RegisterLink: {
      label: 'Register',
      link: 'register',
    },
    ForgotPasswordLink: {
      label: 'Forgot Password',
      link: 'forgotpass',
    },
    Visibility: {
      rememberMe: true,
      forgotPassword: true,
      registerLink: true,
    },
  },
  onKeyUp: event => {
    //// console.log(("onHandleChnage is executed:" + event + " : " + value);
  },
  onChange: (event, value) => {
    //// console.log(("onHandleChnage is executed:" + event + " : " + value);
  },
  onSubmit: e => {
    e.stopPropagation();
    //// console.log(("onHandleFormSubmit is executed");
  },
  onChangeRememberMe: (e, v) => {
    e.stopPropagation();
    //// console.log(("RememberMe checkbox checked : " + v);
  },

  passwordProps: {
    name: 'password',
    placeholder: 'Enter password',
    label: 'Password',
    minLength: 4,
    maxLength: 8,
    readOnly: false,
    disabled: false,
    required: false,
    showToggle: false,
  },

  errors: {
    id: '',
    password: '',
  },
};

 /* PROP TYPES
  ================================================================ */
Login.propTypes = {
  passwordProps: PropTypes.object,
  inputprops: PropTypes.object,
  errors: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default Login;
