"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      src: ""
    };
  },
  methods: {
    takePhoto(e) {
      const ctx = common_vendor.index.createCameraContext();
      ctx.takePhoto({
        quality: "high",
        success: (res) => {
          this.src = res.tempImagePath;
          console.log("执行click事件", e.data);
          common_vendor.index.showToast({
            title: "拍摄成功"
          });
          setTimeout(() => {
          }, 1e3);
        }
      });
    },
    submitCamera() {
      common_vendor.index.navigateBack({
        delta: 1,
        success: () => {
          const eventChannel = this.getOpenerEventChannel();
          eventChannel.emit("acceptCamera", { src: this.src });
          console.log("Photo taken, path:", this.src);
        }
      });
    },
    error(e) {
      console.log(e.detail);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.error && $options.error(...args)),
    b: common_vendor.o((...args) => $options.takePhoto && $options.takePhoto(...args)),
    c: common_vendor.o((...args) => $options.submitCamera && $options.submitCamera(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/pages/my/my-camera.vue"]]);
wx.createPage(MiniProgramPage);
