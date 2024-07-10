"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      customButtonGroup1: [{
        text: "立即购买",
        backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
        color: "#fff"
      }],
      options: [{
        icon: "chat",
        text: "客服"
      }, {
        icon: "shop",
        text: "店铺",
        info: 2,
        infoBackgroundColor: "#007aff",
        infoColor: "#f5f5f5"
      }, {
        icon: "cart",
        text: "购物车",
        info: 2
      }],
      addressInfo: {
        name: "",
        phone: "",
        detail: "",
        address_id: ""
      }
    };
  },
  computed: {
    ...common_vendor.mapGetters(["totalPrice"]),
    ...common_vendor.mapState(["cart"]),
    actualCart() {
      let newCart = this.cart.filter((item) => item.state == true);
      return newCart;
    }
  },
  methods: {
    ...common_vendor.mapMutations(["changeCartState", "emptyCart"]),
    getLocation() {
      common_vendor.wx$1.chooseAddress({
        success: (res) => {
          this.addressInfo.name = res.userName;
          this.addressInfo.phone = res.telNumber;
          this.addressInfo.detail = res.provinceName + res.cityName + res.countyName + res.detailInfo;
        }
      });
    },
    numberChangeHandler(e, index) {
      this.changeCartState({
        index,
        key: "num",
        value: e
      });
    },
    submit() {
      if (this.addressInfo == "") {
        common_vendor.index.showToast({
          title: "请选择地址",
          icon: "error"
        });
      } else {
        common_vendor.index.redirectTo({
          url: "/pages/cart/SetttleSuccess"
        });
        const submitCart = [];
        console.log(this.cart);
        for (let i = 0; i < this.cart.length; i++) {
          submitCart.push({
            product_id: this.cart[i].id,
            quantity: this.cart[i].num
          });
        }
        const submitBody = {
          user_id: "1",
          address_id: this.addressInfo.address_id,
          total: this.totalPrice,
          items: submitCart
        };
        console.log(submitCart);
        this.$api.order.submitOrder(submitBody).then((res) => {
          if (res.statusCode == 200) {
            common_vendor.index.showToast({
              title: "支付成功"
            });
          }
        });
        this.emptyCart();
      }
    }
  },
  onLoad() {
    this.$api.order.getAdress().then((res) => {
      this.addressInfo.name = res.data[0].name;
      this.addressInfo.phone = res.data[0].phone;
      this.addressInfo.detail = res.data[0].address_line1 + " " + res.data[0].address_line2;
      this.addressInfo.address_id = res.data[0].address_id;
    });
  }
};
if (!Array) {
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  (_easycom_uni_col2 + _easycom_uni_icons2 + _easycom_uni_row2 + _easycom_uni_number_box2)();
}
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
if (!Math) {
  (_easycom_uni_col + _easycom_uni_icons + _easycom_uni_row + _easycom_uni_number_box)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      span: 2
    }),
    b: common_vendor.t($data.addressInfo.detail),
    c: common_vendor.t($data.addressInfo.name),
    d: common_vendor.t($data.addressInfo.phone),
    e: common_vendor.p({
      span: 20
    }),
    f: common_vendor.p({
      type: "right"
    }),
    g: common_vendor.p({
      span: 2
    }),
    h: common_vendor.o((...args) => $options.getLocation && $options.getLocation(...args)),
    i: common_vendor.f($options.actualCart, (item, index, i0) => {
      return {
        a: item.imageSrc,
        b: common_vendor.t(item.text),
        c: common_vendor.t(item.price),
        d: common_vendor.o(($event) => $options.numberChangeHandler($event, index), index),
        e: "1f893c51-5-" + i0,
        f: common_vendor.p({
          min: 1,
          value: item.num
        }),
        g: index
      };
    }),
    j: common_vendor.t(_ctx.totalPrice),
    k: common_vendor.p({
      span: 12
    }),
    l: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    m: common_vendor.p({
      span: 12
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1f893c51"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/cart/settle.vue"]]);
wx.createPage(MiniProgramPage);
