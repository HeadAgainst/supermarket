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
      groupId: 0,
      sortageList: ["水果蔬菜", "肉禽蛋品", "海鲜水产", "酒水饮料", "休闲零食", "烘焙面点", "粮油调味", "鲜活水产"],
      goods: [
        {
          imageSrc: "../../static/goodsImage/pingguo.jpg",
          text: "苹果",
          remaining: 10,
          price: 10,
          id: "1",
          sort: "水果蔬菜"
        },
        {
          imageSrc: "../../static/goodsImage/chengzi.jpg",
          text: "橙子",
          remaining: "100",
          price: 20,
          id: "2",
          sort: "肉禽蛋品"
        },
        {
          imageSrc: "../../static/goodsImage/xiangjiao.jpg",
          text: "香蕉",
          remaining: "100",
          price: 20,
          id: "3",
          sort: "水果蔬菜"
        },
        {
          imageSrc: "../../static/goodsImage/mianbao.jpg",
          text: "面包",
          remaining: "20",
          price: 10,
          id: "4",
          sort: "休闲零食"
        }
      ]
    };
  },
  methods: {
    ...common_vendor.mapMutations(["addOneGood", "subtractOneGood", "changSortCurrent"]),
    onClick(e) {
      common_vendor.index.showToast({
        title: `点击${e.content.text}`,
        icon: "none"
      });
    },
    choose(index) {
      this.groupId = index;
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(`#sortName${index}`).boundingClientRect((data) => {
        common_vendor.index.pageScrollTo({
          scrollTop: data.top
        });
      }).exec();
    },
    gotoGoodDetail(goodId) {
      const url = `/pages/goods/detail?id=${goodId}`;
      common_vendor.index.navigateTo({
        url
      });
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
    }
  },
  onLoad(options) {
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
    this.bottomView = false;
  },
  computed: {
    ...common_vendor.mapState(["sortCurrent", "mapGoodNum"])
  },
  onShow() {
    this.groupId = this.sortCurrent;
    this.choose(this.groupId);
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _component_bottom = common_vendor.resolveComponent("bottom");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_col2 + _easycom_uni_icons2 + _easycom_uni_row2 + _component_bottom)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_col + _easycom_uni_icons + _easycom_uni_row)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.sortageList, (item, index, i0) => {
      return common_vendor.e({
        a: $data.groupId != index
      }, $data.groupId != index ? {
        b: common_vendor.t(item)
      } : {
        c: common_vendor.t(item)
      }, {
        d: common_vendor.o(($event) => $options.choose(index), index),
        e: "7db0ce29-3-" + i0 + ",7db0ce29-2",
        f: index
      });
    }),
    b: common_vendor.p({
      clickable: true
    }),
    c: common_vendor.p({
      span: 8
    }),
    d: common_vendor.f($data.sortageList, (sort, i, i0) => {
      return {
        a: common_vendor.t(sort),
        b: "sortName" + i,
        c: common_vendor.f($data.goods, (item, index, i1) => {
          return common_vendor.e({
            a: sort == item.sort
          }, sort == item.sort ? {
            b: item.imageSrc,
            c: common_vendor.o(($event) => $options.gotoGoodDetail(item.id), index),
            d: "7db0ce29-6-" + i0 + "-" + i1 + "," + ("7db0ce29-5-" + i0 + "-" + i1),
            e: common_vendor.p({
              span: 10
            }),
            f: common_vendor.t(item.text),
            g: common_vendor.t(item.remaining),
            h: common_vendor.t(item.price),
            i: common_vendor.o(($event) => $options.gotoGoodDetail(item.id), index),
            j: "7db0ce29-7-" + i0 + "-" + i1 + "," + ("7db0ce29-5-" + i0 + "-" + i1),
            k: common_vendor.p({
              span: 8
            }),
            l: common_vendor.o(($event) => $options.addOrMinus(false, index), index),
            m: "7db0ce29-9-" + i0 + "-" + i1 + "," + ("7db0ce29-8-" + i0 + "-" + i1),
            n: common_vendor.p({
              type: "minus",
              color: "#ffaa00"
            }),
            o: common_vendor.t(_ctx.mapGoodNum[item.id] ? _ctx.mapGoodNum[item.id].num : 0),
            p: common_vendor.o(($event) => $options.addOrMinus(true, index), index),
            q: "7db0ce29-10-" + i0 + "-" + i1 + "," + ("7db0ce29-8-" + i0 + "-" + i1),
            r: common_vendor.p({
              type: "plus",
              color: "#ffaa00"
            }),
            s: "7db0ce29-8-" + i0 + "-" + i1 + "," + ("7db0ce29-5-" + i0 + "-" + i1),
            t: common_vendor.p({
              span: 6
            }),
            v: "7db0ce29-5-" + i0 + "-" + i1 + ",7db0ce29-4"
          } : {}, {
            w: index
          });
        }),
        d: i
      };
    }),
    e: common_vendor.p({
      span: 16
    }),
    f: $data.bottomView == true
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7db0ce29"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/cate/cate.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
