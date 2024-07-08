"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      comments: [
        {
          src: "https://example.com/avatar1.jpg",
          nickname: "goods1",
          time: "2024-07-06",
          content: "Great product, highly recommended!"
        }
      ]
    };
  },
  methods: {
    navigateToDetail(comment) {
      common_vendor.index.navigateTo({
        url: `/pages/my/my-argue?nickname=${encodeURIComponent(comment.nickname)}&content=${encodeURIComponent(comment.content)}&src=${encodeURIComponent(comment.src)}`,
        events: {
          acceptComment(data) {
            comment.content = data.comment;
            comment.src = data.src;
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
    a: common_vendor.f($data.comments, (comment, index, i0) => {
      return {
        a: comment.src,
        b: common_vendor.t(comment.nickname),
        c: common_vendor.t(comment.time),
        d: common_vendor.t(comment.content),
        e: index,
        f: common_vendor.o(($event) => $options.navigateToDetail(comment), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/argue-list.vue"]]);
wx.createPage(MiniProgramPage);
