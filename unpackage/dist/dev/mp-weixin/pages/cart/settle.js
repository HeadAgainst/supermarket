"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../eventBus.js");
const _sfc_main = {
  data() {
    return {
      customButtonGroup1: [{
        text: "立即购买",
        backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
        color: "#fff"
      }],
      options: [{
        icon: "chat",
        text: "客服"
      }, {
        icon: "shop",
        text: "店铺",
        info: 2,
        infoBackgroundColor: "#007aff",
        infoColor: "#f5f5f5"
      }, {
        icon: "cart",
        text: "购物车",
        info: 2
      }]
    };
  },
  computed: {
    ...common_vendor.mapGetters(["totalPrice"]),
    ...common_vendor.mapState(["cart"])
  },
  methods: {
    ...common_vendor.mapMutations(["changeCartState", "emptyCart"]),
    numberChangeHandler(e, index) {
      this.changeCartState({
        index,
        key: "num",
        value: e
      });
    },
    submit() {
      this.emptyCart();
      common_vendor.index.navigateTo({
        url: "/pages/cart/SetttleSuccess"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  (_easycom_uni_col2 + _easycom_uni_icons2 + _easycom_uni_row2 + _easycom_uni_number_box2)();
}
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
if (!Math) {
  (_easycom_uni_col + _easycom_uni_icons + _easycom_uni_row + _easycom_uni_number_box)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      span: 2
    }),
    b: common_vendor.p({
      span: 20
    }),
    c: common_vendor.p({
      type: "right"
    }),
    d: common_vendor.p({
      span: 2
    }),
    e: common_vendor.f(_ctx.cart, (item, index, i0) => {
      return {
        a: item.imageSrc,
        b: common_vendor.t(item.text),
        c: common_vendor.t(item.price),
        d: common_vendor.o(($event) => $options.numberChangeHandler($event, index), index),
        e: "1f893c51-5-" + i0,
        f: common_vendor.p({
          min: 1,
          value: item.num
        }),
        g: index
      };
    }),
    f: common_vendor.t(_ctx.totalPrice),
    g: common_vendor.p({
      span: 12
    }),
    h: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    i: common_vendor.p({
      span: 12
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1f893c51"], ["__file", "E:/Downloads/HBuildX/workplace/demo3/pages/cart/settle.vue"]]);
wx.createPage(MiniProgramPage);
