"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    ...common_vendor.mapMutations(["addOneGood"]),
    gotoCart() {
      common_vendor.index.switchTab({
        url: "/pages/cart/cart"
      });
    }
  },
  computed: {
    ...common_vendor.mapState(["cart"]),
    ...common_vendor.mapGetters(["totalPrice"]),
    totalNum() {
      return this.cart.length;
    },
    dynamicWidth() {
      let i = 30 + (String(this.totalNum).length - 1) * 15;
      console.log(i + "upx");
      return i + "upx";
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  (_easycom_uni_icons2 + _easycom_uni_col2 + _easycom_uni_row2)();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_col = () => "../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../uni_modules/uni-row/components/uni-row/uni-row.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_col + _easycom_uni_row)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "cart-filled",
      color: "#fff",
      size: "30"
    }),
    b: common_vendor.o((...args) => $options.gotoCart && $options.gotoCart(...args)),
    c: common_vendor.t($options.totalNum),
    d: common_vendor.o((...args) => $options.gotoCart && $options.gotoCart(...args)),
    e: common_vendor.o((...args) => $options.gotoCart && $options.gotoCart(...args)),
    f: common_vendor.p({
      span: 4
    }),
    g: common_vendor.t(_ctx.totalPrice),
    h: common_vendor.t($options.totalNum),
    i: common_vendor.p({
      span: 12
    }),
    j: common_vendor.o((...args) => $options.gotoCart && $options.gotoCart(...args)),
    k: common_vendor.p({
      span: 8
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-020da843"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/components/bottom.vue"]]);
wx.createComponent(Component);
