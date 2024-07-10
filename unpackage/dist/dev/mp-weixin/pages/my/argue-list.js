"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      user_id: "1",
      reviews: []
    };
  },
  created() {
    this.loadReviews();
  },
  methods: {
    async loadReviews() {
      const user_id = this.user_id;
      try {
        const response = await this.$api.user.getOrders(user_id);
        console.log("API response:", response);
        const orders = response.data || response;
        if (Array.isArray(orders)) {
          const submittedOrders = orders.filter((order) => order.status === "已提交");
          const reviewPromises = submittedOrders.map(async (order) => {
            if (order.review_id) {
              const imgResponse = await this.$api.user.getReviewimgURl(order.review_id);
              if (imgResponse && Array.isArray(imgResponse.data.img_urls) && imgResponse.data.img_urls.length > 0) {
                const imgCode = imgResponse.data.img_urls[0].url;
                order.src = `http://hdu.frei.fun/reviews_img/${order.review_id}/${imgCode}` || "";
              } else {
                order.src = "";
              }
            } else {
              order.src = "";
            }
            return order;
          });
          const reviews = await Promise.all(reviewPromises);
          this.reviews = reviews;
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    },
    navigateToDetail(review) {
      console.log("review", this.review);
      common_vendor.index.navigateTo({
        url: `/pages/my/my-argue?order_id=${encodeURIComponent(review.order_id)}&comment=${encodeURIComponent(review.comment)}&src=${encodeURIComponent(review.src)}&review_id=${encodeURIComponent(review.review_id)}`,
        events: {
          acceptreview(data) {
            review.comment = data.review;
            review.src = data.src;
          }
        },
        fail(err) {
          console.error("Navigation failed:", err);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.reviews, (review, index, i0) => {
      return {
        a: review.src,
        b: common_vendor.t(review.order_id),
        c: common_vendor.t(review.review_date),
        d: common_vendor.t(review.comment),
        e: index,
        f: common_vendor.o(($event) => $options.navigateToDetail(review), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/argue-list.vue"]]);
wx.createPage(MiniProgramPage);
