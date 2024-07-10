"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      index: null,
      user_id: "1",
      // 假设用户ID是1
      name: "",
      phone: "",
      address_line1: "",
      address_line2: ""
      // 新增字段 address_line2
    };
  },
  onLoad(options) {
    if (options.index !== void 0) {
      this.index = parseInt(options.index);
      this.name = decodeURIComponent(options.name);
      this.phone = decodeURIComponent(options.phone);
      this.address_line1 = decodeURIComponent(options.detail);
    }
  },
  methods: {
    saveAddress() {
      const updatedAddress = {
        name: this.name,
        phone: this.phone,
        detail: this.address_line1
      };
      const data = {
        name: this.name,
        user_id: this.user_id,
        phone: this.phone,
        address_line1: this.address_line1,
        address_line2: null
      };
      this.$api.user.post(data).then((res) => {
        console.log(data);
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit("updateAddress", { index: this.index, address: updatedAddress });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 2e3);
      }).catch((error) => {
        console.error("Error saving address:", error);
      });
    },
    getAddressList() {
      common_vendor.wx$1.chooseAddress({
        success: (res) => {
          this.name = res.userName;
          this.phone = res.telNumber;
          this.address_line1 = res.provinceName + res.cityName + res.countyName + res.detailInfo;
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
    i: $data.address_line1,
    j: common_vendor.o(($event) => $data.address_line1 = $event.detail.value),
    k: common_vendor.o((...args) => $options.saveAddress && $options.saveAddress(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e14ade85"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/receive-list.vue"]]);
wx.createPage(MiniProgramPage);
