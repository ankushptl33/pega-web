import React, { Component } from 'react';
import './CustomMeasureFilter.less';
import PropTypes from 'prop-types';
import { Button, Paper, Grid } from '@material-ui/core/';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

import SvgIcon from '@material-ui/core/SvgIcon';

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
} from './config';

class CustomMeasureFilter extends Component {
  constructor(props) {
    super(props);
    debugger;
    let filterElementsState = {};

    this.props.CustomMeasureFilterProp.filterElements.map((ele, jindex) => {
      // debugger
      // ele.duration.data.filter((data,i)=>{if(data.value==1){
      //   alert(data.name)
      //   }})
      //filterElementsState[Object.keys(ele)] = { value: ele[Object.keys(ele)].selectedId, text: 'a' };
      filterElementsState[Object.keys(ele)] = ele[Object.keys(ele)].selectedId;
      

    })

    this.state = {
      openDefaultModal: false,
      customrange: false,
      isFilterPanelVisible: false,
      temporaryState: {
        measureset: {
          defaultItem: {},
          selectedItem: {},
        },
        clinician: {},
        location: {},
        year: {},
        duration: {},
        fromdate: '',
        todate: '',
        maxFromDate: new Date(),
        minFromDate: new Date('1/1/1900'),
        maxToDate: new Date(),
        minToDate: new Date('1/1/1900'),
        measureSetOptions: [],
      },
      permanentState: {
        measureset: {
          defaultItem: {},
          selectedItem: {},
        },
        clinician: {},
        location: {},
        year: {},
        duration: {},
        fromdate: '',
        todate: '',
        maxFromDate: new Date(),
        minFromDate: new Date('1/1/1900'),
        maxToDate: new Date(),
        minToDate: new Date('1/1/1900'),
        measureSetOptions: [],
      },
      filterElementsState
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

  //common function  to set filtered property
  setStateDropdownSelectionObject = (name, value, controlData) => {
    if (this.state.temporaryState.hasOwnProperty(name)) {
      const selectedItem = this.getFilteredObject(controlData, value);
      let temp = {};
      if (name == 'measureset') {
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

      // if (name == 'measureset')
      //   this.setState({ [name]: { selectedItem: { ...selectedItem } } });
      // else this.setState({ [name]: { ...selectedItem } });
    }
  };
  //component mount : setting default functionality and data to controls
  componentDidMount() {
    const {
      containerName,
      // practiceProp,
      measureSetProp,
      clinicianProp,
      locationProp,
      yearProp,
      durationProp,
    } = this.props.CustomMeasureFilterProp;

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

    const currentDate = new Date();
    const formattedDate =
      currentDate.getMonth() +
      1 +
      '-' +
      currentDate.getDate() +
      '-' +
      currentDate.getFullYear();

    const currentState = {
      year: this.getFilteredObject(yearProp.data, yearProp.selectedId),
      measureset: measureSetData,
      measureSetOptions: [...measureSetOptions],
      // fromdate: formattedDate,
      // todate: formattedDate
      duration: this.getFilteredObject(
        durationProp.data,
        durationProp.selectedId,
      ),
      clinician:
        containerName == 'clinician'
          ? this.getFilteredObject(clinicianProp.data, clinicianProp.selectedId)
          : {},
      location:
        containerName == 'location'
          ? this.getFilteredObject(locationProp.data, locationProp.selectedId)
          : {},
      fromdate: formattedDate,
      todate: formattedDate,
    };
    this.setState({
      temporaryState: currentState,
      permanentState: currentState,

      //, () => { this.props.CustomMeasureFilterProp.onApplyFilters(this.state) }
    });
  }

  //Year change event calling prop handler of year
  onYearChange = event => {
    const name = event.target.name,
      value = event.target.value;
    this.setStateDropdownSelectionObject(
      name,
      value,
      this.props.CustomMeasureFilterProp.yearProp.data,
    );
    if (this.props.CustomMeasureFilterProp.yearProp.onchangeHandler != undefined)
      this.props.CustomMeasureFilterProp.yearProp.onchangeHandler();
  };
  //duration change event setting state using filtered value
  onDurationChange = event => {
    const name = event.target.name,
      value = event.target.value;
    this.setStateDropdownSelectionObject(
      name,
      value,
      this.props.CustomMeasureFilterProp.durationProp.data,
    );
  };

  onDropdownChangeHandler = (e, handler) => {
    debugger;
    const stateChange = this.state.filterElementsState;
    stateChange[e.target.name] = e.target.value;
    this.setState({ filterElementsState: stateChange });
    if (handler != undefined) {
      handler();
    }
  }


  onMeasureSetChange = event => {
    const name = event.target.name,
      value = event.target.value;
    this.setStateDropdownSelectionObject(
      name,
      value,
      this.state.temporaryState.measureSetOptions,
    );
    // if (
    //   event._targetInst.elementType === 'path' ||
    //   event._targetInst.elementType === 'svg'
    // ) {
    //   //Default selection popup opens
    //   this.setState({ openDefaultModal: true });
    //   let measureset = { ...this.state.measureset };
    //   const selectedItem = this.getFilteredObject(
    //     this.state.measureSetOptions,
    //     value,
    //   );
    //   this.defaultMeasureSet = { ...selectedItem }; // measureset.defaultItem = { ...selectedItem };

    //   event.preventDefault();
    //   event.stopPropagation();
    // } else {
    //   //Measure set change event setting state using filtered value
    //   this.setStateDropdownSelectionObject(
    //     name,
    //     value,
    //     this.state.measureSetOptions,
    //   );
    // }
  };

  //Cancel event of default popup
  handleCancel = () => {
    this.setState({ openDefaultModal: false });
    this.defaultMeasureSet = {};
  };

  //Confirm event of setting default measure set and calling prop filters
  onSetDefaultMeasureset = () => {
    const updateMeasureSet = this.props.CustomMeasureFilterProp.measureSetProp.data.map(
      item => {
        if (this.defaultMeasureSet.id === item.id)
          return {
            id: item.id,
            value: item.id,
            text: item.name,
            name: item.name,
            icon: this.props.CustomMeasureFilterProp.measureSetProp.iconDefaultFilled
              ? this.props.CustomMeasureFilterProp.measureSetProp.iconDefaultFilled
              : iconDefaultFilled,
          };
        else
          return {
            id: item.id,
            value: item.id,
            text: item.name,
            name: item.name,
            icon: this.props.CustomMeasureFilterProp.measureSetProp.iconDefaultEmpty
              ? this.props.CustomMeasureFilterProp.measureSetProp.iconDefaultEmpty
              : iconDefaultEmpty,
          };
      },
    );

    this.setState(
      { openDefaultModal: false, measureSetOptions: updateMeasureSet },
      () => {
        this.props.CustomMeasureFilterProp.measureSetProp.onDefaultMeasureSetConfirm({
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
      this.props.CustomMeasureFilterProp.clinicianProp.data,
    );
  };
  //location change event setting state using filtered value
  onLocationChange = event => {
    const name = event.target.name,
      value = event.target.value;
    this.setStateDropdownSelectionObject(
      name,
      value,
      this.props.CustomMeasureFilterProp.locationProp.data,
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
      });
      // this.setState({ ['fromdate']: formattedDate });
      this.state.temporaryState.minToDate = new Date(event._d);
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
      });
      // this.setState({ ['todate']: formattedDate });
      this.state.temporaryState.maxFromDate =
        new Date(event._d) < new Date() ? new Date(event._d) : new Date();
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
    this.setState({ customrange: !this.state.customrange });
    //console.log('custom range');
  };
  //clear button  event reseting selected data
  onClearFilters = () => {
    const currentDate = new Date();
    const formattedDate =
      currentDate.getMonth() +
      1 +
      '-' +
      currentDate.getDate() +
      '-' +
      currentDate.getFullYear();
    this.setState({
      measureset: {
        defaultItem: {},
        selectedItem: {},
      },
      clinician: {},
      location: {},
      year: {},
      duration: {},
      customrange: false,
      fromdate: formattedDate,
      todate: formattedDate,
      isFilterPanelVisible: true,
    });
  };

  //Final hook for applying filters on grid Data
  onApplyFilters = o => {
    this.setState({ isFilterPanelVisible: false });
    this.setState({ permanentState: { ...this.state.temporaryState } });
    let appliedFilter = { ...this.state, ...this.state.permanentState };
    if (this.props.CustomMeasureFilterProp.onApplyFilters != undefined) {
      this.props.CustomMeasureFilterProp.onApplyFilters(this.state.temporaryState);
    }
    delete appliedFilter.permanentState;
    delete appliedFilter.temporaryState;
  };

  render() {
    const {
      containerName,
      measureSetProp,
      clinicianProp,
      locationProp,
      yearProp,
      durationProp,
    } = this.props.CustomMeasureFilterProp;

    /// const measureSetData = measureSetProp.data.map(item => ({ value: item.id, text: item.name, icon: (item.isdefault) ? "star right floated" : "star outline right floated" }));
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

    const datecolumns = this.state.customrange ? (
      <Grid item xs className="fig-formcontrol-group">
        <Grid container spacing={24}>
          <Grid item xs={6} className="fig-formcontrol-fromdate">
            <FormControl fullWidth className="fig-formcontrol">
              <MuiPickersUtilsProvider
                utils={MomentUtils}
                label="With keyboard">
                <InlineDatePicker
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
                  minDate={this.state.temporaryState.minFromDate}
                  maxDate={this.state.temporaryState.maxFromDate}
                  id="fromdate"
                  name="fromdate"
                  label="From Date"
                  value={this.state.temporaryState.fromdate}
                  onChange={this.onhandleFromDateChange}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6} className="fig-formcontrol-todate">
            <FormControl fullWidth className="fig-formcontrol">
              <MuiPickersUtilsProvider
                utils={MomentUtils}
                label="With keyboard">
                <InlineDatePicker
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
                  minDate={this.state.temporaryState.minToDate}
                  maxDate={this.state.temporaryState.maxToDate}
                  id="todate"
                  name="todate"
                  label="To Date"
                  value={this.state.temporaryState.todate}
                  onChange={this.onhandleToDateChange}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    ) : null;

    const yearfiltered = !this.state.customrange ? (
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

    const durationfiltered = !this.state.customrange ? (
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

    const datefromfiltered = this.state.customrange ? (
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

    const datetofiltered = this.state.customrange ? (
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
              {this.state.temporaryState.clinician != undefined &&
                this.state.temporaryState.clinician.firstname !== undefined
                ? this.state.temporaryState.clinician.firstname +
                ' ' +
                this.state.temporaryState.clinician.lastname
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
              {this.state.temporaryState.location != undefined &&
                this.state.temporaryState.location.name !== undefined
                ? this.state.temporaryState.location.name
                : 'Not selected'}
            </Typography>
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
              onChange={this.handleChange}
              inputProps={{ name: 'clinician', id: 'clinician' }}
              onChange={this.onClinicianChange}>
              {clinicianData.map((item, key) => {
                return (
                  <option key={key} value={item.value}>
                    {item.text}
                  </option>
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
              onChange={this.handleChange}
              inputProps={{ name: 'location', id: 'location' }}
              onChange={this.onLocationChange}>
              {locationData.map((item, key) => {
                return (
                  <option key={key} value={item.value}>
                    {item.text}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      ) : null;

    const disableElement = this.state.customrange ? true : false;

    const filterElementsState = this.state.filterElementsState;
    const filterPanel = this.state.isFilterPanelVisible ? (
      <Paper elevation={2} className="measure--filter__stackable">
        <Grid container className="" spacing={24}>
          {this.props.CustomMeasureFilterProp.filterElements.map((element, kindex) => {
            let key = Object.keys(element);
            let selectedValue = filterElementsState[key];
            return (
              <Grid item xs={12}>
                <FormControl fullWidth className="fig-formControl">
                  <InputLabel htmlFor={key}>
                    {element[key].label}
                  </InputLabel>
                  <Select
                    native={element[key].native}
                    name={key}
                    value={selectedValue}
                    inputProps={{ name: key[0], id: element[key].name }}
                    onChange={(e) => { this.onDropdownChangeHandler(e, element[key].onChangeHandler) }}>
                    {
                      (element[key].group == undefined) ?
                        element[key].data.map(
                          (item, key) => {
                            return (
                              <MenuItem key={key} value={item.value}>
                                {item.name}{' '}
                                <SvgIcon align="right">
                                  <path fill="#000000" d={item.icon} />
                                </SvgIcon>
                              </MenuItem>
                            );
                          },
                        ) :
                        Object.keys(element[key].group).map((groupKey, i) => {
                          let flag = element[key].group[groupKey];
                          return (
                            <optgroup label={groupKey}>
                              {' '}
                              {
                                element[key].data.map(
                                  (item, index) => {
                                    if (item.flag === flag) {
                                      return (
                                        <option key={item.value} value={item.value}>
                                          {item.name}
                                        </option>
                                      );
                                    }
                                  })
                              }
                              {' '}
                            </optgroup>
                          )
                        })
                    }
                  </Select>
                </FormControl>
              </Grid>
            )
          }
          )}
          <Grid item xs={12} className="filter-btn-group">
            {/* <Button className="button" onClick={this.onClearFilters}>
              Clear
            </Button> */}
            <Button className="button" onClick={this.onApplyFilters}>
              Apply Filters
            </Button>
            <Button
              className="button"
              content="Close"
              onClick={this.onFilterChange}>
              Close
            </Button>
          </Grid>
        </Grid>

      </Paper>
    ) : null;

    debugger;
    const filterElements = this.props.CustomMeasureFilterProp.filterElements;
    const filterElementsStateValues = this.state.filterElementsState;
    const filterValues = this.state.filterElementsState ? (
      Object.keys(this.state.filterElementsState).map((key, i) => {
        debugger;
        let selectedValue = filterElementsStateValues[key];
        let selectedLable = null;
        filterElements.filter((a, i) => {
          if (Object.keys(a)[0] == key) {
            selectedLable = a[key].selectedLabel;
          }
        })
        debugger;
        return (
          <Grid item className="selected-label__container">
            <Grid item xs className="selected-label__row">
              <Typography className="selected-label__title" variant="body1">
                {selectedLable}
              </Typography>
              <Typography className="selected-label__value" variant="body2">
                {' '}
                {selectedValue}
              </Typography>
            </Grid>
          </Grid>
        )
      })
    ) : null;


    return (
      <Grid container className="measure--filter__wrapper">
        <Grid item>
          <Paper className="measure--filter--bg__wrapper" elevation={2}>
            <Grid container spacing={24}>
              {filterValues}
              <Grid item className="filter-change-btn">
                <Button
                  className="button"
                  content="Change"
                  onClick={this.onFilterChange}>
                  Change Filter
                </Button>
              </Grid>
            </Grid>
          </Paper>
          {filterPanel}
        </Grid>
      </Grid>
    );
  }
}

CustomMeasureFilter.defaultProps = {
  CustomMeasureFilterProp: {
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
      name: 'Duration',
      group: { Quarter: 'QNR', Month: 'MNR' },
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
    filterElements: [
      {
        duration: {
          name: 'Duration',
          group: { Quarter: 'QNR', Month: 'MNR' },
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
          native: true,
        }
      },
      {
        year: {
          name: "Year",
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
          native: false,
          onChangeHandler: (e) => {
            console.log('Year DropDown selection change fire');
          },
        }
      }
    ]
  },
};

CustomMeasureFilter.propTypes = {
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
export default CustomMeasureFilter;
