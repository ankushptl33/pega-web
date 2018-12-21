/*eslint no-console: ["off", { allow: ["warn", "error"] }] */
import Default from './constants.js';
//correct URL for Reserved proxy
//Get the millisecond of current time.

export const GetBaseUrl = () => {
  const key = 'BASE_URL';

  const base =
    window.sessionStorage.getItem(key) ||
    document.getElementsByTagName('base')[0].getAttribute('href') ||
    '/';

  window.sessionStorage.setItem(key, base);

  /* devblock:start */
  // console.log((`base URL is ${base}`);
  /* devblock:end */

  return base;
};

/**
 *getImgSrc for both normal hosting and Reverse proxy
 *
 * @export
 * @param {string} url the relative image url
 * @returns real url
 */
export function getImgSrc(url) {
  //if (typeof url !== 'string') return url;
  const base = GetBaseUrl();

  return !base || base === '/' || url.indexOf(base) >= 0
    ? url
    : `${base}/${url}`;
}
