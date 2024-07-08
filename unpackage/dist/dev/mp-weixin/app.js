"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
const api_index = require("./api/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/cate/cate.js";
  "./pages/cart/cart.js";
  "./pages/my/my.js";
  "./pages/goods/detail.js";
  "./pages/search/search.js";
  "./pages/cart/settle.js";
  "./pages/cart/SetttleSuccess.js";
  "./pages/my/my-love.js";
  "./pages/my/my-argue.js";
  "./pages/my/argue-list.js";
  "./pages/my/my-camera.js";
  "./pages/my/my-bagage.js";
  "./pages/my/my-receive.js";
  "./pages/my/my-setting.js";
  "./pages/my/receive-list.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Downloads/HBuildX/workplace/supermarket/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.$api = api_index.api;
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
