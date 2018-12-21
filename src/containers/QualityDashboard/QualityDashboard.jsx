import React, { Fragment } from 'react';
import { Grid, Typography, Select, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import MasterTab from '@/components/MasterTab';
import DateTimeLabel from '@/components/DateTimeLabel';
import Loader from '@/helper/loaders/ComponentLoader';
import {
  getPracticeListAction,
  onPracticeChangeAction,
} from '@/redux/modules/qualityDashboard';
import { getMeasureFilterDataAction } from '@/redux/modules/measureFilter';
import {
  PRACTICE_TAB_CONTAINER,
  PROVIDER_TAB_CONTAINER,
  LOCATION_TAB_CONTAINER,
} from '@/helper/constants.js';
import { getProviderAction } from '@/redux/modules/providerDashboard';
import { getLocationAction } from '@/redux/modules/locationDashboard';

const masterTabProp = [
  {
    menuItem: 'PRACTICE',
    defaultActiveIndex: true,
    iconUrl: '../../assets/svg/practice.svg',
    fontIcon: 'hospital',
    router: PRACTICE_TAB_CONTAINER,
    action: () => {},
  },
  {
    menuItem: 'CLINICIANS',
    defaultActiveIndex: false,
    fontIcon: 'stethoscope',
    iconUrl: '../../assets/svg/clinician.svg',
    router: PROVIDER_TAB_CONTAINER,
    action: () => {},
  },
  {
    menuItem: 'LOCATIONS',
    fontIcon: 'map-marker-alt',
    defaultActiveIndex: false,
    iconUrl: '../../assets/svg/ehr.svg',
    router: LOCATION_TAB_CONTAINER,
    action: () => {},
  },
];

class QualityDashboard extends React.Component {
  componentDidMount() {
    if (this.props.Practices.length === 0) {
      this.props.getPracticeListAction();
      this.props.getMeasureFilterDataAction();
    }
  }

  onPracticeChangeHandler = event => {
    event = event || window.event;
    if (this.props.SelectedPractice.id !== event.target.value) {
      this.props.onPracticeChangeAction(parseInt(event.target.value));
      const locationqueryParams = {
        input: {
          practiceid: event.target.value,
          orderBy: 'name',
          inactive: false,
        },
      };
      const providerqueryParams = {
        input: {
          practiceid: event.target.value,
          orderBy: 'firstname',
          inactive: false,
        },
      };
      this.props.getProviderAction(providerqueryParams);
      this.props.getLocationAction(locationqueryParams);
    }
  };

  render() {
    if (this.props.IsLoading) {
      return <Loader />;
    }
    const practiceData =
      this.props.Practices != null
        ? this.props.Practices.map(item => ({
            value: item.id,
            text: `${item.externalid} - ${item.name}`,
          }))
        : [];

    const disableElement = practiceData.length === 1;

    masterTabProp[1].menuItem = `CLINICIANS (${this.props.SelectedPractice
      .providerCnt || 0})`;

    masterTabProp[2].menuItem = `LOCATIONS (${this.props.SelectedPractice
      .locationCnt || 0})`;

    const { classes } = this.props;

    return (
      <Fragment>
        <Grid container className="quality-dashboard--page__wrapper">
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={5}
            className="page-title__container">
            <Typography variant="h2" className="fi-subheader__title ">
              Quality Dashboard
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={7}
            className="page_head-top-right__container">
            <Grid container className="select-practice__container">
              <Grid item className="select-practice--title__container">
                <Typography variant="body1">Practice:</Typography>
              </Grid>
              <Grid item xs className="select-practice--dropdown__container">
                <Select
                  fullWidth
                  name="practice"
                  disabled={disableElement}
                  value={
                    this.props.SelectedPractice.id !== undefined
                      ? this.props.SelectedPractice.id
                      : ''
                  }
                  onChange={this.onPracticeChangeHandler}>
                  {practiceData.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.text}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <DateTimeLabel
                dates={this.props.SelectedPractice.refreshDateData}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <MasterTab masterTabProp={masterTabProp} />
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ QualityDashboard, MeasureFilter }) => ({
  IsLoading: QualityDashboard.isLoading,
  Practices: QualityDashboard.practiceList,
  SelectedPractice: QualityDashboard.selectedPractice,
  MeasureFilterData: MeasureFilter,
});

const mapDispatchToProps = {
  getPracticeListAction,
  onPracticeChangeAction,
  getMeasureFilterDataAction,
  getProviderAction,
  getLocationAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QualityDashboard);
