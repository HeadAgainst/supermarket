"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  computed: {
    ...common_vendor.mapState(["collectionBag"])
  },
  data() {
    return {
      isNoCollectoin: true
    };
  },
  methods: {
    gotoGoodDetail(goodId) {
      const url = `/pages/goods/detail?id=${goodId}`;
      common_vendor.index.navigateTo({
        url
      });
    }
  },
  onLoad() {
    this.isNoCollectoin = this.collectionBag.length == 0 ? true : false;
  }
};
if (!Array) {
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  (_easycom_uni_col2 + _easycom_uni_row2)();
}
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
if (!Math) {
  (_easycom_uni_col + _easycom_uni_row)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.isNoCollectoin,
    b: common_vendor.f(_ctx.collectionBag, (item, index, i0) => {
      return {
        a: item.imageSrc,
        b: common_vendor.o(($event) => $options.gotoGoodDetail(item.id), index),
        c: "bd37311f-1-" + i0 + "," + ("bd37311f-0-" + i0),
        d: common_vendor.t(item.text),
        e: common_vendor.t(item.remaining),
        f: common_vendor.t(item.price),
        g: common_vendor.o(($event) => $options.gotoGoodDetail(item.id), index),
        h: "bd37311f-2-" + i0 + "," + ("bd37311f-0-" + i0),
        i: "bd37311f-0-" + i0,
        j: index
      };
    }),
    c: common_vendor.p({
      span: 12
    }),
    d: common_vendor.p({
      span: 12
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bd37311f"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/my-love.vue"]]);
wx.createPage(MiniProgramPage);
