"use strict";
const common_vendor = require("../common/vendor.js");
const moduleUser = {
  namespaced: true,
  state: () => ({
    address: JSON.parse(common_vendor.index.getStorageSync("address") || "{}"),
    // 登录成功之后的 token 字符串
    // 登录成功之后的 token 字符串
    token: common_vendor.index.getStorageSync("token") || "",
    // 用户的基本信息
    userinfo: JSON.parse(common_vendor.index.getStorageSync("userinfo") || "{}"),
    redirectInfo: null
  }),
  mutations: {
    updateAddress(state, address) {
      state.address = address;
      this.commit("m_user/saveAddressToStorage");
    },
    // 持久化存储
    saveAddressToStorage(state) {
      common_vendor.index.setStorageSync("address", JSON.stringify(state.address));
    },
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo;
      this.commit("m_user/saveUserInfoToStorage");
    },
    saveUserInfoToStorage(state) {
      common_vendor.index.setStorageSync("userinfo", JSON.stringify(state.userinfo));
    },
    // 更新 token 字符串
    updateToken(state, token) {
      state.token = token;
      this.commit("m_user/saveTokenToStorage");
    },
    // 将 token 字符串持久化存储到本地
    saveTokenToStorage(state) {
      common_vendor.index.setStorageSync("token", state.token);
    },
    // 更新重定向信息
    updataRedirectInfo(state, info) {
      state.redirectInfo = info;
      console.log(state.redirectInfo);
    }
  },
  getters: {
    addstr(state) {
      if (!state.address.provinceName)
        return "";
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo;
    }
  }
};
exports.moduleUser = moduleUser;
