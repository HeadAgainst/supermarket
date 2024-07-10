"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeTab: "pending",
      pendingOrders: [],
      completedOrders: []
    };
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
    },
    async confirmReceipt(index, orderId) {
      try {
        await this.$api.user.updateOrders(orderId, "已提交");
        const order = this.pendingOrders.splice(index, 1)[0];
        order.receiptTime = this.getCurrentTime();
        this.completedOrders.push(order);
      } catch (error) {
        console.error("Error confirming receipt:", error);
        common_vendor.index.showToast({
          title: "确认收货失败",
          icon: "error"
        });
      }
    },
    getCurrentTime() {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    async fetchOrders() {
      try {
        const res = await this.$api.user.getOrders("1");
        const orders = res.data;
        this.pendingOrders = await Promise.all(orders.filter((order) => order.status !== "已提交").map(this.processOrder));
        this.completedOrders = await Promise.all(orders.filter((order) => order.status === "已提交").map(this.processOrder));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    async processOrder(order) {
      try {
        const orderDetails = await this.$api.user.getSpecialOreder(order.order_id);
        const items = await Promise.all(orderDetails.data.items.map(async (item) => {
          const productDetails = await this.$api.user.getProductdetail(item.product_id);
          console.log("Product details:", productDetails);
          const productInfo = productDetails.data.product;
          console.log("Product name:", productInfo.name);
          return {
            ...item,
            ...productInfo,
            description: `${productInfo.name} x ${item.quantity}`
          };
        }));
        console.log("Order address_id:", order.address_id);
        const address = await this.fetchAddress(order.address_id);
        console.log("Fetched address:", address);
        return {
          ...order,
          items,
          address
        };
      } catch (error) {
        console.error("Error processing order:", error);
        return order;
      }
    },
    async fetchAddress(address_id) {
      try {
        const res = await this.$api.user.getAddress(address_id);
        console.log("Fetched address response:", res);
        if (Array.isArray(res.data) && res.data.length > 0) {
          const addressData = res.data[0];
          console.log("Address data:", addressData);
          let detail = addressData.address_line1 || "";
          if (addressData.address_line2) {
            detail += " " + addressData.address_line2;
          }
          console.log("Formatted address:", detail);
          return detail;
        } else {
          console.error("Address data is missing or empty in response");
          return "";
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        return "";
      }
    },
    getItemsDescription(items) {
      return items.map((item) => item.description).join(", ");
    }
  },
  onLoad() {
    this.fetchOrders();
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
        a: common_vendor.t(order.order_id),
        b: common_vendor.t($options.getItemsDescription(order.items)),
        c: common_vendor.t(order.total),
        d: common_vendor.t(order.address),
        e: common_vendor.t(order.order_date),
        f: common_vendor.o(($event) => $options.confirmReceipt(index, order.order_id), index),
        g: index
      };
    })
  } : {}, {
    g: $data.activeTab === "completed"
  }, $data.activeTab === "completed" ? {
    h: common_vendor.f($data.completedOrders, (order, index, i0) => {
      return {
        a: common_vendor.t(order.order_id),
        b: common_vendor.t($options.getItemsDescription(order.items)),
        c: common_vendor.t(order.total),
        d: common_vendor.t(order.address),
        e: common_vendor.t(order.order_date),
        f: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/my-bagage.vue"]]);
wx.createPage(MiniProgramPage);
