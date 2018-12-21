import React, { Component } from 'react';
import './MeasureFilter.less';
import PropTypes from 'prop-types';
import { Button, Paper, Grid } from '@material-ui/core/';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { InlineDatePicker } from 'material-ui-pickers';

import {
  iconDefaultEmpty,
  iconDefaultFilled,
  monthlyRollingFlag,
  monthlyNonRollingFlag,
  defaultMeasureSetDialogConfirm,
  defaultMeasureSetDialogCancel,
  defaultMeasureSetDialogBody,
  defaultMeasureSetDialogTitle,
} from './config'; ///default configuration file of component

let hasError = false;
class MeasureFilter extends Component {
  constructor(props) {
    super(props);
    //initial state for component
    this.state = {
      openDefaultModal: false,
      isFilterPanelVisible: false,
      maxFromDate: new Date(),
      minFromDate: moment(new Date()).add(-2, 'year').format('MM-DD-YYYY'),//for restricting user to select date within last two year,
      maxToDate: new Date(),
      minToDate: moment(new Date()).add(-2, 'year').format('MM-DD-YYYY'),//for restricting user to select date within last two year,
      temporaryState: {
        measureset: {
          defaultItem: {},
          selectedItem: {},
        },
        clinician: {},
        customrange: false,
        location: {},
        year: {},
        duration: {},
        fromdate: '',
        todate: '',
        measureSetOptions: [],
      },
      permanentState: {
        measureset: {
          defaultItem: {},
          selectedItem: {},
        },
        clinician: {},
        customrange: false,
        location: {},
        year: {},
        duration: {},
        fromdate: '',
        todate: '',
        measureSetOptions: [],
      },
    };

    this.defaultMeasureSet = {};
  }

  // common function to get filterd object
  getFilteredObject = (data, id) => {
    const filteredItem = data.filter(item => {
      return item.id == id;
    });
    return filteredItem[0];
  };

  //function returning array in grouped object
  getGroupedObjectArray = (data, keyName) => {
    return (
      data &&
      data.reduce(function (rv, x) {
        (rv[x[keyName]] = rv[x[keyName]] || []).push(x);
        return rv;
      }, {})
    );
  };

  //common function to set filtered property
  setStateDropdownSelectionObject = (name, value, controlData) => {
    if (this.state.temporaryState.hasOwnProperty(name)) {
      const selectedItem = this.getFilteredObject(controlData, value);
      let temp = {};
      if (name == 'measureset') {//for the measure set contains to property like selected measure set and default measure set.
        temp[name] = { selectedItem: { ...selectedItem } };
        this.setState({
          temporaryState: { ...this.state.temporaryState, ...temp },
        });
      } else {
        temp[name] = { ...selectedItem };
        this.setState({
          temporaryState: { ...this.state.temporaryState, ...temp },
        });
      }

    }
  };

