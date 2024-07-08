"use strict";
const common_vendor = require("../../common/vendor.js");
const bottom = () => "../../components/bottom.js";
const _sfc_main = {
  components: {
    bottom
  },
  data() {
    return {
      current: 0,
      swiperInfo: [
        "../../static/goodsImage/pingguodetail/pingguo.jpg",
        "../../static/goodsImage/pingguodetail/pingguo2.jpg"
      ],
      currentId: 0
    };
  },
  methods: {
    ...common_vendor.mapMutations(["addOneGood", "subtractOneGood"]),
    swiperChange(e) {
      this.current = e.detail.current;
    },
    addOrMinus(flag) {
      console.log(this.currentId);
      if (flag == true) {
        this.addOneGood({
          id: this.currentId,
          num: 1,
          price: 10,
          imageSrc: "../../static/goodsImage/pingguo.jpg",
          text: "苹果"
        });
      } else {
        this.subtractOneGood({
          id: this.currentId,
          num: 1
        });
      }
    }
  },
  onLoad(options) {
    this.currentId = options.id;
    console.log(typeof this.currentId);
  },
  computed: {
    ...common_vendor.mapState(["goods"])
  }
};
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_bottom = common_vendor.resolveComponent("bottom");
  (_easycom_uni_swiper_dot2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _component_bottom)();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_swiper_dot + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swiperInfo, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: common_vendor.o((...args) => $options.swiperChange && $options.swiperChange(...args)),
    c: common_vendor.p({
      info: $data.swiperInfo,
      current: $data.current,
      mode: "dot"
    }),
    d: common_vendor.o(($event) => $options.addOrMinus(false)),
    e: common_vendor.p({
      type: "minus",
      color: "#ffaa00"
    }),
    f: common_vendor.o(($event) => $options.addOrMinus(true)),
    g: common_vendor.p({
      type: "plus",
      color: "#ffaa00"
    }),
    h: common_vendor.p({
      ["border-full"]: true
    }),
    i: common_vendor.p({
      title: "列表左侧带略缩图",
      note: "列表描述信息",
      thumb: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      ["thumb-size"]: "lg"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-adbe0a1d"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/goods/detail.vue"]]);
wx.createPage(MiniProgramPage);
