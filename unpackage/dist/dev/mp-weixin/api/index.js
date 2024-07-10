"use strict";
const api_user = require("./user.js");
const api_order = require("./order.js");
const api_goods = require("./goods.js");
const api = {
  user: api_user.user,
  order: api_order.order,
  goods: api_goods.goods
};
exports.api = api;