  //function assigning initial and updated props of coponent
  updateComponentItemData = (compProps, permanentState) => {
    const {
      containerName,
      measureSetProp,
      clinicianProp,
      locationProp,
      yearProp,
      durationProp,
    } = compProps;

    if (!permanentState) {//component mount code
      const measureSetOptions =
        measureSetProp.data &&
        measureSetProp.data.map(item => ({
          id: item.id,
          name: item.name,
          value: item.id,
          text: item.name,
          isdefault: item.isdefault,
          icon: item.isdefault
            ? 'star right floated'
            : 'star outline right floated',
        }));
      const renderProps = { ...this.state };
      let measureSetData = { ...renderProps.measureset };
      measureSetData.selectedItem =
        measureSetProp.data &&
        measureSetProp.data.filter(item => {
          return item.id === measureSetProp.selectedId
            ? measureSetProp.selectedId
            : '';
        })[0];

      //for maitaining state of component as per props
      let toDate = (compProps.customrange) ? compProps.todate : moment(new Date()).format('MM-DD-YYYY');
      let fromDate = (compProps.customrange) ? compProps.fromdate : moment(new Date()).format('MM-DD-YYYY');

      const currentState = {
        year: this.getFilteredObject(yearProp.data, yearProp.selectedId),
        measureset: measureSetData,
        measureSetOptions: [...measureSetOptions],
        duration: this.getFilteredObject(
          durationProp.data,
          durationProp.selectedId ? durationProp.selectedId : durationProp.data[0].id,
        ),
        clinician:
          containerName == 'clinician'
            ? this.getFilteredObject(clinicianProp.data, clinicianProp.selectedId)
            : {},
        location:
          containerName == 'location'
            ? this.getFilteredObject(locationProp.data, locationProp.selectedId)
            : {},
        customrange: compProps.customrange,
        fromdate: fromDate,
        todate: toDate,
      };

      this.setState({
        temporaryState: currentState,
        permanentState: currentState,
      });
    }
    else {//component receive props code
      const currentState = {
        year: this.getFilteredObject(yearProp.data, yearProp.selectedId),
        duration: this.getFilteredObject(
          durationProp.data,
          durationProp.selectedId ? durationProp.selectedId : durationProp.data[0].id,
        )
      };

      this.setState({
        temporaryState: { ...this.state.temporaryState, ...currentState },
      });


    }
  };

  //component mount : setting default functionality and data to controls
  componentDidMount() {
    this.updateComponentItemData(this.props.measureFilterProp, null);
  }

  // component will receive updated props as per state change in containers state
  componentWillReceiveProps(newProps) {
    if (newProps.measureFilterProp && this.props != newProps) {
      const permanentState = this.state.permanentState;
      this.updateComponentItemData(newProps.measureFilterProp, permanentState);
    }
  }



  //Year change event calling prop handler of year
  onYearChange = event => {
    const name = event.target.name,
      value = event.target.value;
    this.setStateDropdownSelectionObject(
      name,
      value,
      this.props.measureFilterProp.yearProp.data,
    );
    if (this.props.measureFilterProp.yearProp.onchangeHandler)
      this.props.measureFilterProp.yearProp.onchangeHandler(value);
  };
  //duration change event setting state using filtered value
  onDurationChange = event => {
    const name = event.target.name,
      value = event.target.value;
    this.setStateDropdownSelectionObject(
      name,
      value,
      this.props.measureFilterProp.durationProp.data,
    );
  };

  //measure set chnage event setting state using filtered value
  onMeasureSetChange = event => {
    const name = event.target.name,
      value = event.target.value;
    this.setStateDropdownSelectionObject(
      name,
      value,
      this.state.temporaryState.measureSetOptions,
    );
  };

  //Cancel event of default popup
  handleCancel = () => {
    this.setState({ openDefaultModal: false });
    this.defaultMeasureSet = {};
  };

