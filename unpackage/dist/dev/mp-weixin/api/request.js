"use strict";
const common_vendor = require("../common/vendor.js");
const http = {
  baseUrl: "http://127.0.0.1:8080",
  request(config) {
    config = beforeRequest(config);
    config.url = this.baseUrl + config.url;
    return new Promise((resolve, reject) => {
      common_vendor.index.request(config).then((res) => {
        beforeResponse(config);
        resolve(res);
      }).catch((err) => {
        errorHandle(err);
        reject(err);
      });
    });
  },
  get(url, data, auth) {
    return this.request({
      url,
      data,
      auth,
      method: "GET"
    });
  },
  post(url, data, auth) {
    return this.request({
      url,
      data,
      auth,
      method: "POST"
    });
  },
  delete(url, auth) {
    return this.request({
      url,
      auth,
      method: "DELETE"
    });
  },
  post(url, data, auth) {
    return this.request({
      url,
      data,
      auth,
      method: "PUT"
    });
  }
};
const beforeRequest = (config) => {
  console.log("请求拦截");
  return config;
};
const beforeResponse = (config) => {
  console.log("响应拦截");
  return config;
};
const errorHandle = (error) => {
  console.log("网络请求异常", error);
};
exports.http = http;
