import axios from "axios";
import * as Const from '../config/Constants';

import React from 'react';

import { GlobalContext } from '../utility/context';


const API_URL = Const.API_URL + '/api';

export const authPost = (url, body) => {
  const { globalState } = React.useContext(GlobalContext);
  const token = `Bearer ${globalState.userToken}`;
  //console.log(token);
  return fetch(API_URL + url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  }).then(
    (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw Error("Unauthorized");
        } else {
          console.log(res);
          try {
            res.json().then((res1) => console.log(res1));
          } catch (err) {}
          throw Error();
        }
        return null;
      }
      return res.json();
    },
    (error) => {
      console.log(error);
    }
  );
};
export const authPostMultiPart = (url, body) => {
  /*
  return fetch(API_URL + url, {
    method: "POST",
    headers: {
      "X-Auth-Token": token,
    },
    body: body,
  });
  */

  const { globalState } = React.useContext(GlobalContext);
  const token = `Bearer ${globalState.userToken}`;
  return fetch(API_URL + url, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: body,
  }).then(
    (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw Error("Unauthorized");
        } else {
          console.log(res);
          try {
            res.json().then((res1) => console.log(res1));
          } catch (err) {}
          throw Error();
        }
        return null;
      }
      return res.json();
    },
    (error) => {
      console.log(error);
    }
  );
};
export const authPut = (url, body) => {
  const { globalState } = React.useContext(GlobalContext);
  const token = `Bearer ${globalState.userToken}`;
  return fetch(API_URL + url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
};
export const authGetImg = (url) => {
  const { globalState } = React.useContext(GlobalContext);
  const token = `Bearer ${globalState.userToken}`;
  return fetch(API_URL + url, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
};
export const authGet = (url) => {
  const { globalState } = React.useContext(GlobalContext);
  const token = `Bearer ${globalState.userToken}`;
  return fetch(API_URL + url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
  }).then(
    (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw Error("Unauthorized");
        } else {
          console.log(res);
          try {
            res.json().then((res1) => console.log(res1));
          } catch (err) {}
          throw Error();
        }
        return null;
      }
      return res.json();
    },
    (error) => {
      console.log(error);
    }
  );
};
export const authDelete = (url, body) => {
  const { globalState } = React.useContext(GlobalContext);
  const token = `Bearer ${globalState.userToken}`;
  return fetch(API_URL + url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  }).then(
    (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw Error("Unauthorized");
        } else {
          console.log(res);
          try {
            res.json().then((res1) => console.log(res1));
          } catch (err) {}
          throw Error();
        }
        return null;
      }
      return res.json();
    },
    (error) => {
      console.log(error);
    }
  );
};
export default {
  getMenu: () => {
    return authGet(token, "/menu");
  },
};

export const axiosPost = (url, data) => {
  const { globalState } = React.useContext(GlobalContext);
  const token = `Bearer ${globalState.userToken}`;
  return axios.post(API_URL + url, data, {
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
  });
};

export const axiosGet = (url) => {
  const { globalState } = React.useContext(GlobalContext);
  const token = `Bearer ${globalState.userToken}`;
  return axios.get(API_URL + url, {
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
  });
};

export const axiosPut = (url, data) => {
  const { globalState } = React.useContext(GlobalContext);
  const token = `Bearer ${globalState.userToken}`;
  return axios.put(API_URL + url, data, {
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
  });
};

const isFunction = (func) =>
  func &&
  (Object.prototype.toString.call(func) === "[object Function]" ||
    "function" === typeof func ||
    func instanceof Function);

/**
 * url, method, and data properties don't need to be specified in config.
 * @param {*} token
 * @param {*} history
 * @param {*} method
 * @param {*} url
 * @param {*} onSuccess
 * @param {*} onErrors
 * @param {*} data
 * @param {*} config
 */
export const request = async (
  history,
  method,
  url,
  successHandler,
  errorHandlers = {},
  data,
  config
) => {
  const { globalState } = React.useContext(GlobalContext);
  const token = `Bearer ${globalState.userToken}`;
  try {
    const res = await axios({
      baseURL: API_URL,
      method: method.toLowerCase(),
      url: url,
      data: data,
      ...config,
      headers: {
        "content-type": "application/json",
        Authorization: token,
        ...config?.headers,
      },
    });

    if (isFunction(successHandler)) {
      successHandler(res);
    }
  } catch (e) {
    // Handling work to do when encountering all kinds of errors, e.g turn off the loading icon.
    if (isFunction(errorHandlers["onError"])) {
      errorHandlers["onError"](e);
    }

    if (e.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx.
      switch (e.response.status) {
        case 401:
          if (isFunction(errorHandlers[401])) {
            errorHandlers[401](e);
          } else {
            history.push({ pathname: "/login" });
          }
          break;
        case 403:
          if (isFunction(errorHandlers[403])) {
            errorHandlers[403](e);
          } else {
            infoNoti("Bạn cần được cấp quyền để thực hiện hành động này.");
          }
          break;
        default:
          if (isFunction(errorHandlers[e.response.status])) {
            errorHandlers[e.response.status](e);
          } else if (isFunction(errorHandlers["rest"])) {
            errorHandlers["rest"](e);
          } else {
            errorNoti("Rất tiếc! Đã có lỗi xảy ra.");
          }
      }
    } else if (e.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(
        "The request was made but no response was received",
        e.request
      );

      if (isFunction(errorHandlers["noResponse"])) {
        errorHandlers["noResponse"](e);
      }

      errorNoti("Không thể kết nối tới máy chủ.");
    } else {
      // Something happened in setting up the request that triggered an Error.
      console.log(
        "Something happened in setting up the request that triggered an Error",
        e.message
      );
    }
    console.log("Request config", e.config);
  }
};