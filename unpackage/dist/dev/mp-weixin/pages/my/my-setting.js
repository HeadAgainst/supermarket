"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-userinfo",
  computed: {
    // 将 m_user 模块中的 userinfo 映射到当前页面中使用
    ...common_vendor.mapState("m_user", ["userinfo"])
  },
  data() {
    return {};
  },
  methods: {
    ...common_vendor.mapMutations("m_user", ["updateUserInfo", "updateToken", "updateAddress"]),
    // 退出登录
    async logout() {
      const [err, succ] = await common_vendor.index.showModal({
        title: "提示",
        content: "确认退出登录吗？"
      }).catch((err2) => err2);
      if (succ && succ.confirm) {
        this.updateUserInfo({});
        this.updateToken("");
        this.updateAddress({});
      }
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      showArrow: true,
      thumb: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      ["thumb-size"]: "lg",
      rightText: "点击更改头像"
    }),
    b: common_vendor.p({
      showArrow: true,
      title: "昵称",
      rightText: "未设置"
    }),
    c: common_vendor.p({
      showArrow: true,
      title: "手机",
      rightText: "1785799xxxx"
    }),
    d: common_vendor.p({
      title: "版本",
      rightText: "V1.0.0"
    }),
    e: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-61efca94"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/my-setting.vue"]]);
wx.createPage(MiniProgramPage);
