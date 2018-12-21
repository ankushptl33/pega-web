import React, { Component } from 'react';
//import { Button, Input, Label, Icon, Dropdown, Form, Checkbox, Radio } from "semantic-ui-react";
import {
  FormGroup,
  InputLabel,
  Input,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  Button,
} from '@material-ui/core';
import './PracticeForm.less';

class PracticeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { value } = this.state;
    // const { classes } = this.props;
    const { labels, data, func } = this.props.practiceFormProps;

    return (
      <form className="practice-form">
        <FormGroup row={true} className="practice-form_row">
          <FormControl className="practice-form_col">
            <InputLabel htmlFor="component-simple">
              {labels.practiceId}
            </InputLabel>
            <Input
              id="component-simple"
              value={data.practiceId}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className="practice-form_col">
            <InputLabel htmlFor="component-simple">
              {labels.practiceName}
            </InputLabel>
            <Input
              id="component-simple"
              value={data.practiceName}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControlLabel
            className="practice-form_col practice-form_switch"
            label={labels.practiceId}
            labelPlacement="top"
            control={
              <Switch
                checked={this.state.toggleStatus}
                //onChange={this.handleChange('checkedB')}
                value={data.practicestatus}
                color="primary"
              />
            }
            label={labels.practicestatus}
          />
        </FormGroup>
        <FormGroup row={true} className="practice-form_row">
          <FormControl className="practice-form_col">
            <InputLabel htmlFor="component-simple">
              {labels.address1}
            </InputLabel>
            <Input
              id="component-simple"
              value={data.address1}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className="practice-form_col">
            <TextField
              //id="standard-select-currency-native"
              select
              label={labels.state}
              //className={classes.textField}
              //value={data.states}
              //onChange={this.handleChange('currency')}
              SelectProps={{
                native: true,
              }}
              margin="normal">
              {data.states.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </FormControl>
          <FormControl className="practice-form_col">
            <TextField
              //id="standard-select-currency-native"
              select
              label={labels.city}
              //className={classes.textField}
              //value={this.state.currency}
              //onChange={this.handleChange('currency')}
              SelectProps={{
                native: true,
                MenuProps: {
                  // className: classes.menu,
                },
              }}
              margin="normal">
              {data.cities.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </FormControl>
          <FormControl className="practice-form_col">
            <InputLabel htmlFor="component-simple">{labels.zip}</InputLabel>
            <Input
              id="component-simple"
              value={data.zip}
              onChange={this.handleChange}
            />
          </FormControl>
        </FormGroup>
        <FormGroup row={true} className="practice-form_row">
          <FormControl className="practice-form_col">
            <TextField
              //id="standard-select-currency-native"
              select
              label={labels.timezone}
              //className={classes.textField}
              //value={this.state.currency}
              //onChange={this.handleChange('currency')}
              SelectProps={{
                native: true,
                MenuProps: {
                  // className: classes.menu,
                },
              }}
              margin="normal">
              {data.timezones.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </FormControl>
          <FormControl className="practice-form_col">
            <InputLabel htmlFor="component-simple">
              {labels.emailAddress}
            </InputLabel>
            <Input
              id="component-simple"
              value={data.emailAddress}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className="practice-form_col">
            <InputLabel htmlFor="component-simple">{labels.phone}</InputLabel>
            <Input
              id="component-simple"
              value={data.phone}
              onChange={this.handleChange}
            />
          </FormControl>
        </FormGroup>
        <FormGroup row={true} className="practice-form--actionBtn">
          <FormControl>
            <Button
              variant={this.props.variant}
              onClick={e => func.cancelButton(e, this.props)}>
              {labels.Cancel}
            </Button>
          </FormControl>
          <FormControl>
            <Button
              color="primary"
              variant={this.props.variant}
              onClick={e => func.addButton(e, this.props)}>
              {labels.Save}
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    );
  }
}
// Specifies the default values for props:
PracticeForm.defaultProps = {
  config: {
    variant: 'contained',
  },
  practiceFormProps: {
    labels: {
      practiceId: 'Student ID',
      practiceName: 'Student Name',
      practicestatus: 'Student Progress Status',
      toggleStatus: 'Active',
      address1: 'Address 1',
      timezone: 'Time Zone',
      timezones: [
        {
          value: 'Time Zone 1',
          label: 'Time Zone 1',
        },
        {
          value: 'Time Zone 2',
          label: 'Time Zone 2',
        },
        {
          value: 'Time Zone 3',
          label: 'Time Zone 3',
        },
      ],
      states: [
        {
          value: 'State 1',
          label: 'State 1',
        },
        {
          value: 'State 2',
          label: 'State 2',
        },
        {
          value: 'State 3',
          label: 'State 3',
        },
        {
          value: 'State 4',
          label: 'State 4',
        },
      ],
      cities: [
        {
          value: 'City 1',
          label: 'City 1',
        },
        {
          value: 'City 2',
          label: 'City 2',
        },
        {
          value: 'City 3',
          label: 'City 3',
        },
        {
          value: 'City 4',
          label: 'City 4',
        },
      ],
      state: 'State',
      city: 'City',
      zip: 'Zip',
      Save: 'Save',
      Cancel: 'Cancel',
      emailAddress: 'Email Address',
      phone: 'Phone number',
    },
    data: {
      practiceId: '123',
      practiceName: 'Test Name',
      practicestatus: 'Test Status',
      toggleStatus: 'Active',
      address1: 'Test Address 1',
      timezones: [
        {
          value: 'Time Zone 1',
          label: 'Time Zone 1',
        },
      ],
      states: [
        {
          value: 'State 1',
          label: 'State 1',
        },
      ],
      cities: [
        {
          value: 'City 1',
          label: 'City 1',
        },
      ],
      zip: '12354',
      emailAddress: 'Test Email Address',
      phone: '0000000000',
    },
    func: {
      addButton: (e, propsData) => {},
      cancelButton: (e, propsData) => {},
    },
  },
};

export default PracticeForm;
