"use strict";
const api_request = require("./request.js");
const user = {
  //登录接口
  login(params) {
    return api_request.http.get("/users");
  },
  //获取所有用户（get /users)
  //注册新用户(post /users)
  //删除用户(delete /users/:user_id)
  //获取特定用户的地址(get /users/:user_id/addresses)
  getSpecialAddress(user_id) {
    return api_request.http.get(`/users/${user_id}/addresses`);
  },
  //获取所有地址(get /addresses)
  //创建新地址(post /addresses)
  post(data) {
    return api_request.http.post(`/addresses`, data);
  },
  //删除地址(post /addresses/:address_id)
  delete(address_id) {
    return api_request.http.delete(`/addresses/${address_id}`);
  },
  //获取所有评论(get /reviews)
  //创建新评论(post /reviews)
  postreview(data) {
    return api_request.http.post(`/reviews`, data);
  },
  //删除评论(delete /reviews/:reviews_id)
  deleteReview(review_id) {
    return api_request.http.delete(`/reviews/${review_id}`);
  },
  //获取某用户，默认为1全部订单及其评论(get /orders/:user_id)
  getOrders(user_id) {
    return api_request.http.get(`/users/${user_id}/orders`);
  },
  //获取特定订单(get /orders/:order_id)
  getSpecialOreder(order_id) {
    return api_request.http.get(`/orders/${order_id}`);
  },
  //更新订单状态(put orders/:order_id)
  updateOrders(order_id, status) {
    const url = `/orders/${order_id}?status=${encodeURIComponent(status)}`;
    return api_request.http.put(url);
  },
  //获取指定产品的信息
  getProductdetail(product_id) {
    return api_request.http.get(`/products/${product_id}`);
  },
  //获取指定地址信息
  getAddress(address_id) {
    return api_request.http.get(`/addresses/${address_id}`);
  },
  //获取所有评论图⽚URL列表 ( GET /reviews_img/:review_id )
  getReviewimgURl(review_id) {
    return api_request.http.get(`/reviews_img/${review_id}`);
  },
  //获取评论图片
  getgetReviewimg(review_id, code) {
    return api_request.http.get(`/reviews_img/${review_id}/${code}`);
  },
  postReviewimg(review_id, data) {
    return api_request.http.post(`/reviews_img/${review_id}`, { image: data });
  }
};
exports.user = user;
