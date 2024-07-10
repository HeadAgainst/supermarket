"use strict";
const api_request = require("./request.js");
const goods = {
  getGoods() {
    return api_request.http.get("/products");
  },
  getGoodImageLs(product_id) {
    return api_request.http.get(`/products_img/${product_id}`);
  },
  getGoodImage(product_id, code) {
    return api_request.http.get(`/products_img/${product_id}/${code}`);
  },
  getCategoryGood(category) {
    return api_request.http.get(`/products/category/${category}`);
  },
  getOneGood(productId) {
    return api_request.http.get(`/products/${productId}`);
  }
};
exports.goods = goods;
