import React, { Component } from 'react';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import { Cancel, CheckCircle } from '@material-ui/icons';
import { Message } from 'semantic-ui-react';
import './RegexMatchDashboard.less';

/* REGEX MATCH COMPONENT USED FOR CHECHING THE PASSWORD COMPLEXITY MEET
==================================================*/
const RegexMatchDashboard = props => {
  const { value, numeric, special, lowercase, uppercase, custom } = props;
  const checkValidation = (regex, message) => {
    if (value.match(regex)) {
      return (
        <ListItem className="regexdash-content__li success">
          <ListItemIcon>
            <CheckCircle />
          </ListItemIcon>
          {message}
        </ListItem>
      );
    } else {
      return (
        <ListItem className="regexdash-content__li incomplete">
          <ListItemIcon>
            <Cancel />
          </ListItemIcon>
          {message}
        </ListItem>
      );
    }
  };

  const dynamicValidation = custom.map(obj =>
    checkValidation(obj.regex, obj.Message),
  );

  return (
    <Card className="reset-password__regexdash--wrapper">
      <CardContent className="regexdash-content-wrapper">
        <List className="regexdash-content__ul">
          {numeric
            ? checkValidation(
                /[0-9]/,
                'Must contain at least one number(0 through 9)',
              )
            : null}
          {special
            ? checkValidation(
                /[@#$%^&*()._]/,
                'Must contain at least one special character',
              )
            : null}
          {lowercase
            ? checkValidation(
                /[a-z]/,
                'Must contain at least one lower case letter(a-z)',
              )
            : null}
          {uppercase
            ? checkValidation(
                /[A-Z]/,
                'Must contain at least one upper case letter(A-Z)',
              )
            : null}
          {dynamicValidation}
        </List>
      </CardContent>
    </Card>
  );
};

/* DEFAULT PROPS
==================================================*/
RegexMatchDashboard.defaultProps = {
  value: '',
  heading: '',
  numeric: true,
  special: true,
  lowercase: true,
  uppercase: true,
  custom: [],
};

export default RegexMatchDashboard;
