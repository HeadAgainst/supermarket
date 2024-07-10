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
      comments: [{
        photo: ""
      }]
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
      common_vendor.index.setStorageSync("commentData", {
        order_id: this.order_id,
        comment: this.comment,
        review_id: this.review_id
      });
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
      this.comments = [{
        photo: ""
      }];
    }
  },
  methods: {
    navigateToCamera(comment) {
      common_vendor.index.navigateTo({
        url: "/pages/my/my-camera",
        events: {
          acceptCamera: (data) => {
            comment.photo = data.src;
            console.log("Photo taken, path:", comment.photo);
            setTimeout(() => {
            }, 1e3);
          }
        }
      });
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
          for (let comment of this.comments) {
            if (comment.photo) {
              console.log("comment.photo", comment.photo);
              await this.convertToBase64AndSubmit(comment.photo, this.review_id);
            }
          }
          common_vendor.index.navigateBack({
            delta: 1,
            success: () => {
              const eventChannel = this.getOpenerEventChannel();
              eventChannel.emit("acceptreview", {
                review: this.newComment,
                src: this.comments.length > 0 ? this.comments[this.comments.length - 1].photo : "",
                review_id: this.review_id
              });
            }
          });
        } catch (error) {
          console.error("Error submitting comment:", error);
        }
      }
    },
    async convertToBase64AndSubmit(filePath, reviewid) {
      common_vendor.wx$1.downloadFile({
        url: filePath,
        success: (res) => {
          if (res.statusCode === 200) {
            res.tempFilePath;
            common_vendor.wx$1.chooseMedia({
              count: 9,
              mediaType: ["image", "video"],
              sourceType: ["album", "camera"],
              maxDuration: 30,
              camera: "back",
              success(res2) {
                const tempFilePath = res2.tempFiles[0].tempFilePath;
                console.log(res2.tempFiles[0].tempFilePath);
                console.log(res2.tempFiles[0].size);
                common_vendor.index.uploadFile({
                  url: "https://hdu.frei.fun/reviews_img/28",
                  // 替换为你的服务器 URL
                  filePath: tempFilePath,
                  name: "file",
                  // 与服务器端接收的字段名一致
                  header: {
                    "Content-Type": "multipart/form-data"
                  },
                  success: (res3) => {
                    console.log("上传成功:", res3);
                    common_vendor.index.hideLoading();
                  },
                  fail: (err) => {
                    console.error("上传失败:", err);
                    common_vendor.index.hideLoading();
                  }
                });
              }
            });
          }
        },
        fail: (err) => {
          console.error("下载失败:", err);
        }
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.order_id),
    b: common_vendor.f(_ctx.comments, (comment, index, i0) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => _ctx.navigateToCamera(comment), index),
        b: comment.photo
      }, comment.photo ? {
        c: comment.photo
      } : {}, {
        d: index
      });
    }),
    c: _ctx.newComment,
    d: common_vendor.o(($event) => _ctx.newComment = $event.detail.value),
    e: common_vendor.o((...args) => _ctx.submitComment && _ctx.submitComment(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/my-argue.vue"]]);
wx.createPage(MiniProgramPage);
