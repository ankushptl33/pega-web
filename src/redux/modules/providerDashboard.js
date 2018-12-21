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
import { getClinicianData } from '@/redux/services/clinicianPerformanceApi';

// Types
export const ProviderListTypes = getActionTypes('PROVIDERLIST');

export const UpdateSelectedProviderIdType = getActionType(
  'UPDATESELECTEDPROVIDERID',
);

export const UpdateSelectedProviderIdAction = getActionCreator(
  UpdateSelectedProviderIdType,
);

// export const ProviderMeasureListTypes = getActionTypes('PROVIDERMEASURELIST');

// export const getProviderMeasureListAction = params => {
//   return {
//     types: ProviderMeasureListTypes,
//     callAPI: () => getProviderMeasureListData(params),
//   };
// };

// export const getProviderMeasureListData = async params => {
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

export const getProviderAction = queryParam => {
  return {
    types: ProviderListTypes,
    callAPI: () => getClinicianData(queryParam),
    // handleAction: ({ type, payload, store }) => {
    //   switch (type) {
    //     case ProviderListTypes.SUCCESS:
    //       params.EntityId = payload.getProvidersByPracticeId[0].id;
    //       store.dispatch(getProviderMeasureListAction(params));
    //       break;
    //   }
    // },
  };
};

const initialState = {
  isProviderLoading: true,
  provider: [],
  selectedProviderId: null,
};

// Reducer
export default getReducer(initialState, {
  [ProviderListTypes.READY]: (state, { payload }) => {
    return {
      ...state,
      isProviderLoading: true,
    };
  },
  [ProviderListTypes.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      provider: payload.getProvidersByPracticeId,
      selectedProviderId:
        payload.getProvidersByPracticeId.length !== 0 &&
        payload.getProvidersByPracticeId[0].id,
      isProviderLoading: false,
    };
  },
  [UpdateSelectedProviderIdType]: (state, { payload }) => {
    return {
      ...state,
      selectedProviderId: payload,
    };
  },
  [ProviderListTypes.ERROR]: () => initialState,
});
