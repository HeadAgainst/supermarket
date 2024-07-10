"use strict";
const api_request = require("./request.js");
const order = {
  submitOrder(data) {
    return api_request.http.post("/orders", data);
  },
  getAdress() {
    return api_request.http.get("/users/1/addresses");
  },
  createAddress(data) {
    return api_request.http.post("/addresses", data);
  }
};
exports.order = order;
