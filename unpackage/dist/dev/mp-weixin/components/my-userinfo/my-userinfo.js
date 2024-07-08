"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      Icon1: {
        color: "#26b3ff",
        size: "22",
        type: "shop-filled"
      },
      Icon2: {
        color: "#383838",
        size: "22",
        type: "location-filled"
      },
      Icon3: {
        color: "#ffec17",
        size: "22",
        type: "star-filled"
      },
      Icon4: {
        color: "#43d9af",
        size: "22",
        type: "phone-filled"
      },
      Icon5: {
        color: "#be0000",
        size: "22",
        type: "person-filled"
      }
    };
  },
  computed: {
    ...common_vendor.mapState(["isAuth", "userInfo"])
  },
  methods: {
    navTo(url) {
      if (this.isAuth) {
        common_vendor.index.navigateTo({ url });
      } else {
        common_vendor.index.navigateTo("/pages/info/login");
      }
    },
    onClick(e) {
      console.log("执行click事件", e.data);
      common_vendor.index.showToast({
        title: "点击成功"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.isAuth
  }, _ctx.isAuth ? {
    b: _ctx.userInfo.image
  } : {
    c: common_vendor.p({
      type: "person-filled",
      size: "50"
    })
  }, {
    d: _ctx.mapState
  }, _ctx.mapState ? common_vendor.e({
    e: _ctx.isAuth
  }, _ctx.isAuth ? {} : {}, {
    f: common_vendor.t(_ctx.userInfo.name)
  }) : {}, {
    g: common_vendor.o($options.onClick),
    h: common_vendor.p({
      ["show-extra-icon"]: true,
      showArrow: true,
      ["extra-icon"]: $data.Icon1,
      title: "我的订单",
      to: "my-bagage"
    }),
    i: common_vendor.o($options.onClick),
    j: common_vendor.p({
      ["show-extra-icon"]: true,
      showArrow: true,
      ["extra-icon"]: $data.Icon2,
      title: "我的地址",
      to: "my-receive"
    }),
    k: common_vendor.o($options.onClick),
    l: common_vendor.p({
      ["show-extra-icon"]: true,
      showArrow: true,
      ["extra-icon"]: $data.Icon3,
      title: "我的收藏",
      to: "my-love"
    }),
    m: common_vendor.o($options.onClick),
    n: common_vendor.p({
      ["show-extra-icon"]: true,
      showArrow: true,
      ["extra-icon"]: $data.Icon4,
      title: "反馈评价",
      to: "argue-list"
    }),
    o: common_vendor.o($options.onClick),
    p: common_vendor.p({
      ["show-extra-icon"]: true,
      showArrow: true,
      ["extra-icon"]: $data.Icon5,
      title: "个人信息",
      to: "my-setting"
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2e566776"], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/components/my-userinfo/my-userinfo.vue"]]);
wx.createComponent(Component);
