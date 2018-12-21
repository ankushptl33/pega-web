import {
  AppLoad,
  getActionType,
  getActionTypes,
  getActionCreator,
  getActionCreators,
  getReducer,
} from '@/utils/redux';
import {
  getMeasuresList,
  setUserFavoriteMeasure,
} from '@/redux/services/practiceMeasureApi';

export const MeasureListTypes = getActionTypes('MEASURELIST');
export const FilterRegistryMeasureType = getActionType('FILTERREGISTRYMEASURE');
export const SetUserFavoriteMeasureTypes = getActionTypes(
  'SETUSERFAVORITEMEASURE',
);
export const UpdateRegistryMeasureListType = getActionType(
  'UPDATEREGISTRYMEASURELIST',
);

export const SetMeasureIdSelectionType = getActionType('SETMEASURESELECTION');

// Actions
export const SetMeasureIdSelectionAction = getActionCreator(
  SetMeasureIdSelectionType,
);

export const UpdateRegistryMeasureListAction = getActionCreator(
  UpdateRegistryMeasureListType,
);

export const SetUserFavoriteMeasureAction = params => {
  return {
    types: SetUserFavoriteMeasureTypes,
    callAPI: () =>
      setUserFavoriteMeasure({
        input: {
          measureid: params.measureId,
          IsFavorite: !params.isFavorite,
        },
      }),
    handleAction: ({ type, payload, store }) => {
      switch (type) {
        case SetUserFavoriteMeasureTypes.SUCCESS:
          let measureList = store
            .getState()
            .RegistryMeasureList.registrymeasureList.filter(value => {
              if (value.measureId == params.measureId) {
                value.isFavourite = !value.isFavourite;
                value.favourite.name = value.isFavourite
                  ? 'fa fa-heart'
                  : 'fal fa-heart';
              }
              return value;
            });
          store.dispatch(UpdateRegistryMeasureListAction(measureList));
          break;
      }
    },
  };
};

export const FilterRegistryMeasureAction = getActionCreator(
  FilterRegistryMeasureType,
);

export const getMeasureListAction = params => ({
  types: MeasureListTypes,
  callAPI: () => getMeasureListData(params),
});

export const getMeasureListData = async params => {
  const queryParam = {
    input: {
      measuresetid: params.MeasuresetId,
      inactive: false,
      orderBy: 'listorder',
    },
  };
  const response = await getMeasuresList(queryParam);
  return {
    data: getMeasureGridPerformanceObj(response.data.getMeasures),
  };
};

const getMeasureGridPerformanceObj = measureGrid => {
  const returnValue = [];
  measureGrid.map((obj, index) => {
    returnValue.push({
      isFavourite: obj.IsFavorite,
      favourite: {
        name: obj.IsFavorite ? 'fa fa-heart' : 'fal fa-heart',
      },
      practiceid: '',
      id: obj.measureno,
      displayname: obj.displayname,
      measureId: obj.id,
      measure: {
        measure: {
          measureno: obj.measureno,
          displayname: obj.measuredescription,
          measuredescription: obj.rational,
          isinverse: obj.isinverse || false,
        },
        isStopPropagation: true,
      },
      performance: {
        performanceData: {
          EntityName: '',
          EntityId: '',
          ParentEntityId: '',
          ParentEntityName: '',
          DurationFrom: '',
          DurationTo: '',
          Flag: '',
          MeasureId: '',
          Unit: 'AAO',
          IsPatientSpecific: 1,
        },
        isStopPropagation: false,
      },
    });
  });
  return returnValue;
};

const initialState = {
  isRegistryMeasureListLoading: true,
  registrymeasureList: [],
  favoritefilter: false,
  viewDetailsSelection: {
    id: null,
    rowData: null,
  },
};

// Reducer
export default getReducer(initialState, {
  [MeasureListTypes.SUCCESS]: (state, { payload }) => ({
    ...state,
    registrymeasureList: payload,
    isRegistryMeasureListLoading: false,
  }),
  [FilterRegistryMeasureType]: (state, { payload }) => ({
    ...state,
    favoritefilter: payload,
  }),
  [UpdateRegistryMeasureListType]: (state, { payload }) => ({
    ...state,
    registrymeasureList: payload,
  }),
  [SetMeasureIdSelectionType]: (state, { payload }) => ({
    ...state,
    viewDetailsSelection: payload,
  }),
  [MeasureListTypes.ERROR]: () => initialState,
});
