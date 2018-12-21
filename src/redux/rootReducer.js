import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import storage from 'redux-persist/es/storage';
import encryptor from './encryptor';
import practiceReducer from './reducers/practiceReducer';
import measureFliterReducer from './reducers/measureFliterReducer';
import practicePerformanceReducer from './reducers/practicePerformanceReducer';
import practiceMeasureReducer from './reducers/practiceMeasureReducer';
import locationPerformance from './reducers/locationPerformanceReducer';
import clinicianPerformanceReducer from './reducers/clinicianPerformanceReducer';
import performanceTrendInfoReducer from './reducers/performanceTrendInfoReducer';
import practiceRefreshDateReducer from './reducers/practiceRefreshDateReducer';
import MeasurePeformanceReducer from './reducers/MeasurePerformanceReducer';
import patientReducer from './reducers/patientReducer';
import ClinicianTrendPerformance from './modules/clinicianTrendPerformance';
import LocationTrendPerformance from './modules/locationTrendPerformance';
import userDetailReducer from './reducers/userDetailsReducers';
import { ResetReduxStateType } from '@/redux/modules/userModule';
import QualityDashboard from './modules/qualityDashboard';
import MeasureFilter from './modules/measureFilter';
import PracticeDashboard from './modules/practiceDashboard';
import LocationDashboard from './modules/locationDashboard';
import ProviderDashboard from './modules/providerDashboard';
import RegistryMeasureList from './modules/registryMeasureList';

const userPersistConfig = {
  key: 'app',
  storage,
  transforms: [encryptor],
  blacklist: ['isLoading'],
};

export default history => {
  const reducer = combineReducers({
    router: connectRouter(history),
    PerformanceTrendInfo: performanceTrendInfoReducer,
    Patient: patientReducer,
    MeasurePeformanceData: MeasurePeformanceReducer,
    ClinicianTrendPerformance,
    LocationTrendPerformance,
    UserData: userDetailReducer,
    QualityDashboard,
    MeasureFilter,
    PracticeDashboard,
    LocationDashboard,
    ProviderDashboard,
    RegistryMeasureList,
  });

  return (state, action) => {
    if (action.type === ResetReduxStateType) {
      state = undefined;
    }
    return reducer(state, action);
  };
};
