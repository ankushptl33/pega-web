import { getMeasuresPerformance } from '../services/practicePerformanceApi';
export const PRACTICE_PERFORMANCE_REQUEST = 'PRACTICE_PERFORMANCE_REQUEST';
export const PRACTICE_PERFORMANCE_RECEIVE = 'PRACTICE_PERFORMANCE_RECEIVE';
export const PRACTICE_PERFORMANCE_FAILURE = 'PRACTICE_PERFORMANCE_FAILURE';
import { ENTITYCOMPARISONFLAG } from '../../helper/constants';

const requestPracticePerformance = () => ({
  type: PRACTICE_PERFORMANCE_REQUEST,
});

const receivePracticePerformance = payload => ({
  type: PRACTICE_PERFORMANCE_RECEIVE,
  payload,
});

const failurePracticePerformance = () => ({
  type: PRACTICE_PERFORMANCE_FAILURE,
});

export const getMeasuresPerformanceData = params => {
  let measurePerformance;
  return getMeasuresPerformance({
    input: {
      EntityName: params.EntityName,
      EntityId: params.EntityId,
      ParentEntityId: params.ParentEntityId,
      ParentEntityName: params.ParentEntityName,
      DurationFrom: params.DurationFrom,
      DurationTo: params.DurationTo,
      Flag: params.Flag,
      MeasureId: params.MeasureId,
      Unit: params.Unit,
      IsPatientSpecific: params.IsPatientSpecific,
      EntityComparisonFlag: ENTITYCOMPARISONFLAG,
    },
  })
    .then(json => {
      let returnValue = json.data.getMeasurePerformanceAverage;
      measurePerformance = {
        performanceData: {
          performanceText: 'Achieved Performance',
          performance: returnValue.EntityAverage,
          performancePosition: 'left',
          benchMark: [
            {
              label: 'Registry Average',
              data: returnValue.RegistryAverage,
              position: 'above',
              colorcode: '',
            },
            {
              label: 'Registry BenchMark',
              data: returnValue.RegistryBenchmark,
              position: 'above',
              colorcode: '',
            },
            {
              label: 'CMS Average',
              data: returnValue.CMSBenchmark,
              position: 'below',
              colorcode: '',
            },
          ],
          colorcode: 'progress-bar-success',
        },
      };
    })
    .catch(ex => {
      throw new Error(ex);
    });
};