  //Confirm event of setting default measure set and calling prop filters
  onSetDefaultMeasureset = () => {
    const updateMeasureSet = this.props.measureFilterProp.measureSetProp.data.map(
      item => {
        if (this.defaultMeasureSet.id === item.id)
          return {
            id: item.id,
            value: item.id,
            text: item.name,
            name: item.name,
            icon: this.props.measureFilterProp.measureSetProp.iconDefaultFilled
              ? this.props.measureFilterProp.measureSetProp.iconDefaultFilled
              : iconDefaultFilled,
          };
        else
          return {
            id: item.id,
            value: item.id,
            text: item.name,
            name: item.name,
            icon: this.props.measureFilterProp.measureSetProp.iconDefaultEmpty
              ? this.props.measureFilterProp.measureSetProp.iconDefaultEmpty
              : iconDefaultEmpty,
          };
      },
    );

    this.setState(
      { openDefaultModal: false, measureSetOptions: updateMeasureSet },
      () => {
        this.props.measureFilterProp.measureSetProp.onDefaultMeasureSetConfirm({
          ...this.state,
        });
      },
    );
  };
  //clinician change event setting state using filtered value
  onClinicianChange = event => {
    const name = event.target.name,
      value = event.target.value;
    this.setStateDropdownSelectionObject(
      name,
      value,
      this.props.measureFilterProp.clinicianProp.data,
    );
  };
  //location change event setting state using filtered value
  onLocationChange = event => {
    const name = event.target.name,
      value = event.target.value;
    this.setStateDropdownSelectionObject(
      name,
      value,
      this.props.measureFilterProp.locationProp.data,
    );
  };
  //fromdate change event setting state using filtered value and validation of date
  onhandleFromDateChange = event => {
    let temp = {};
    if (this.state.temporaryState.hasOwnProperty('fromdate')) {
      const formattedDate = moment(event._d).format('MM-DD-YYYY');
      temp['fromdate'] = formattedDate;
      this.setState({
        temporaryState: { ...this.state.temporaryState, ...temp },
        minToDate: new Date(event._d),
      });
      hasError = false;
    }
  };
  //todate change event setting state using filtered value and validation of date
  onhandleToDateChange = event => {
    let temp = {};
    if (this.state.temporaryState.hasOwnProperty('todate')) {
      const formattedDate = moment(event._d).format('MM-DD-YYYY');
      temp['todate'] = formattedDate;
      this.setState({
        temporaryState: { ...this.state.temporaryState, ...temp },
        maxFromDate: new Date(event._d) < new Date() ? new Date(event._d) : new Date(),
      });
      hasError = false;
      if (new Date(event._d) < new Date(this.state.temporaryState.fromdate))
        hasError = true;
    }
  };
  //change button event for show /hide of filter panel
  onFilterChange = () => {
    this.setState({
      isFilterPanelVisible: !this.state.isFilterPanelVisible,
    });
  };
  //custom range checked change event for show /hide of date panel
  onCustomRangeChange = () => {
    this.setState({ temporaryState: { ...this.state.temporaryState, customrange: !this.state.temporaryState.customrange } });
  };

  //Final hook for applying filters on grid Data
  onApplyFilters = o => {
    if (hasError) {
      return false;
    }
    else {
      this.setState({ isFilterPanelVisible: false });
      this.setState(
        { permanentState: { ...this.state.temporaryState } },
        function () {
          if (this.props.measureFilterProp.onApplyFilters != undefined) {
            this.props.measureFilterProp.onApplyFilters(
              this.state.permanentState,
            );
          }
        },
      );
    }
  };

