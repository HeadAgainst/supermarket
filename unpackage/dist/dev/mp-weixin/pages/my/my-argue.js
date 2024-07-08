"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      nickname: "",
      content: "",
      src: "",
      newComment: "",
      comments: [
        {
          photo: ""
        }
      ]
    };
  },
  onLoad(options) {
    if (options.src) {
      this.src = decodeURIComponent(options.src);
    }
    if (options.nickname && options.content) {
      this.nickname = decodeURIComponent(options.nickname);
      this.content = decodeURIComponent(options.content);
      console.log("Received nickname:", this.nickname);
      console.log("Received content:", this.content);
      common_vendor.index.setStorageSync("commentData", { nickname: this.nickname, content: this.content });
    } else {
      const commentData = common_vendor.index.getStorageSync("commentData");
      if (commentData) {
        this.nickname = commentData.nickname;
        this.content = commentData.content;
      } else {
        console.log("No nickname or content parameter received");
      }
    }
  },
  methods: {
    submitComment() {
      if (this.newComment.trim() !== "") {
        const latestPhoto = this.comments.length > 0 ? this.comments[this.comments.length - 1].photo : "";
        common_vendor.index.navigateBack({
          delta: 1,
          success: () => {
            const eventChannel = this.getOpenerEventChannel();
            eventChannel.emit("acceptComment", { comment: this.newComment, src: latestPhoto });
          }
        });
      }
    },
    navigateToCamera(comment) {
      common_vendor.index.navigateTo({
        url: `/pages/my/my-camera`,
        events: {
          acceptCamera(data) {
            comment.photo = data.src;
            console.log("Photo taken, path:", comment.photo);
            setTimeout(() => {
            }, 1e3);
          }
        },
        fail(err) {
          console.error("Navigation failed:", err);
        }
      });
    },
    error(e) {
      console.log(e.detail);
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.nickname),
    b: common_vendor.f(_ctx.comments, (comment, index, i0) => {
      return {
        a: comment.photo,
        b: index,
        c: common_vendor.o(($event) => _ctx.navigateToCamera(comment), index)
      };
    }),
    c: _ctx.newComment,
    d: common_vendor.o(($event) => _ctx.newComment = $event.detail.value),
    e: common_vendor.o((...args) => _ctx.submitComment && _ctx.submitComment(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/my-argue.vue"]]);
wx.createPage(MiniProgramPage);
