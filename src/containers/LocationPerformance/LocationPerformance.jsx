import React, { Fragment } from 'react';
import MeasureFilter from '@/components/MeasureFilter';
import BasicAccordion from '@/components/BasicAccordion';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { PRACTICE, LOCATION, UNDEFINED } from '@/helper/constants';
import {
  generateMeasurePerformanceParamObj,
  generateDropDownObject,
  fnSetUserFavoriteMeasure,
  fnUpdateFilterInStore,
  formateDate,
} from '@/helper/commonFunction';
import Loader from '@/helper/loaders/ComponentLoader';
import {
  getLocationAction,
  UpdateSelectedLocationIdAction,
} from '@/redux/modules/locationDashboard';
import { measureFilterUpdateAction } from '@/redux/modules/measureFilter';
import {
  getMeasureListAction,
  FilterRegistryMeasureAction,
  SetUserFavoriteMeasureAction,
} from '@/redux/modules/registryMeasureList';

let filterValue = UNDEFINED;

const config = {
  iconColumn: 1,
  numberColumn: 1,
  stringColumn: 5,
  componentColumn: 5,
};

const header = {
  favourite: 'FAVORITE',
  displayname: 'ID',
  measure: 'MEASURE',
  performance: 'ACHIEVED PERFORMANCE',
};

const type = {
  favourite: 'icon',
  displayname: 'string',
  measure: 'Measure',
  performance: 'PerformanceBarContainer',
};
class LocationPerformance extends React.Component {
  componentDidMount() {
    if (this.props.LocationList.length === 0) {
      const queryParams = {
        input: {
          practiceid: this.props.SelectedPractice.id,
          orderBy: 'name',
          inactive: false,
        },
      };
      this.props.getLocationAction(queryParams);
    }
  }

  generatePracticeGridOj = filter => {
    const params = generateMeasurePerformanceParamObj(
      filter,
      LOCATION,
      this.props.MeasureFilterData.selectedValues,
      this.props.SelectedLocationId,
      this.props.SelectedPractice.id,
      PRACTICE,
    );
    let registryMeasureList = this.props.LocationMeasureList;
    registryMeasureList = registryMeasureList.map(obj => ({
      ...obj,
      practiceid: params.EntityId,
      performance: {
        performanceData: {
          EntityName: params.EntityName,
          EntityId: params.EntityId,
          ParentEntityId: params.ParentEntityId,
          ParentEntityName: params.ParentEntityName,
          DurationFrom: formateDate(
            new Date(params.DurationFrom),
            'YYYY-MM-DD',
          ),
          DurationTo: formateDate(new Date(params.DurationTo), 'YYYY-MM-DD'),
          Flag: params.Flag,
          MeasureId: obj.id,
          Unit: 'AAO',
          IsPatientSpecific: 1,
        },
        isStopPropagation: false,
      },
    }));
    return registryMeasureList;
  };

  onApplyFilters = filter => {
    const measureFilterReduxStore = {
      measureSet: filter.measureset.selectedItem.id,
      year: filter.year.id,
      duration: filter.duration.id,
      durationFlag: filter.duration.flag,
      durationFrom: filter.duration.startdate,
      durationTo: filter.duration.enddate,
      customrange: filter.customrange,
      fromdate: filter.fromdate,
      todate: filter.todate,
    };
    this.props.measureFilterUpdateAction(measureFilterReduxStore);
    this.props.UpdateSelectedLocationIdAction(filter.location.id);
    filterValue = filter;
    if (
      this.props.MeasureFilterData.selectedValues.measureSet !==
      filter.measureset.selectedItem.id
    ) {
      this.props.getMeasureListAction({
        MeasuresetId: filter.measureset.selectedItem.id,
      });
    }
  };

  filterUserFavoriteMeasureHandler(isFavorite) {
    this.props.FilterRegistryMeasureAction(isFavorite);
  }

  setUserFavoriteMeasureHandler(e, props) {
    fnSetUserFavoriteMeasure(this, e, props);
  }

  onMeasureYearChangeHandler(year) {
    fnUpdateFilterInStore(this, year);
  }

