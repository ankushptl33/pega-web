import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import LoginBranding from '@/components/LoginBranding';
import ForgetPasswordForm from '@/components/ForgotPasswordForm';
import EmailSent from '@/components/EmailSent';
import Footer from '@/components/Footer';
import { RESET_PASSWORD_URL } from '@/helper/constants';
import APIHelper from '@/helper/apihelper';

const apiHelperInstance = new APIHelper();

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    /* SET INITIAL STATE:
   ===================================== */
    this.state = {
      isFormSubmit: false,
      username: '',
      email: '',
      errors: {},
      forgotPasswordbtnClicked: false,
    };
  }

  /* HANDLE WHEN INPUT TEXT VALUE CHANGED (E.G. USERNAME OR EMAIL):
  ================================================================ */
  onHandleChange = (field, value) => {
    if (this.state.errors['username'] || this.state.errors['email']) {
      const err = this.state.errors;
      err[field] = '';
      this.setState({ errors: err });
    }
    this.setState({ [field]: value });
  };

  /* WHEN FORM SUBMITED (API CALL):
  ================================================================ */
  onHandleSubmit = () => {
    if (this.validateForm()) {
      this.setState({ forgotPasswordbtnClicked: true });
      axios
        .post(apiHelperInstance.Resources.FogotPassword, {
          resetpasswordurl: RESET_PASSWORD_URL,
          emailaddress: this.state.email,
          loginname: this.state.username,
        })
        .then(res => {
          if (res.data.statusCode == 1) {
            this.setState({
              isFormSubmit: true, //SHOW EMAIL SENT COMPONENT
              forgotPasswordbtnClicked: false,
            });
          } else if (res.data.statusCode == 3) {
            const errors = {};
            errors['error'] = res.data.description;
            this.setState({ errors, forgotPasswordbtnClicked: false });
          }
        })
        .catch(() => {
          this.props.history.push('/login');
        });
    }
  };

  /* HANDLE VALIDATION (USERNAME: REQUIRED, EMAIL:REQUIRED, CORRECT FORMAT):
  ================================================================ */
  validateForm() {
    const errors = {};
    let formIsValid = true;
    if (this.props.Visibility.username && this.state.username == '') {
      formIsValid = false;
      errors['username'] = 'Username required';
    }

    if (this.props.Visibility.email && this.state.email) {
      if (
        !this.state.email.match(
          /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,4})$/,
        )
      ) {
        formIsValid = false;
        errors['email'] = 'Enter correct email address';
      }
    } else {
      formIsValid = false;
      errors['email'] = 'Email address required';
    }
    this.setState({ errors });
    return formIsValid;
  }

  /* HANDLE WHEN AT INPUT TEXT ENTER BUTTON HIT
  ================================================================ */
  handleKeyUp(event) {
    if (event.keyCode == 13) this.onHandleSubmit(event);
  }

  render() {
    return (
      <Grid container>
        <Grid item xs>
          {this.state.isFormSubmit ? (
            <EmailSent />
          ) : (
            <ForgetPasswordForm
              forgotPasswordbtnClicked={this.state.forgotPasswordbtnClicked}
              errors={this.state.errors}
              Visibility={this.props.Visibility}
              onKeyUp={event => this.handleKeyUp(event)}
              onChange={(field, value) => {
                this.onHandleChange(field, value);
              }}
              onSubmit={event => {
                this.onHandleSubmit();
              }}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

/* SOME DEFAULT PROPS (REST USED COMPONENT ITSELF):
  ================================================================ */
ForgotPassword.defaultProps = {
  Visibility: {
    username: true,
    email: true,
  },
};

export default ForgotPassword;
