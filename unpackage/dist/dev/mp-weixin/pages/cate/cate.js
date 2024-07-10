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
      goods: [],
      readyGoods: [],
      getReady: [0, 0, 0, 0, 0, 0, 0, 0],
      loading: false,
      // 加载标识符，
      page: 1,
      cancelToken: false
      // 取消异步加载工作
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
    loadMoreGoods() {
      if (this.loading)
        return;
      this.loading = true;
      if (this.page * 10 < this.readyGoods.length) {
        const extraGoods = this.readyGoods.slice(this.page * 10, (this.page + 1) * 10);
        this.goods.push(...extraGoods);
        extraGoods.forEach((good) => {
          this.fetchGoodImage(good.id);
        });
        this.loading = false;
      }
      this.loading = false;
    },
    async fetchGoodImage(productId) {
      try {
        if (this.cancelToken == true) {
          return;
        }
        await this.$api.goods.getGoodImageLs(productId).then((res) => {
          if (res.data.img_urls.length > 0) {
            const code = res.data.img_urls[0].url;
            const goodIndex = this.goods.findIndex((good) => good.id == productId);
            if (goodIndex != -1) {
              this.$set(
                this.goods[goodIndex],
                "imageSrc",
                `https://hdu.frei.fun/products_img/${productId}/${code}`
              );
            }
          }
        });
      } catch (error) {
        console.error("获取商品图片失败", error);
      }
    },
    choose(index) {
      this.cancelToken = true;
      this.groupId = index;
      this.page = 1;
      this.$api.goods.getCategoryGood(this.sortageList[index]).then((res) => {
        this.cancelToken = false;
        this.readyGoods = res;
        this.goods = res.slice((this.page - 1) * 10, 10);
        this.goods.forEach((good) => {
          this.fetchGoodImage(good.id);
        });
      });
    },
    gotoGoodDetail(good) {
      const goodStr = encodeURIComponent(JSON.stringify(good));
      const url = `/pages/goods/detail?good=${goodStr}`;
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
    if (e.scrollTop > this.page * 646) {
      if (this.page * 10 < this.readyGoods.length) {
        this.page += 1;
        this.loadMoreGoods();
      }
    }
    this.bottomView = false;
  },
  computed: {
    ...common_vendor.mapState(["sortCurrent", "mapGoodNum"])
    // computedGoods() {
    // 	return this.goods.map(good => ({
    // 		...good,
    // 		imageSrc: good.imageSrc || ''
    // 	}))
    // }
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
    d: common_vendor.f($data.sortageList, (category, i, i0) => {
      return {
        a: common_vendor.f($data.goods, (item, index, i1) => {
          return common_vendor.e({
            a: category == item.category
          }, category == item.category ? {
            b: item.imageSrc,
            c: common_vendor.o(($event) => $options.gotoGoodDetail(item), index),
            d: "7db0ce29-6-" + i0 + "-" + i1 + "," + ("7db0ce29-5-" + i0 + "-" + i1),
            e: common_vendor.p({
              span: 10
            }),
            f: common_vendor.t(item.text),
            g: common_vendor.t(item.remaining),
            h: common_vendor.t(item.price),
            i: common_vendor.o(($event) => $options.gotoGoodDetail(item), index),
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
        b: i
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
