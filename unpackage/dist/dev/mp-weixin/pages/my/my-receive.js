"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      addresses: [
        { name: "", phone: "", detail: "", address_id: "" }
      ],
      selectedIndex: null,
      errorMessage: "",
      showErrorMessage: false
      // 新增字段 showErrorMessage
    };
  },
  methods: {
    fetchAddresses() {
      this.$api.user.getSpecialAddress("1").then((res) => {
        if (res.data && Array.isArray(res.data)) {
          this.addresses = res.data.map((item) => {
            let detail = item.address_line1;
            if (item.address_line2) {
              detail += " " + item.address_line2;
            }
            return {
              name: item.name,
              phone: item.phone,
              detail,
              address_id: item.address_id
            };
          });
        }
      }).catch((error) => {
        console.error("Error fetching addresses:", error);
        this.errorMessage = "无法获取地址数据";
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 2e3);
      });
    },
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
            const address_id = self.addresses[index].address_id;
            self.$api.user.delete(address_id).then(() => {
              self.addresses.splice(index, 1);
              self.selectedIndex = null;
              setTimeout(() => {
                self.fetchAddresses();
              }, 2e3);
            }).catch((error) => {
              console.error("Error deleting address:", error);
              common_vendor.index.showToast({
                title: "此地址在用",
                icon: "error"
              });
            });
            self.$set(self.addresses, data.index, data.address);
          }
        }
      });
      this.selectedIndex = null;
    },
    deleteAddress(index) {
      const address_id = this.addresses[index].address_id;
      console.log(address_id);
      this.$api.user.delete(address_id).then(() => {
        this.addresses.splice(index, 1);
        this.selectedIndex = null;
        setTimeout(() => {
          this.fetchAddresses();
        }, 2e3);
      }).catch((error) => {
        console.error("Error deleting address:", error);
        common_vendor.index.showToast({
          title: "此地址在用",
          icon: "error"
        });
      });
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
      this.addresses.push({ name: "", phone: "", detail: "", address_id: "" });
      this.selectedIndex = this.addresses.length - 1;
    }
  },
  created() {
    this.fetchAddresses();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.errorMessage
  }, $data.errorMessage ? {
    b: common_vendor.t($data.errorMessage)
  } : {}, {
    c: common_vendor.f($data.addresses, (address, index, i0) => {
      return {
        a: common_vendor.t(address.name),
        b: common_vendor.t(address.phone),
        c: common_vendor.t(address.detail),
        d: common_vendor.o(($event) => $options.showOptions(index), index),
        e: index
      };
    }),
    d: $data.selectedIndex !== null
  }, $data.selectedIndex !== null ? {
    e: common_vendor.o(($event) => $options.editAddress($data.selectedIndex)),
    f: common_vendor.o(($event) => $options.deleteAddress($data.selectedIndex)),
    g: common_vendor.o(($event) => $options.copyAddress($data.selectedIndex)),
    h: common_vendor.o((...args) => $options.cancelOptions && $options.cancelOptions(...args))
  } : {}, {
    i: common_vendor.o((...args) => $options.addAddress && $options.addAddress(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/my-receive.vue"]]);
wx.createPage(MiniProgramPage);
