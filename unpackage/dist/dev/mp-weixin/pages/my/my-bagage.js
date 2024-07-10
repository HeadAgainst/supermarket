"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeTab: "pending",
      pendingOrders: [
        {
          id: "001",
          items: "商品A x 2, 商品B x 1",
          total: "￥300",
          address: "地址1",
          orderTime: "2024-07-07 12:00"
        },
        {
          id: "002",
          items: "商品C x 1, 商品D x 3",
          total: "￥450",
          address: "地址2",
          orderTime: "2024-07-06 15:30"
        },
        {
          id: "003",
          items: "商品E x 4",
          total: "￥200",
          address: "地址3",
          orderTime: "2024-07-05 09:20"
        },
        {
          id: "004",
          items: "商品F x 1, 商品G x 2",
          total: "￥500",
          address: "地址4",
          orderTime: "2024-07-04 18:45"
        },
        {
          id: "005",
          items: "商品H x 2",
          total: "￥250",
          address: "地址5",
          orderTime: "2024-07-03 14:10"
        }
      ],
      completedOrders: []
    };
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
    },
    confirmReceipt(index) {
      const order = this.pendingOrders.splice(index, 1)[0];
      order.receiptTime = this.getCurrentTime();
      this.completedOrders.push(order);
    },
    getCurrentTime() {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  },
  onLoad() {
    this.$api.user.getOrders("1").then((res) => {
      console.log("Response received", res);
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.activeTab === "pending" ? 1 : "",
    b: common_vendor.o(($event) => $options.switchTab("pending")),
    c: $data.activeTab === "completed" ? 1 : "",
    d: common_vendor.o(($event) => $options.switchTab("completed")),
    e: $data.activeTab === "pending"
  }, $data.activeTab === "pending" ? {
    f: common_vendor.f($data.pendingOrders, (order, index, i0) => {
      return {
        a: common_vendor.t(order.id),
        b: common_vendor.t(order.items),
        c: common_vendor.t(order.total),
        d: common_vendor.t(order.address),
        e: common_vendor.t(order.orderTime),
        f: common_vendor.o(($event) => $options.confirmReceipt(index), index),
        g: index
      };
    })
  } : {}, {
    g: $data.activeTab === "completed"
  }, $data.activeTab === "completed" ? {
    h: common_vendor.f($data.completedOrders, (order, index, i0) => {
      return {
        a: common_vendor.t(order.id),
        b: common_vendor.t(order.items),
        c: common_vendor.t(order.total),
        d: common_vendor.t(order.address),
        e: common_vendor.t(order.receiptTime),
        f: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/my-bagage.vue"]]);
wx.createPage(MiniProgramPage);
