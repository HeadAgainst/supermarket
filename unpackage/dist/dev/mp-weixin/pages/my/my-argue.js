"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      order_id: "",
      comment: "",
      src: "",
      newComment: "",
      review_id: "",
      comments: []
      // 确保这里是一个空数组，而不是null
    };
  },
  onLoad(options) {
    if (options.src) {
      this.src = decodeURIComponent(options.src);
    }
    if (options.order_id && options.comment && options.review_id) {
      this.order_id = decodeURIComponent(options.order_id);
      this.comment = decodeURIComponent(options.comment);
      this.review_id = decodeURIComponent(options.review_id);
      console.log("Received order_id:", this.order_id);
      console.log("Received comment:", this.comment);
      console.log("Received review_id:", this.review_id);
      common_vendor.index.setStorageSync("commentData", { order_id: this.order_id, comment: this.comment, review_id: this.review_id });
    } else {
      const commentData = common_vendor.index.getStorageSync("commentData");
      if (commentData) {
        this.order_id = commentData.order_id;
        this.comment = commentData.comment;
        this.review_id = commentData.review_id;
      } else {
        console.log("No order_id or comment parameter received");
      }
    }
    if (!this.comments || this.comments.length === 0) {
      this.comments = [{ photo: "" }];
    }
  },
  methods: {
    navigateToCamera(comment) {
      const self = this;
      common_vendor.index.navigateTo({
        url: "/pages/my/my-camera",
        events: {
          acceptCamera(data) {
            comment.photo = data.src;
            console.log("Photo taken, path:", comment.photo);
            self.convertToBase64AndSubmit(comment.photo);
          }
        },
        fail(err) {
          console.error("Navigation failed:", err);
        }
      });
    },
    async convertToBase64AndSubmit(filePath) {
      const res = await new Promise((resolve, reject) => {
        common_vendor.index.getFileSystemManager().readFile({
          filePath,
          encoding: "base64",
          success: resolve,
          fail: reject
        });
      });
      const base64Data = `data:image/jpeg;base64,${res.data}`;
      try {
        const reviewId = this.review_id;
        const response = await this.$api.user.postReviewimg(reviewId, base64Data);
        console.log("Image submitted successfully:", response);
      } catch (error) {
        console.error("Error submitting image:", error);
      }
    },
    async submitComment() {
      if (this.newComment.trim() !== "") {
        try {
          if (this.review_id) {
            await this.$api.user.deleteReview(this.review_id);
            console.log("Review deleted successfully");
          }
          const response = await this.$api.user.postreview({
            order_id: this.order_id,
            comment: this.newComment
          });
          console.log("Comment submitted successfully:", response);
          this.review_id = response.data.review_id;
          this.navigateToCamera({ photo: "" });
          common_vendor.index.navigateBack({
            delta: 1,
            success: () => {
              const eventChannel = this.getOpenerEventChannel();
              eventChannel.emit("acceptreview", { review: this.newComment, src: this.comments.length > 0 ? this.comments[this.comments.length - 1].photo : "" });
            }
          });
        } catch (error) {
          console.error("Error submitting comment:", error);
        }
      }
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.order_id),
    b: common_vendor.f(_ctx.comments, (comment, index, i0) => {
      return common_vendor.e({
        a: comment.photo
      }, comment.photo ? {
        b: comment.photo
      } : {}, {
        c: index,
        d: common_vendor.o(($event) => _ctx.navigateToCamera(comment), index)
      });
    }),
    c: _ctx.newComment,
    d: common_vendor.o(($event) => _ctx.newComment = $event.detail.value),
    e: common_vendor.o((...args) => _ctx.submitComment && _ctx.submitComment(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/my-argue.vue"]]);
wx.createPage(MiniProgramPage);
