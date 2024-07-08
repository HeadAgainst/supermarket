"use strict";
const common_vendor = require("../common/vendor.js");
const store_user = require("./user.js");
const store = common_vendor.createStore({
  modules: {
    m_user: store_user.moduleUser
  },
  state: {
    //存放状态
    "token": "",
    "username": "foo",
    isFromSettleSuccess: false,
    collectionBag: [{
      imageSrc: "../../static/goodsImage/pingguo.jpg",
      text: "苹果",
      remaining: "10",
      price: 10,
      id: "1",
      size: "斤",
      brand: "花果山",
      serve: "快速配货",
      category: "水果蔬菜"
    }],
    "cart": [{
      id: "1",
      num: 1,
      price: 10,
      imageSrc: "../../static/goodsImage/pingguo.jpg",
      state: false,
      text: "苹果"
    }],
    mapGoodNum: {
      "1": {
        num: 1
      }
    },
    sortCurrent: 0,
    goods: [
      {
        imageSrc: "../../static/goodsImage/pingguo.jpg",
        text: "苹果",
        remaining: "10",
        price: 10,
        id: "1",
        size: "斤",
        brand: "花果山",
        serve: "快速配货",
        category: "水果蔬菜"
      },
      {
        imageSrc: "../../static/goodsImage/chengzi.jpg",
        text: "橙子",
        remaining: "100",
        price: 20,
        id: "2",
        size: "斤",
        brand: "花果山",
        serve: "快速配货",
        category: "水果蔬菜"
      },
      {
        imageSrc: "../../static/goodsImage/xiangjiao.jpg",
        text: "香蕉",
        remaining: "100",
        price: 20,
        id: "3",
        size: "斤",
        brand: "花果山",
        serve: "快速配货",
        category: "水果蔬菜"
      },
      {
        imageSrc: "../../static/goodsImage/mianbao.jpg",
        text: "面包",
        remaining: "20",
        price: 10,
        id: "4",
        size: "斤",
        brand: "花果山",
        serve: "快速配货",
        category: "休闲零食"
      }
    ]
  },
  mutations: {
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
          state: false,
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
    }
  },
  getters: {
    totalPrice(state) {
      let total = 0;
      for (let i = 0; i < state.cart.length; i++) {
        total += state.cart[i].num * state.cart[i].price;
      }
      return total;
    },
    totalNum(state) {
      if (state.cart.length == 0) {
        return 0;
      }
      return state.cart.length;
    }
  },
  actions: {}
});
exports.store = store;
