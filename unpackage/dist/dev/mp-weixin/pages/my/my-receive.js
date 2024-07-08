"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      addresses: [
        { name: "张三", phone: "1234567890", detail: "地址1" },
        { name: "李四", phone: "0987654321", detail: "地址2" }
      ],
      selectedIndex: null
    };
  },
  methods: {
    showOptions(index) {
      this.selectedIndex = index;
    },
    editAddress(index) {
      const address = this.addresses[index];
      const self = this;
      common_vendor.index.navigateTo({
        url: `/pages/my/receive-list?index=${index}&name=${encodeURIComponent(address.name)}&phone=${encodeURIComponent(address.phone)}&detail=${encodeURIComponent(address.detail)}`,
        events: {
          updateAddress(data) {
            self.$set(self.addresses, data.index, data.address);
          }
        }
      });
      this.selectedIndex = null;
    },
    deleteAddress(index) {
      this.addresses.splice(index, 1);
      this.selectedIndex = null;
    },
    copyAddress(index) {
      const address = this.addresses[index];
      const text = `姓名: ${address.name}, 电话: ${address.phone}, 地址: ${address.detail}`;
      common_vendor.index.setClipboardData({
        data: text,
        success() {
          common_vendor.index.showToast({
            title: "已复制到剪切板",
            icon: "success"
          });
        }
      });
      this.selectedIndex = null;
    },
    cancelOptions() {
      this.selectedIndex = null;
    },
    addAddress() {
      this.addresses.push({ name: "", phone: "", detail: "" });
      this.selectedIndex = this.addresses.length - 1;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.addresses, (address, index, i0) => {
      return {
        a: common_vendor.t(address.name),
        b: common_vendor.t(address.phone),
        c: common_vendor.t(address.detail),
        d: common_vendor.o(($event) => $options.showOptions(index), index),
        e: index
      };
    }),
    b: $data.selectedIndex !== null
  }, $data.selectedIndex !== null ? {
    c: common_vendor.o(($event) => $options.editAddress($data.selectedIndex)),
    d: common_vendor.o(($event) => $options.deleteAddress($data.selectedIndex)),
    e: common_vendor.o(($event) => $options.copyAddress($data.selectedIndex)),
    f: common_vendor.o((...args) => $options.cancelOptions && $options.cancelOptions(...args))
  } : {}, {
    g: common_vendor.o((...args) => $options.addAddress && $options.addAddress(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/my-receive.vue"]]);
wx.createPage(MiniProgramPage);