  render() {
    const {
      containerName,
      measureSetProp,
      clinicianProp,
      locationProp,
      yearProp,
      durationProp,
    } = this.props.measureFilterProp;

    const clinicianData =
      containerName == 'clinician' && clinicianProp
        ? clinicianProp.data.map(item => ({
          value: item.id,
          text: item.firstname + ' ' + item.lastname,
        }))
        : [];

    const locationData =
      containerName == 'location' && locationProp
        ? locationProp.data.map(item => ({ value: item.id, text: item.name }))
        : [];

    const yearData =
      yearProp &&
      yearProp.data &&
      yearProp.data.map(item => ({ value: item.id, text: item.name }));

    const durationData =
      durationProp &&
      durationProp.data &&
      durationProp.data.map(item => ({
        value: item.id,
        text: item.name,
        key: item.key,
        disabled: item.disabled ? true : false,
        flag:
          item.flag == monthlyNonRollingFlag || item.flag == monthlyRollingFlag
            ? 'Months'
            : 'Quarters',
      }));

    const groupedDuration = this.getGroupedObjectArray(durationData, 'flag');

    const yearfiltered = !this.state.permanentState.customrange ? (
      <Grid item className="selected-year__container">
        <Grid item xs className="selected-label__row">
          <Typography variant="body1" className="selected-label__title">
            {yearProp.selectedLabel}
          </Typography>
          <Typography variant="body2" className="selected-label__value">
            {this.state.permanentState.year.name !== undefined
              ? this.state.permanentState.year.name
              : 'Not selected'}
          </Typography>
        </Grid>
      </Grid>
    ) : null;

    const durationfiltered = !this.state.permanentState.customrange ? (
      <Grid item className="selected-duration__container">
        <Grid item xs className="selected-label__row">
          <Typography variant="body1" className="selected-label__title">
            {durationProp.selectedLabel}{' '}
          </Typography>
          <Typography variant="body2" className="selected-label__value">
            {this.state.permanentState.duration.name !== undefined
              ? this.state.permanentState.duration.name
              : 'Not selected'}
          </Typography>
        </Grid>
      </Grid>
    ) : null;

    const datefromfiltered = this.state.permanentState.customrange ? (
      <Grid item className="selected-fromdate__container">
        <Grid item xs className="selected-label__row">
          <Typography variant="body1" className="selected-label__title">
            From Date{' '}
          </Typography>
          <Typography variant="body2" className="selected-label__value">
            {this.state.permanentState.fromdate !== ''
              ? this.state.permanentState.fromdate
              : 'Not selected'}
          </Typography>
        </Grid>
      </Grid>
    ) : null;

    const datetofiltered = this.state.permanentState.customrange ? (
      <Grid item className="selected-todate__container">
        <Grid item xs className="selected-label__row">
          <Typography variant="body1" className="selected-label__title">
            To Date
          </Typography>
          <Typography variant="body2" className="selected-label__value">
            {this.state.permanentState.todate !== ''
              ? this.state.permanentState.todate
              : 'Not selected'}
          </Typography>
        </Grid>
      </Grid>
    ) : null;

    const filteredClinicianLocElement =
      containerName == 'clinician' ? (
        <Grid item className="selected-clinician__container">
          <Grid item xs className="selected-label__row">
            <Typography variant="body1" className="selected-label__title">
              {clinicianProp.selectedLabel}
            </Typography>
            <Typography variant="body2" className="selected-label__value">
              {this.state.permanentState.clinician != undefined &&
                this.state.permanentState.clinician.firstname !== undefined
                ? this.state.permanentState.clinician.firstname +
                ' ' +
                this.state.permanentState.clinician.lastname
                : 'Not selected'}
            </Typography>
          </Grid>
        </Grid>
      ) : containerName == 'location' ? (
        <Grid item className="selected-location__container">
          <Grid item xs className="selected-label__row">
            <Typography variant="body1" className="selected-label__title">
              {locationProp.selectedLabel}
            </Typography>
            <Typography variant="body2" className="selected-label__value">
              {this.state.permanentState.location != undefined &&
                this.state.permanentState.location.name !== undefined
                ? this.state.permanentState.location.name
                : 'Not selected'}
            </Typography>
          </Grid>
        </Grid>
      ) : null;

    const datecolumns = this.state.temporaryState.customrange ? (
      <Grid item xs className="fig-formcontrol-group">
        <Grid container spacing={24}>
          <Grid item xs={6} className="fig-formcontrol-fromdate">
            <FormControl fullWidth className="fig-formcontrol">
              <MuiPickersUtilsProvider
                utils={MomentUtils} >
                <InlineDatePicker
                  keyboard
                  disableFuture
                  format="MM-DD-YYYY"
                  mask={[
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  minDate={this.state.minFromDate}
                  minDateMessage="From date should be less than to date and less than or equal to present date."
                  maxDate={this.state.maxFromDate}
                  maxDateMessage="From date should be less than to date and less than or equal to present date."
                  id="fromdate"
                  name="fromdate"
                  label="From Date"
                  value={this.state.temporaryState.fromdate}
                  onChange={this.onhandleFromDateChange}
                  onError={(_, error) => {
                    hasError = true;
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6} className="fig-formcontrol-todate">
            <FormControl fullWidth className="fig-formcontrol">
              <MuiPickersUtilsProvider
                utils={MomentUtils} >
                <InlineDatePicker
                  keyboard
                  disableFuture
                  format="MM-DD-YYYY"
                  mask={[
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  minDate={this.state.minToDate}
                  minDateMessage="To date should be greater than from date and less than or equal to present date."
                  maxDate={this.state.maxToDate}
                  maxDateMessage="To date should be greater than from date and less than or equal to present date."
                  id="todate"
                  name="todate"
                  label="To Date"
                  value={this.state.temporaryState.todate}
                  onChange={this.onhandleToDateChange}
                  onError={(_, error) => {
                    hasError = true;
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    ) : null;

    const containerDependentElement =
      containerName == 'clinician' ? (
        <Grid item xs={12}>
          <FormControl fullWidth className="fig-formControl">
            <InputLabel htmlFor="clinician">{clinicianProp.label}</InputLabel>
            <Select
              name="clinician"
              value={
                this.state.temporaryState.clinician != undefined &&
                  this.state.temporaryState.clinician.id != undefined
                  ? this.state.temporaryState.clinician.id
                  : ''
              }
              inputProps={{ name: 'clinician', id: 'clinician' }}
              onChange={this.onClinicianChange}>
              {clinicianData.map((item, key) => {
                return (
                  <MenuItem key={key} value={item.value}>
                    {item.text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      ) : containerName == 'location' ? (
        <Grid item xs={12}>
          <FormControl fullWidth className="fig-formControl">
            <InputLabel htmlFor="location">{locationProp.label}</InputLabel>
            <Select
              name="location"
              value={
                this.state.temporaryState.location != undefined &&
                  this.state.temporaryState.location.id != undefined
                  ? this.state.temporaryState.location.id
                  : ''
              }
              inputProps={{ name: 'location', id: 'location' }}
              onChange={this.onLocationChange}>
              {locationData.map((item, key) => {
                return (
                  <MenuItem key={key} value={item.value}>
                    {item.text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      ) : null;

    const disableElement = this.state.temporaryState.customrange ? true : false;

    ///Filter EDIT panel 
    const filterPanel = this.state.isFilterPanelVisible ? (
      <Paper elevation={2} className="measure--filter__stackable">
        <Grid container className="" spacing={24}>
          <Grid item xs={12}>
            <FormControl fullWidth className="fig-formControl">
              <InputLabel htmlFor="measureset">
                {measureSetProp.label}
              </InputLabel>
              <Select
                name="measureset"
                value={
                  this.state.temporaryState.measureset.selectedItem.id !=
                    undefined
                    ? this.state.temporaryState.measureset.selectedItem.id
                    : ''
                }
                inputProps={{ name: 'measureset', id: 'measureset' }}
                onChange={this.onMeasureSetChange}>
                {this.state.temporaryState.measureSetOptions.map(
                  (item, key) => {
                    return (
                      <MenuItem key={key} value={item.value}>
                        {item.text}
                      </MenuItem>
                    );
                  },
                )}
              </Select>
            </FormControl>
          </Grid>
          {containerDependentElement}
          <Grid item xs={4}>
            <FormControl fullWidth className="fig-formControl">
              <InputLabel htmlFor="year">{yearProp.label}</InputLabel>
              <Select
                name="year"
                disabled={disableElement}
                value={
                  this.state.temporaryState.year.id != undefined
                    ? this.state.temporaryState.year.id
                    : ''
                }
                inputProps={{ name: 'year', id: 'year' }}
                onChange={this.onYearChange}>
                {yearData.map((item, key) => {
                  return (
                    <MenuItem key={key} value={item.value}>
                      {item.text}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth className="fig-formControl">
              <InputLabel htmlFor="duration">{durationProp.label}</InputLabel>
              <Select
                native
                name="duration"
                disabled={disableElement}
                value={
                  this.state.temporaryState.duration.id != undefined
                    ? this.state.temporaryState.duration.id
                    : ''
                }
                inputProps={{ name: 'duration', id: 'duration' }}
                onChange={this.onDurationChange}>
                <optgroup label="Quarters">
                  {' '}
                  {groupedDuration.Quarters.map((item, key) => {
                    return (
                      <option key={key} value={item.value}>
                        {item.text}
                      </option>
                    );
                  })}{' '}
                </optgroup>
                <optgroup label="Months">
                  {' '}
                  {groupedDuration.Months.map((item, key) => {
                    return (
                      <option key={key} value={item.value}>
                        {item.text}
                      </option>
                    );
                  })}{' '}
                </optgroup>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <p />
            <FormControlLabel
              control={
                <Checkbox
                  name="customrange"
                  checked={this.state.temporaryState.customrange}
                  onChange={this.onCustomRangeChange}
                  value="customrange"
                  color="default"
                />
              }
              label="Custom Range"
            />
          </Grid>

          {datecolumns}
          <Grid item xs={12} className="filter-btn-group">
            <Button
              variant="outlined"
              className="filter--close__button"
              content="Close"
              onClick={this.onFilterChange}>
              Close
            </Button>
            <Button variant="outlined" className="filter--apply__button" onClick={this.onApplyFilters}>
              Apply Filter
            </Button>
          </Grid>
        </Grid>
      </Paper>
    ) : null;


    //Final JSX for rendering component items
    return (
      <Grid container className="measure--filter__wrapper">
        <Grid item>
          <Paper className="measure--filter--bg__wrapper" elevation={2}>
            <Grid container spacing={24}>
              <Grid item className="selected-label__container">
                <Grid item xs className="selected-label__row">
                  <Typography className="selected-label__title" variant="body1">
                    {measureSetProp.selectedLabel}
                  </Typography>
                  <Typography className="selected-label__value" variant="body2">
                    {' '}
                    {this.state.permanentState.measureset.selectedItem.name !==
                      undefined
                      ? this.state.permanentState.measureset.selectedItem.name
                      : 'Not selected'}
                  </Typography>
                </Grid>
              </Grid>
              {filteredClinicianLocElement}
              {yearfiltered}
              {durationfiltered}
              {datefromfiltered}
              {datetofiltered}

              <Grid item className="filter-change-btn">
                <Button
                  className="button"
                  content="Change"
                  onClick={this.onFilterChange}>
                  Change
                </Button>
              </Grid>
            </Grid>
            <Dialog
              open={this.state.openDefaultModal}
              onClose={this.handleCancel}
              aria-labelledby="responsive-dialog-title">
              <DialogTitle id="responsive-dialog-title">
                {measureSetProp.defaultDialogTitle &&
                  measureSetProp.defaultDialogTitle != ''
                  ? measureSetProp.defaultDialogTitle
                  : defaultMeasureSetDialogTitle}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {measureSetProp.defaultDialogBody &&
                    measureSetProp.defaultDialogBody != ''
                    ? measureSetProp.defaultDialogBody
                    : defaultMeasureSetDialogBody}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCancel} color="primary">
                  {measureSetProp.defaultDialogCancel &&
                    measureSetProp.defaultDialogCancel != ''
                    ? measureSetProp.defaultDialogCancel
                    : defaultMeasureSetDialogCancel}
                </Button>
                <Button
                  onClick={this.onSetDefaultMeasureset}
                  color="primary"
                  autoFocus>
                  {measureSetProp.defaultDialogConfirm &&
                    measureSetProp.defaultDialogConfirm != ''
                    ? measureSetProp.defaultDialogConfirm
                    : defaultMeasureSetDialogConfirm}
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
          {filterPanel}
        </Grid>
      </Grid>
    );
  }
};

//default props for the component
MeasureFilter.defaultProps = {
  measureFilterProp: {
    containerName: 'practice', // practice , clinician or location
    measureSetProp: {
      data: [
        {
          id: 1,
          name: 'Measure Set 1',
          inactive: false,
          isdefault: false,
        },
        {
          id: 5,
          name: 'Measure Set 5',
          inactive: false,
          isdefault: false,
        },
        {
          id: 6,
          name: 'Measure Set 2',
          inactive: false,
          isdefault: true,
        },
      ],
      label: 'Select Measure set',
      selectedLabel: 'Selected Measure Set',
      selectedId: 6,
      iconDefaultEmpty:
        'M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z',
      iconDefaultFilled:
        'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
      defaultDialogTitle: 'Default Measure Set',
      defaultDialogBody: 'Are you sure you want to change default measure set?',
      defaultDialogConfirm: 'Yes',
      defaultDialogCancel: 'Cancel',
      onDefaultMeasureSetConfirm: function () {
        //console.log('Default Measureset Set');
      },
    },
    clinicianProp: {
      data: [
        {
          firstname: 'hemant',
          lastname: 'patil',
          id: 2,
          istest: false,
          tin: 123456,
          country: 'sdffdg',
        },
        {
          firstname: 'juber',
          lastname: 'ahmd',
          id: 3,
          istest: false,
          tin: null,
          country: null,
        },
      ],
      label: 'Select Clinician',
      selectedLabel: 'Selected Clinician',
      selectedId: 2,
    },
    locationProp: {
      data: [
        {
          name: 'hemant',
          id: 2,
          istest: false,
          tin: 123456,
          country: 'sdffdg',
        },
        {
          name: 'juber',
          id: 3,
          istest: false,
          tin: null,
          country: null,
        },
      ],
      label: 'Select Location',
      selectedLabel: 'Selected Location',
      selectedId: 2,
    },
    yearProp: {
      data: [
        {
          id: '1',
          name: '2018',
          value: '1',
        },
        {
          id: '2',
          name: '2017',
          value: '2',
        },
        {
          id: '3',
          name: '2016',
          value: '3',
        },
      ],
      label: 'Select Year',
      selectedLabel: 'Selected Year',
      selectedId: 1,
      onchangeHandler: function () {
        //console.log('Year DropDown selection change fire');
      },
    },
    durationProp: {
      data: [
        { name: 'Q4 2018', value: 1, id: 1, key: '1', flag: 'QNR' },
        { name: 'Q3 2018', value: 2, id: 2, key: '2', flag: 'QNR' },
        { name: 'Q2 2018', value: 3, id: 3, key: '3', flag: 'QNR' },
        { name: 'Q1 2018', value: 4, id: 4, key: '4', flag: 'QNR' },
        { name: 'Jan 2018', value: 5, id: 5, key: '5', flag: 'MNR' },
        { name: 'Feb 2018', value: 6, id: 6, key: '6', flag: 'MNR' },
        { name: 'Mar 2018', value: 7, id: 7, key: '7', flag: 'MNR' },
        { name: 'Apr 2018', value: 8, id: 8, key: '8', flag: 'MNR' },
        { name: 'May 2018', value: 9, id: 9, key: '9', flag: 'MNR' },
      ],
      label: 'Select Duration',
      selectedLabel: 'Selected Duration',
      selectedId: 1,
    },
    onApplyFilters: obj => {
      //console.log('Add Apply filter handling code here');
    },
    onCloseDialog: obj => {
      //console.log('Closing of Grid');
    },
  },
};

//prop validation 
MeasureFilter.propTypes = {
  containerName: PropTypes.string,
  practiceProp: PropTypes.object,
  measureSetProp: PropTypes.object,
  clinicianProp: PropTypes.object,
  locationProp: PropTypes.object,
  yearProp: PropTypes.object,
  durationProp: PropTypes.object,
  onApplyFilters: PropTypes.func,
  onCloseDialog: PropTypes.func,
};
export default MeasureFilter;
