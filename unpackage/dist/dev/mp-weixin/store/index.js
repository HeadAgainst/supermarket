"use strict";
const common_vendor = require("../common/vendor.js");
const store_user = require("./user.js");
const api_index = require("../api/index.js");
const store = common_vendor.createStore({
  modules: {
    m_user: store_user.moduleUser
  },
  state: {
    //存放状态
    "token": "",
    "username": "foo",
    isFromSettleSuccess: false,
    isChangeInDetail: true,
    collectionBag: [{
      // imageSrc: "../../static/goodsImage/pingguo.jpg",
      // text: "苹果",
      // remaining: "10",
      // price: 10,
      // id: "1",
      // size:"斤",
      // brand:"花果山",
      // serve:"快速配货",
      // category:"水果蔬菜"
    }],
    "cart": [
      // 	{
      // 	id:"1",
      // 	num:1,
      // 	price:10,
      // 	imageSrc:"../../static/goodsImage/pingguo.jpg",
      // 	state:true,
      // 	text:"苹果"
      // },
    ],
    mapGoodNum: {
      // "1":{
      // 	num:1
      // }
    },
    sortCurrent: 0,
    goods: [
      // {
      // 	imageSrc: "https://img.alicdn.com/imgextra/i3/6542868447/O1CN01Z4bnYC2CGmWzGaOG3_!!0-saturn_solar.jpg_360x360q90.jpg_.webp",
      // 	text: "苹果",
      // 	remaining: "10",
      // 	price: 10,
      // 	id: "1",
      // 	size:"斤",
      // 	brand:"花果山",
      // 	serve:"快速配货",
      // 	category:"水果蔬菜"
      // },
    ]
  },
  mutations: {
    changeInDetail(state, change) {
      state.isChangeInDetail = change;
    },
    updateGoods(state, payload) {
      state.goods = payload.splice(0, 20);
    },
    selectColletion(state, payload) {
      const { id, num, price, imageSrc, text } = payload;
      let i = 0;
      for (i = 0; i < this.state.collectionBag.length; i++) {
        if (id == this.state.collectionBag[i].id) {
          break;
        }
      }
      if (i < this.state.collectionBag.length) {
        this.state.collectionBag.splice(i, 1);
      } else if (i == this.state.collectionBag.length) {
        this.state.collectionBag.push({
          id,
          num,
          price,
          imageSrc,
          text
        });
      }
    },
    changeIsFromSettleSuccess(state, value) {
      this.state.isFromSettleSuccess = value;
    },
    emptyCart() {
      this.state.cart = [];
      this.state.mapGoodNum = {};
    },
    deleteOneGood(state, index) {
      delete this.state.mapGoodNum[this.state.cart[index].id];
      this.state.cart.splice(index, 1);
    },
    changeCartState(state, payload) {
      const { index, key, value } = payload;
      this.state.cart[index][key] = value;
    },
    addOneGood(state, payload) {
      const { id, num, price, imageSrc, text } = payload;
      let i = 0;
      for (i = 0; i < this.state.cart.length; i++) {
        if (id == this.state.cart[i].id) {
          this.state.cart[i].num += 1;
          this.state.mapGoodNum[id].num += 1;
          break;
        }
      }
      if (i >= this.state.cart.length) {
        this.state.cart.push({
          id,
          num,
          price,
          imageSrc,
          state: true,
          text
        });
        this.state.mapGoodNum[id] = {};
        this.state.mapGoodNum[id].num = 1;
      }
    },
    subtractOneGood(state, payload) {
      const { id, num } = payload;
      let i = 0;
      for (i = 0; i < this.state.cart.length; i++) {
        if (id == this.state.cart[i].id) {
          this.state.cart[i].num -= 1;
          this.state.mapGoodNum[id].num -= 1;
          if (this.state.cart[i].num == 0) {
            this.state.cart.splice(i, 1);
            delete this.state.mapGoodNum[id];
          }
          break;
        }
      }
    },
    changSortCurrent(state, current) {
      this.state.sortCurrent = current;
    },
    updateGoodImage(state, payload) {
      const { id, imageSrc } = payload;
      const good = state.goods.find((g) => g.id == id);
      if (good) {
        good.imageSrc = imageSrc;
      }
    }
  },
  getters: {
    totalPrice(state) {
      let total = 0;
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].state == true) {
          total += state.cart[i].num * state.cart[i].price;
        }
      }
      return total;
    },
    totalNum(state) {
      if (state.cart.length == 0) {
        return 0;
      }
      return state.cart.length;
    },
    getItemNum: (state) => (itemId) => {
      const item = state.cart.find((product) => product.id === itemId);
      if (item) {
        return item.num;
      } else {
        return 0;
      }
    }
  },
  actions: {
    async fetchGoodImage({ commit }, productId) {
      try {
        const response = await api_index.api.goods.getGoodImageLs(productId).then((res) => {
          const code = res.data.img_urls[0].url;
          commit("updateGoodImage", {
            id: productId,
            imageSrc: `https://hdu.frei.fun/products_img/${productId}/${code}`
          });
        });
      } catch (error) {
        console.error("获取商品图片失败", error);
      }
    }
  }
});
exports.store = store;