  render() {
    if (this.props.IsLocationLoading) {
      return <Loader />;
    }

    const measureSetProp = generateDropDownObject(
      this.props.MeasureFilterData.measureSet,
      'Select Measure Set',
      'Measure Set',
      null,
      this.props.MeasureFilterData.selectedValues.measureSet,
    );

    const Year = generateDropDownObject(
      this.props.MeasureFilterData.year,
      'Select Year',
      'Year',
      null,
      this.props.MeasureFilterData.selectedValues.year,
    );

    Year.onchangeHandler = this.onMeasureYearChangeHandler.bind(this);

    const Duration = generateDropDownObject(
      this.props.MeasureFilterData.duration,
      'Select Duration',
      'Duration',
      null,
      this.props.MeasureFilterData.selectedValues.duration,
    );

    Duration.data = this.props.MeasureFilterData.duration.filter(
      duration =>
        duration.year === this.props.MeasureFilterData.selectedValues.year,
    );

    const measureFilterProp = {
      containerName: LOCATION,
      locationProp: {
        data: this.props.LocationList,
        label: 'Select Location',
        selectedLabel: 'Location',
        onApplyFilters: this.onApplyFilters,
        selectedId: this.props.SelectedLocationId,
      },
      measureSetProp,
      yearProp: Year,
      durationProp: Duration,
      onApplyFilters: this.onApplyFilters,
      customrange: this.props.MeasureFilterData.selectedValues.customrange,
      fromdate: this.props.MeasureFilterData.selectedValues.fromdate,
      todate: this.props.MeasureFilterData.selectedValues.todate,
    };

    let locationMeasureData = this.generatePracticeGridOj(filterValue) || [];

    if (this.props.Favoritefilter) {
      locationMeasureData = locationMeasureData.filter(
        value => value.isFavourite,
      );
    }

    const accordions = {
      type,
      data: locationMeasureData || [],
      content: 'PerformanceTrend',
      action: this.onAccordionExpandClick,
      iconAction: this.setUserFavoriteMeasureHandler.bind(this),
    };

    let basicGrid = null;
    if (
      this.props.LocationList.length > 0 &&
      this.props.LocationMeasureList.length > 0
    ) {
      basicGrid = this.props.IsRegistryMeasureListLoading ? (
        <Loader />
      ) : (
        <div className="clinicians-performance--accordion__wrapper">
          <Grid item xs className="practice-performance__grid-filter">
            <a
              href="javascript:"
              onClick={this.filterUserFavoriteMeasureHandler.bind(this, false)}
              className={`practice-performance__filter ${
                this.props.Favoritefilter ? '' : 'active'
              } all`}>
              All
            </a>
            <a
              href="javascript:"
              onClick={this.filterUserFavoriteMeasureHandler.bind(this, true)}
              className={`practice-performance__filter ${
                this.props.Favoritefilter ? 'active' : ''
              } favourites`}>
              Favorites
            </a>
          </Grid>
          <BasicAccordion
            config={config}
            header={header}
            accordions={accordions}
          />
        </div>
      );
    } else {
      basicGrid = <div>No Records found.</div>;
    }

    return (
      <Fragment>
        <MeasureFilter measureFilterProp={measureFilterProp} />
        {basicGrid}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  LocationDashboard,
  QualityDashboard,
  MeasureFilter,
  RegistryMeasureList,
}) => ({
  SelectedPractice: QualityDashboard.selectedPractice,
  MeasureFilterData: MeasureFilter.measureFilterData,
  IsLocationLoading: LocationDashboard.islocationLoading,
  LocationList: LocationDashboard.location,
  SelectedLocationId: LocationDashboard.selectedLocationId,
  IsRegistryMeasureListLoading:
    RegistryMeasureList.isRegistryMeasureListLoading,
  Favoritefilter: RegistryMeasureList.favoritefilter,
  LocationMeasureList: RegistryMeasureList.registrymeasureList,
});

const mapDispatchToProps = {
  getMeasureListAction,
  getLocationAction,
  measureFilterUpdateAction,
  FilterRegistryMeasureAction,
  SetUserFavoriteMeasureAction,
  UpdateSelectedLocationIdAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationPerformance);
