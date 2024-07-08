"use strict";
const common_vendor = require("../../common/vendor.js");
const bottom = () => "../../components/bottom.js";
const _sfc_main = {
  components: {
    bottom
  },
  data() {
    return {
      bottomView: true,
      boxColor: "#395287",
      boxColorLs: [
        "#395287",
        "#99ceee",
        "#fff3ec",
        "#dcb9b7"
      ],
      info: [
        "../../static/swiperImage/1.png",
        "../../static/swiperImage/2.png",
        "../../static/swiperImage/3.png",
        "../../static/swiperImage/4.png"
      ],
      current: 0,
      searchInfo: "",
      navList: [
        {
          "imageSrc": "../../static/navImage/shuiguo.png",
          "text": "水果蔬菜"
        },
        {
          "imageSrc": "../../static/navImage/xianrou.png",
          "text": "肉禽蛋品"
        },
        {
          "imageSrc": "../../static/navImage/haixian.png",
          "text": "海鲜水产"
        },
        {
          "imageSrc": "../../static/navImage/yinliao.png",
          "text": "酒水饮料"
        },
        {
          "imageSrc": "../../static/navImage/lingshi.png",
          "text": "休闲零食"
        },
        {
          "imageSrc": "../../static/navImage/miandian.png",
          "text": "烘焙面点"
        },
        {
          "imageSrc": "../../static/navImage/tiaowei.png",
          "text": "粮油调味"
        },
        {
          "imageSrc": "../../static/navImage/shuichan.png",
          "text": "鲜活水产"
        }
      ]
    };
  },
  computed: {
    ...common_vendor.mapState(["cart", "mapGoodNum", "goods", "isFromSettleSuccess"]),
    ...common_vendor.mapGetters(["totalNum"])
  },
  methods: {
    ...common_vendor.mapMutations([
      "addOneGood",
      "subtractOneGood",
      "changSortCurrent",
      "changeIsFromSettleSuccess"
    ]),
    searchFocus(e) {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    },
    swiperChange(e) {
      this.current = e.detail.current;
      this.boxColor = this.boxColorLs[this.current];
    },
    addOrMinus(add, index) {
      this.bottomView = true;
      if (add == true) {
        this.addOneGood({
          id: this.goods[index].id,
          num: 1,
          price: this.goods[index].price,
          imageSrc: this.goods[index].imageSrc,
          text: this.goods[index].text
        });
      } else {
        this.subtractOneGood({
          id: this.goods[index].id,
          num: 1
        });
      }
    },
    change(e) {
      let {
        index
      } = e.detail;
      this.changSortCurrent(index);
      common_vendor.index.switchTab({
        url: "/pages/cate/cate"
      });
    },
    inputInfo(e) {
    },
    gotoGoodDetail(goodId) {
      const url = `/pages/goods/detail?id=${goodId}`;
      common_vendor.index.navigateTo({
        url
      });
    },
    setCartBadge(count) {
      if (count > 0) {
        common_vendor.index.setTabBarBadge({
          index: 2,
          // 购物车 Tab 的索引，按照 pages.json 中的顺序，从 0 开始
          text: String(count)
        });
      }
    }
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
    this.bottomView = false;
  },
  mounted() {
    this.setCartBadge(this.totalNum);
  },
  watch: {
    totalNum(newCount) {
      this.setCartBadge(newCount);
    }
  },
  onShow() {
    if (this.isFromSettleSuccess) {
      common_vendor.index.removeTabBarBadge({
        index: 2
      });
    }
    this.changeIsFromSettleSuccess(false);
  },
  onLoad() {
    this.$api.user.login().then((res) => {
      console.log(res);
    });
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _component_bottom = common_vendor.resolveComponent("bottom");
  (_easycom_uni_search_bar2 + _easycom_uni_swiper_dot2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_icons2 + _easycom_uni_col2 + _easycom_uni_row2 + _component_bottom)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_swiper_dot + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_icons + _easycom_uni_col + _easycom_uni_row)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      model: $data.searchInfo,
      cancelButton: "none",
      placeholder: "请输入查找商品名称",
      focus: false
    }),
    b: $data.boxColor,
    c: common_vendor.o((...args) => $options.searchFocus && $options.searchFocus(...args)),
    d: common_vendor.f($data.info, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    e: common_vendor.o((...args) => $options.swiperChange && $options.swiperChange(...args)),
    f: common_vendor.p({
      info: $data.info,
      current: $data.current,
      mode: "round"
    }),
    g: common_vendor.f($data.navList, (item, index, i0) => {
      return {
        a: item.imageSrc,
        b: common_vendor.t(item.text),
        c: index,
        d: "1cf27b2a-3-" + i0 + ",1cf27b2a-2",
        e: common_vendor.p({
          index
        })
      };
    }),
    h: common_vendor.o($options.change),
    i: common_vendor.p({
      column: 4,
      highlight: true,
      showBorder: false
    }),
    j: common_vendor.p({
      type: "fire-filled",
      size: "30",
      color: "#ff557f"
    }),
    k: common_vendor.f(_ctx.goods, (item, index, i0) => {
      return {
        a: item.imageSrc,
        b: common_vendor.o(($event) => $options.gotoGoodDetail(item.id), index),
        c: "1cf27b2a-6-" + i0 + "," + ("1cf27b2a-5-" + i0),
        d: common_vendor.t(item.text),
        e: common_vendor.t(item.remaining),
        f: common_vendor.t(item.price),
        g: common_vendor.o(($event) => $options.gotoGoodDetail(item.id), index),
        h: "1cf27b2a-7-" + i0 + "," + ("1cf27b2a-5-" + i0),
        i: common_vendor.o(($event) => $options.addOrMinus(false, index), index),
        j: "1cf27b2a-9-" + i0 + "," + ("1cf27b2a-8-" + i0),
        k: common_vendor.t(_ctx.mapGoodNum[item.id] ? _ctx.mapGoodNum[item.id].num : 0),
        l: common_vendor.o(($event) => $options.addOrMinus(true, index), index),
        m: "1cf27b2a-10-" + i0 + "," + ("1cf27b2a-8-" + i0),
        n: "1cf27b2a-8-" + i0 + "," + ("1cf27b2a-5-" + i0),
        o: "1cf27b2a-5-" + i0,
        p: index
      };
    }),
    l: common_vendor.p({
      span: 12
    }),
    m: common_vendor.p({
      span: 8
    }),
    n: common_vendor.p({
      type: "minus",
      color: "#ffaa00"
    }),
    o: common_vendor.p({
      type: "plus",
      color: "#ffaa00"
    }),
    p: common_vendor.p({
      span: 4
    }),
    q: $data.bottomView == true
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
