/* eslint-env browser */

import _ from 'lodash';
import StorageProvider from './storage.provider';

const DRF_SSO_AUTH = 'DRF_SSO_AUTH';
const AUTH_TOKEN = 'AUTH_TOKEN';

export default class Session {
  constructor() {
    this.extendSession = this.extendSession.bind(this);
    this.storage = window.sessionStorage;
  }

  static create(obj) {
    StorageProvider.set(DRF_SSO_AUTH, obj);
  }

  static getSessionVal(key) {
    const obj = StorageProvider.get(DRF_SSO_AUTH);
    if (obj) {
      return obj[key];
    }
    return null;
  }

  static isAuthenticated() {
    return !_.isEmpty(StorageProvider.get(DRF_SSO_AUTH));
  }

  static isAuthTokenPresent() {
    return !_.isEmpty(StorageProvider.get(AUTH_TOKEN));
  }

  static getUserId() {
    const user = StorageProvider.get(DRF_SSO_AUTH);
    return user ? user.userId : null;
  }

  static getUserName() {
    const user = StorageProvider.get(DRF_SSO_AUTH);
    return user ? user.userName : null;
  }

  static getSession() {
    const obj = StorageProvider.get(DRF_SSO_AUTH);
    if (obj) {
      return obj;
    }
    return null;
  }

  static getAuthToken() {
    return StorageProvider.get(AUTH_TOKEN) || null;
  }

  static deleteSession() {
    if (StorageProvider.get(DRF_SSO_AUTH)) {
      StorageProvider.deleteAll();
    }
  }

  static extendSession() {
    const session = StorageProvider.get(DRF_SSO_AUTH);
    StorageProvider.set(DRF_SSO_AUTH, session);
  }

  static setAuthToken(authToken) {
    StorageProvider.set(AUTH_TOKEN, authToken);
  }

  static setSessionForAnalysis(key, value) {
    this.storage.setItem(key, value);
  }

  static getSessionForAnalysis(key) {
    return this.storage.getItem(key);
  }

  static removeItem(key) {
    return this.storage.removeItem(key);
  }
}
