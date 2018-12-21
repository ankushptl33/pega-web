import { GET_MEASURE_SET, GET_CALENDAR } from '../../graphql/query';
import APIHelper from '@/helper/apihelper';
import { getJwt } from '../../utils/jwtUtils';
const api = new APIHelper();

export const getMeasureSet = () => {
  const requestOption = api.getRequestOption(
    GET_MEASURE_SET,
    {
      input: {
        orderBy: 'name',
      },
    },
    api.Actions.View,
    getJwt(),
  );
  return api.PegasusAPI(api.Resources.Measure, requestOption, response => {
    return response;
  });
};

export const getCalendar = () => {
  const requestOption = api.getRequestOption(
    GET_CALENDAR,
    {
      input: {
        orderByDesc: 'id',
      },
    },
    api.Actions.View,
    getJwt(),
  );
  return api.PegasusAPI(api.Resources.Measure, requestOption, response => {
    return response;
  });
};
