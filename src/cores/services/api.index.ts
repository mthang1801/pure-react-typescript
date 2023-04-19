import axios from "axios";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";

import { postMethod } from "src/utils/function.utils";
import { ICatchError } from "../interfaces/root.interfaces";

const addHeaders = async (
  url: string,
  options: object,
  dataHeaders: any,
  isAuth: boolean
) => {
  let headers: any = {
    "Content-Type": "application/json",
  };
  let token = localGetToken();
  let authUUID = localGetAuthUUID();
  if (isAuth && token) {
    headers.Authorization = token;
  }
  if (isAuth && authUUID) {
    headers["x-auth-uuid"] = authUUID;
  }
  if (dataHeaders) {
    headers = { ...headers, ...dataHeaders };
  }
  return axios({ url: `${url}`, headers: headers, ...options });
};

const apiWithPayload =
  (method: string, isAuth: boolean) =>
  (url: string, payload?: object, token?: string) => {
    return new Promise((resolve, reject) => {
      addHeaders(
        url,
        {
          method,
          data: method !== "GET" ? payload : postMethod(payload),
          params: method === "GET" ? payload || "" : "",
        },
        undefined,
        isAuth || false
      )
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          let catchError: ICatchError = handleError({
            ...err.response,
            url: url,
          });
          reject(catchError);
        });
    });
  };

const apiWithFormData =
  (method: string, isAuth: boolean) =>
  async (url: string, formData: object) => {
    let _data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value) && value?.length > 0) {
        value.forEach((item: any) => {
          _data.append(key, item);
        });
      } else _data.append(key, value);
    });

    return new Promise((resolve, reject) => {
      addHeaders(
        url,
        {
          method,
          data: _data,
        },
        {
          // 'Accept': 'multipart/form-data',
          "Content-type": "multipart/form-data",
          // 'accept-encoding': 'gzip',
        },
        isAuth || false
      )
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          let catchError: ICatchError = handleError(err.response);
          reject(catchError);
        });
    });
  };

const handleError = (err: any) => {
  let resultError;
  if (err?.data) {
    resultError = {
      message: err?.data?.message,
      statusCode: err?.data?.statusCode,
      data: err?.data?.data || "Lỗi",
    };
  } else {
    resultError = {
      message: `${err?.url ? err?.url + ", lỗi hệ thống !" : "Lỗi hệ thống !"}`,
      statusCode: 500,
    };
  }
  // //token exprired
  // if (([408, 500]).includes(err?.status))
  //   configureStore().dispatch(putSignIn(false));
  return resultError;
};

export const api = {
  get: apiWithPayload("GET", true),
  getNoAuth: apiWithPayload("GET", false),
  delete: apiWithPayload("DELETE", true),
  post: apiWithPayload("POST", true),
  put: apiWithPayload("PUT", true),
  postMultipart: apiWithFormData("POST", true),
  // putMultipart: apiWithFormData('PUT')
};
