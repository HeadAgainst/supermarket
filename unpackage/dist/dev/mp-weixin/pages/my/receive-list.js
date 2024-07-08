"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      index: null,
      name: "",
      phone: "",
      detail: ""
    };
  },
  onLoad(options) {
    if (options.index !== void 0) {
      this.index = parseInt(options.index);
      this.name = decodeURIComponent(options.name);
      this.phone = decodeURIComponent(options.phone);
      this.detail = decodeURIComponent(options.detail);
    }
  },
  methods: {
    saveAddress() {
      const updatedAddress = {
        name: this.name,
        phone: this.phone,
        detail: this.detail
      };
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.emit("updateAddress", { index: this.index, address: updatedAddress });
      common_vendor.index.navigateBack();
    },
    getAddressList() {
      common_vendor.wx$1.chooseAddress({
        success: (res) => {
          this.name = res.userName;
          this.phone = res.telNumber;
          this.detail = res.provinceName + res.cityName + res.countyName + res.detailInfo;
        }
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
      title: "姓名"
    }),
    b: $data.name,
    c: common_vendor.o(($event) => $data.name = $event.detail.value),
    d: common_vendor.p({
      title: "电话"
    }),
    e: $data.phone,
    f: common_vendor.o(($event) => $data.phone = $event.detail.value),
    g: common_vendor.o($options.getAddressList),
    h: common_vendor.p({
      showArrow: true,
      title: "地址",
      ["right-text"]: "点击获取地址",
      to: "receive-get"
    }),
    i: $data.detail,
    j: common_vendor.o(($event) => $data.detail = $event.detail.value),
    k: common_vendor.o((...args) => $options.saveAddress && $options.saveAddress(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e14ade85"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/receive-list.vue"]]);
wx.createPage(MiniProgramPage);
