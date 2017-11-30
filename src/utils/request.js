/* eslint-disable no-prototype-builtins, prefer-template */

// import fetch from 'whatwg-fetch';
import retry from 'async-retry';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  let newUrl = url;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (!options.method || options.method === 'GET' || options.method === 'DELETE' || options.method === 'POST') {
    if (options.query) {
      const queryString = serializeParams(options.query);
      newUrl = `${url}?${queryString}`;
    }
  }

  if (options.useDefaultContentType) {
    delete headers['Content-Type'];
  }

  options.headers = Object.assign({}, headers, options.headers ); // eslint-disable-line
  options.credentials = 'include'; // eslint-disable-line

  return retry(async () => {
    // if anything throws, we retry
    const res = await fetch(newUrl, options);

    if (res.status === 503) {
      const err = 'internal server error';
      throw Object.assign(err, { message: 'Unable to handle the request.' });
    }

    return res;
  }, {
    retries: 1,
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => data);
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status !== 204) { // do not try to parse empty response
    return response.json();
  }
  return true;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {objct} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */

function checkStatus(response) {
  if (response.ok) { // response.status >= 200 && response.status < 300
    return response;
  }

  // details from `whatwg-fetch`
  const err = 'internal server error';

  return err;
}

export function serializeParams(obj) {
  const str = [];
  Object.keys(obj).forEach(p => {
    if (obj.hasOwnProperty(p) && obj[p] !== undefined && obj[p] !== null) {  // we need to pass 0 and empty string
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  });
  return str.join('&');
}
