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
      isCollect: false,
      currentId: 0,
      good: {
        imageSrc: "../../static/goodsImage/pingguo.jpg",
        // 商品图片列表
        text: "苹果",
        // 商品名称
        remaining: "10",
        // 剩余量
        price: 10,
        // 商品价格
        id: "1",
        // 商品id
        size: "斤",
        // 规格
        brand: "花果山",
        // 品牌
        serve: "快速配货",
        // 服务
        category: "水果蔬菜"
      },
      comments: [{
        userName: "xx",
        // 用户名
        time: "2021年04月1日14时33分",
        // 时间
        review: "很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃",
        // 评论
        image: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        // 头像
      }, {
        userName: "xx",
        // 用户名
        time: "2021年04月1日14时33分",
        // 时间
        review: "很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃",
        // 评论
        image: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        // 头像
      }, {
        userName: "xx",
        // 用户名
        time: "2021年04月1日14时33分",
        // 时间
        review: "很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃",
        // 评论
        image: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        // 头像
      }],
      isExpands: []
    };
  },
  methods: {
    ...common_vendor.mapMutations(["addOneGood", "subtractOneGood", "selectColletion"]),
    swiperChange(e) {
      this.current = e.detail.current;
    },
    addOrMinus(flag) {
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
    },
    toggle(index) {
      if (this.isExpands[index] == 1) {
        this.isExpands[index] = 2;
      } else if (this.isExpands[index] == 2) {
        this.isExpands[index] = 1;
      }
    },
    love() {
      this.isCollect = !this.isCollect;
      this.selectColletion({
        id: this.good.id,
        num: 1,
        price: this.good.price,
        imageSrc: this.good.imageSrc,
        text: this.good.text
      });
    }
  },
  onLoad(options) {
    this.currentId = options.id;
    for (let i = 0; i < this.comments.length; i++) {
      this.isExpands.push(this.comments[i].review.length > 30 ? 1 : 0);
    }
    const good = this.collectionBag.filter((item) => item.id == this.currentId);
    if (good.length == 0) {
      this.isCollect = false;
    } else {
      this.isCollect = true;
    }
  },
  computed: {
    ...common_vendor.mapState(["goods", "collectionBag"])
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
  return common_vendor.e({
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
    d: common_vendor.t($data.good.text),
    e: common_vendor.t($data.good.remaining),
    f: common_vendor.t($data.good.price),
    g: common_vendor.o(($event) => $options.addOrMinus(false)),
    h: common_vendor.p({
      type: "minus",
      color: "#ffaa00"
    }),
    i: common_vendor.o(($event) => $options.addOrMinus(true)),
    j: common_vendor.p({
      type: "plus",
      color: "#ffaa00"
    }),
    k: $data.isCollect == false
  }, $data.isCollect == false ? {
    l: common_vendor.o($options.love),
    m: common_vendor.p({
      type: "star",
      size: "30"
    })
  } : {}, {
    n: $data.isCollect
  }, $data.isCollect ? {
    o: common_vendor.o($options.love),
    p: common_vendor.p({
      type: "star-filled",
      size: "30",
      color: "#ffaa00"
    })
  } : {}, {
    q: common_vendor.t($data.good.size),
    r: common_vendor.t($data.good.brand),
    s: common_vendor.t($data.good.serve),
    t: common_vendor.p({
      ["border-full"]: true
    }),
    v: common_vendor.f($data.comments, (item, index, i0) => {
      return {
        a: common_vendor.t(item.userName),
        b: common_vendor.t(item.time),
        c: common_vendor.t($data.isExpands[index] == 1 ? item.review.slice(0, 30) + "..." : item.review),
        d: common_vendor.t($data.isExpands[index] == 1 ? "展开" : $data.isExpands[index] == 2 ? "折叠" : ""),
        e: common_vendor.o(($event) => $options.toggle(index), index),
        f: "adbe0a1d-10-" + i0 + ",adbe0a1d-9",
        g: common_vendor.p({
          title: "列表左侧带略缩图",
          note: "列表描述信息",
          thumb: item.image,
          ["thumb-size"]: "lg"
        }),
        h: index
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-adbe0a1d"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/goods/detail.vue"]]);
wx.createPage(MiniProgramPage);
