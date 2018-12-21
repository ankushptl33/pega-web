import React, { Component } from 'react';
import {
  Input,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import './PasswordInput.less';
import PropTypes from 'prop-types';

 /* THIS IS PASSWORD INPUT FIELD TEXTBOX
  ================================================================ */
class PasswordInput extends Component {
  constructor(props) {
    super(props);
     /* INITILISE STATE
     ================================================================ */
    this.state = {
      passwordShown: false,
      value: '',
    };
  }

   /* HANDLE WHEN INPUT FIELD VALUE CHANE CHANGE
  ================================================================ */
  onHandleChange(event) {
    this.props.onChange(event);
    this.setState({ value: event.target.value });
  }
   /* USED FOR PASSWORD SHOW IN PLANE TEXT OR *** MARK
  ================================================================ */
  togglePasswordMask() {
    this.setState({ passwordShown: !this.state.passwordShown });
  }

   /* HANDLE WHEN INPUT FIELD FLUSH/RESET
  ================================================================ */
  componentWillReceiveProps(pre, newstate) {
    if (pre.inputProps.isReset == true) this.setState({ value: '' });
  }

  render() {
    const { passwordShown } = this.state;
    const {
      id,
      name,
      label,
      placeholder,
      minLength,
      maxLength,
      readOnly,
      disabled,
      required,
      showToggle,
    } = this.props.inputProps;

    return (
      <FormControl error={this.props.error}>
        <InputLabel htmlFor="adornment-password">{label} </InputLabel>
        <Input
          id={id}
          name={name}
          type={passwordShown ? 'text' : 'password'}
          value={this.state.value}
          onChange={event => this.onHandleChange(event)}
          onKeyUp={event => this.props.onKeyUp(event)}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          endAdornment={
            showToggle ? (
              <InputAdornment hide={'true'} position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => this.togglePasswordMask()}>
                  {this.state.passwordShown ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ) : null
          }
        />
      </FormControl>
    );
  }
}

 /* DEFAULT PROPS
  ================================================================ */
PasswordInput.defaultProps = {
  inputProps: {
    name: 'password',
    id: 'password',
    label: 'Password',
    placeholder: 'Enter password here',
    minLength: 4,
    maxLength: 8,
    readOnly: false,
    disabled: false,
    required: false,
    showToggle: true,
    isReset: false,
  },
  onChange: e => {
    //// console.log(("password updated: " + e.target.value)
  },
  onKeyUp(event) {
    //// console.log(('value', event.target.value);
    // put the login here
  },
};

 /* PROP TYPES
  ================================================================ */
PasswordInput.propTypes = {
  inputProps: PropTypes.object,
  onChange: PropTypes.func,
};
export default PasswordInput;
