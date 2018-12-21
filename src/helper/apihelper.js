import { API_GATEWAY_URL } from '@/helper/constants.js';
import client from './axiosClient';
// import { createBrowserHistory } from 'history';

const APIHelper = function() {};

Object.defineProperty(APIHelper.prototype, 'Url', {
  value: API_GATEWAY_URL,
  writable: false,
});

Object.defineProperty(APIHelper.prototype, 'Resources', {
  get() {
    return {
      Practice: this.Url + 'practice',
      Provider: this.Url + 'provider',
      Location: this.Url + 'location',
      Measure: this.Url + 'measure',
      Performance: this.Url + 'performance',
      Patient: this.Url + 'patient',
      Authenticate: this.Url + 'checkidpwddb',
      FogotPassword: this.Url + 'getresetpasswordtoken',
      AuthenticateToken: this.Url + 'validateresetpasswordtoken',
      ResetPassword: this.Url + 'updatepassword',
      RenewToken: this.Url + 'renewtoken',
      TokenDeactivate: this.Url + 'token/deactivate',
      GetMenuDetails: this.Url + 'getresourcedetails',
      ValidateToken: this.Url + 'validatetoken',
      GetUserProfile: this.Url + 'getuserprofile',
      ResetPasswordLink: this.Url + 'resetpassword',
      ValidateRegistryDashboardToken:this.Url + 'validateRegistryDashboardToken'
    };
  },
  readable: true,
});

Object.defineProperty(APIHelper.prototype, 'Actions', {
  get() {
    return {
      View: 'View',
      Create: 'Create',
      Update: 'Update',
      Delete: 'Delete',
    };
  },
  readable: true,
});

Object.defineProperty(APIHelper.prototype, 'PegasusAPI', {
  get() {
    return async (url, requestOptions, callback) => {
      const res = await client.post(url, requestOptions.body, {
        headers: requestOptions.headers,
      });
      return res.data;
    };
  },
  readable: true,
});

Object.defineProperty(APIHelper.prototype, 'getRequestOption', {
  get() {
    return (query, variables, action, token) => ({
      method: 'POST',
      //mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        dataType: 'json',
        Action: action,
        Authorization: token,
      },
      body: JSON.stringify({ query, variables }),
    });
  },
  readable: true,
});

export default APIHelper;
