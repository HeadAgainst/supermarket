"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  computed: {
    ...common_vendor.mapState(["isFromSettleSuccess"])
  },
  methods: {
    ...common_vendor.mapMutations(["changeIsFromSettleSuccess"]),
    goback() {
      this.changeIsFromSettleSuccess(true);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goback && $options.goback(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6940d9e8"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/cart/SetttleSuccess.vue"]]);
wx.createPage(MiniProgramPage);
