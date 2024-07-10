"use strict";
const api_request = require("./request.js");
const user = {
  login(params) {
    return api_request.http.get("/products_img/123");
  }
};
exports.user = user;
