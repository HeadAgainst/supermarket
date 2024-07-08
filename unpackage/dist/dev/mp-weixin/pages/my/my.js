"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    ...common_vendor.mapMutations(["changeIsFromSettleSuccess"])
  },
  computed: {
    ...common_vendor.mapState(["isFromSettleSuccess"])
  },
  onShow() {
    if (this.isFromSettleSuccess) {
      common_vendor.index.removeTabBarBadge({
        index: 2
      });
    }
    this.changeIsFromSettleSuccess(false);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.$store.state.username)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Downloads/HBuildX/workplace/demo3/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
