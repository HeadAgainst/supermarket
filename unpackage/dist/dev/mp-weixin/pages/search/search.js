"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchValue: "",
      searchRes: []
    };
  },
  methods: {
    input(res) {
      this.searchRes = [];
      for (let i = 0; i < this.goods.length; i++) {
        if (this.goods[i].text.includes(res)) {
          this.searchRes.push(this.goods[i]);
        }
      }
    },
    search(res) {
      this.searchRes = [];
      for (let i = 0; i < this.goods.length; i++) {
        if (this.goods[i].text.includes(res.value)) {
          this.searchRes.push(this.goods[i]);
        }
      }
    },
    cancel() {
      this.searchRes = this.goods;
    },
    gotoGoodDetail(good) {
      const goodStr = encodeURIComponent(JSON.stringify(good));
      const url = `/pages/goods/detail?good=${goodStr}`;
      common_vendor.index.navigateTo({
        url
      });
    }
  },
  onLoad() {
    this.searchRes = this.goods;
  },
  computed: {
    ...common_vendor.mapState(["goods"])
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_search_bar2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.search),
    b: common_vendor.o($options.cancel),
    c: common_vendor.o($options.cancel),
    d: common_vendor.o($options.input),
    e: common_vendor.o(($event) => $data.searchValue = $event),
    f: common_vendor.p({
      focus: true,
      placeholder: "请输入商品",
      modelValue: $data.searchValue
    }),
    g: common_vendor.f($data.searchRes, (item, index, i0) => {
      return {
        a: item.imageSrc,
        b: common_vendor.t(item.text),
        c: common_vendor.t(item.remaining),
        d: common_vendor.t(item.price),
        e: common_vendor.o(($event) => $options.gotoGoodDetail(item), index),
        f: "c10c040c-2-" + i0 + ",c10c040c-1",
        g: index
      };
    }),
    h: common_vendor.p({
      clickable: true
    }),
    i: common_vendor.p({
      border: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c10c040c"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
