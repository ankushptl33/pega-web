// import {
//   AppLoad,
//   getActionType,
//   getActionTypes,
//   getActionCreator,
//   getActionCreators,
//   getReducer,
// } from '@/utils/redux';
// import {
//   getMeasuresList,
//   setUserFavoriteMeasure,
// } from '@/redux/services/practiceMeasureApi';
// import { getMeasureGridPerformanceObj } from '@/helper/commonFunction';

// // Types
// export const PracticeMeasureListTypes = getActionTypes('PRACTICEMEASURELIST');
// export const PracticeClearMeasureListType = getActionType(
//   'PRACTICECLEARMEASURELIST',
// );
// export const SetMeasureIdSelectionType = getActionType('SETMEASURESELECTION');

// // Actions
// export const SetMeasureIdSelectionAction = getActionCreator(
//   SetMeasureIdSelectionType,
// );
// export const PracticeClearMeasureListAction = getActionCreator(
//   PracticeClearMeasureListType,
// );

// export const getPracticeMeasureListAction = params => ({
//   types: PracticeMeasureListTypes,
//   callAPI: () => getPracticeMeasureListData(params),
// });

// export const getPracticeMeasureListData = async params => {
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

// const initialState = {
//   isLoading: true,
//   practice: {
//     measureList: [],
//     measurePerformanceData: [],
//   },
//   selectedMeasureId: '',
// };

// // Reducer
// export default getReducer(initialState, {
//   [PracticeClearMeasureListType]: () => initialState,
//   [PracticeMeasureListTypes.SUCCESS]: (state, { payload }) => ({
//     ...state,
//     practice: {
//       ...state.measurePerformanceData,
//       measureList: payload,
//     },
//     isLoading: false,
//   }),
//   [SetMeasureIdSelectionType]: (state, { payload }) => ({
//     ...state,
//   }),
//   [PracticeMeasureListTypes.ERROR]: () => initialState,
// });
