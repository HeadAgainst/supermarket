"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-login",
  computed: {
    ...common_vendor.mapState("m_user", ["redirectInfo"])
  },
  data() {
    return {};
  },
  methods: {
    ...common_vendor.mapMutations("m_user", ["updateUserInfo", "updateToken", "updateRedirectInfo"]),
    // 用户授权之前，获取用户的基本信息
    getUserInfo(e) {
      common_vendor.index.getUserProfile({
        desc: "登录后可同步数据",
        lang: "zh_CN",
        success: (info) => {
          console.log("getUserProfile", info);
          this.updateUserInfo(info.userInfo);
          this.getToken(info);
        },
        fail: (err) => {
          if (err.errMsg === "getUserProfile:fail auth deny")
            common_vendor.index.$showMsg("您取消了授权！");
        }
      });
    },
    navigateBack() {
      if (this.redirectInfo && this.redirectInfo.openType === "switchTab") {
        common_vendor.index.switchTab({
          // 要导航到的页面地址
          url: this.redirectInfo.from,
          // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
          complete() {
            this.updateRedirectInfo(null);
          }
        });
      }
    },
    getToken(info) {
      common_vendor.index.login({
        provider: "weixin",
        success: (res2) => {
          if (res2 && res2.errMsg === "login:ok") {
            const query = {
              code: res2.code,
              encryptedData: info.encryptedData,
              iv: info.iv,
              rawData: info.rawData,
              signature: info.signature
            };
            console.log("query", query);
            const loginResult = {
              "message": {
                "user_id": 12,
                "user_email_code": null,
                "is_active": null,
                "user_sex": "男",
                "user_qq": "",
                "user_tel": "",
                "user_xueli": "本科",
                "user_hobby": "",
                "user_introduce": null,
                "create_time": 1525402223,
                "update_time": 1525402223,
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
              },
              "meta": {
                "msg": "登录成功",
                "status": 200
              }
            };
            console.log("4", loginResult);
            this.updateToken(loginResult.message.token);
            this.navigateBack();
            common_vendor.index.$showMsg("登录成功！");
          } else {
            common_vendor.index.$showMsg("登录失败！" + res2);
          }
        },
        fail: (err) => {
          common_vendor.index.$showMsg("登录失败！！！" + res);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "contact-filled",
      size: "100",
      color: "#AFAFAF"
    }),
    b: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Downloads/HBuildX/workplace/supermarket/components/my-login/my-login.vue"]]);
wx.createComponent(Component);
