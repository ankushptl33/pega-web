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
import { getMeasureGridPerformanceObj } from '@/helper/commonFunction';
import { getLocationData } from '@/redux/services/locationPerformanceApi';

// Types
export const LocationListTypes = getActionTypes('LOCATIONLIST');

export const UpdateSelectedLocationIdType = getActionType(
  'UPDATESELECTEDLOCATIONID',
);

export const UpdateSelectedLocationIdAction = getActionCreator(
  UpdateSelectedLocationIdType,
);

// export const LocationMeasureListTypes = getActionTypes('LOCATIONMEASURELIST');
// export const LocationClearMeasureListType = getActionType(
//   'LOCATIONCLEARMEASURELIST',
// );

// // Actions
// export const LocationClearMeasureListAction = getActionCreator(
//   LocationClearMeasureListType,
// );

// export const getLocationMeasureListAction = params => ({
//   types: LocationMeasureListTypes,
//   callAPI: () => getLocationMeasureListData(params),
// });

// export const getLocationMeasureListData = async params => {
//   const queryParam = {
//     input: {
//       measuresetid: params.MeasuresetId,
//       inactive: false,
//       orderBy: 'listorder',
//     },
//   };
//   const response = await getMeasuresList(queryParam);
//   return {
//     data: getMeasureGridPerformanceObj(params, response.data.getMeasures),
//   };
// };

export const getLocationAction = queryParam => ({
  types: LocationListTypes,
  callAPI: () => getLocationData(queryParam),
});

const initialState = {
  islocationLoading: true,
  location: [],
  selectedLocationId: null,
};

// Reducer
export default getReducer(initialState, {
  [LocationListTypes.READY]: (state, { payload }) => ({
    ...state,
    islocationLoading: true,
  }),
  [LocationListTypes.SUCCESS]: (state, { payload }) => ({
    ...state,
    location: payload.getLocations,
    selectedLocationId:
      payload.getLocations.length !== 0 && payload.getLocations[0].id,
    islocationLoading: false,
  }),
  [UpdateSelectedLocationIdType]: (state, { payload }) => {
    return {
      ...state,
      selectedLocationId: payload,
    };
  },
  [LocationListTypes.ERROR]: () => initialState,
});
