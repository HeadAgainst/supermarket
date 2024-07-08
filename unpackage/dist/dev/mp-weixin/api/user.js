"use strict";
const api_request = require("./request.js");
const user = {
  login(params) {
    return api_request.http.get("/users");
  }
};
exports.user = user;
