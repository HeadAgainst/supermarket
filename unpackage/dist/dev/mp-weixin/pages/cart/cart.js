"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../eventBus.js");
const _sfc_main = {
  data() {
    return {
      options: [{
        text: "删除",
        style: {
          backgroundColor: "#dd524d"
        }
      }],
      selectAll: false,
      value: 1
    };
  },
  computed: {
    ...common_vendor.mapState(["cart"]),
    ...common_vendor.mapGetters(["totalPrice", "totalNum"])
  },
  methods: {
    ...common_vendor.mapMutations(["changeCartState", "deleteOneGood", "addOneGood"]),
    swipeItemClickHandler(index) {
      this.deleteOneGood(index);
      if (this.totalNum == 0) {
        common_vendor.index.removeTabBarBadge({
          index: 2
        });
      }
    },
    radioClickHandler(index) {
      this.changeCartState({
        index,
        key: "state",
        value: !this.cart[index].state
      });
    },
    numberChangeHandler(e, index) {
      this.addOneGood({
        id: this.cart[index].id,
        num: 1,
        price: this.cart[index].price,
        imageSrc: this.cart[index].imageSrc,
        text: this.cart[index].text
      });
    },
    changeAllState() {
      this.selectAll = !this.selectAll;
      for (let i = 0; i < this.cart.length; i++) {
        this.changeCartState({
          index: i,
          key: "state",
          value: this.selectAll
        });
      }
    },
    settlement() {
      if (this.cart.length == 0) {
        common_vendor.index.showToast({
          title: "购物车为空哦~",
          icon: "error"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/cart/settle"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  (_easycom_uni_icons2 + _easycom_uni_number_box2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_number_box + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "shop",
      size: "18"
    }),
    b: common_vendor.f(_ctx.cart, (item, index, i0) => {
      return {
        a: item.state,
        b: common_vendor.o(($event) => $options.radioClickHandler(index), index),
        c: item.imageSrc,
        d: common_vendor.t(item.text),
        e: common_vendor.t(item.price),
        f: common_vendor.o(($event) => $options.numberChangeHandler($event, index), index),
        g: "c91e7611-3-" + i0 + "," + ("c91e7611-2-" + i0),
        h: common_vendor.p({
          min: 1,
          value: item.num
        }),
        i: common_vendor.o(($event) => $options.swipeItemClickHandler(index), index),
        j: "c91e7611-2-" + i0 + ",c91e7611-1",
        k: index
      };
    }),
    c: common_vendor.p({
      ["right-options"]: $data.options
    }),
    d: _ctx.totalNum == 0
  }, _ctx.totalNum == 0 ? {} : {}, {
    e: $data.selectAll,
    f: common_vendor.o((...args) => $options.changeAllState && $options.changeAllState(...args)),
    g: common_vendor.t(_ctx.totalPrice),
    h: common_vendor.o((...args) => $options.settlement && $options.settlement(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c91e7611"], ["__file", "E:/Downloads/HBuildX/workplace/demo3/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
