<template>
  <view class="container">
    <view class="input-box">
    <uni-list>
      <uni-list-item title="姓名" />
    </uni-list>
      <input v-model="name" placeholder="请输入姓名" />
    </view>
    <view class="input-box">
    <uni-list>
      <uni-list-item title="电话" />
    </uni-list>
      <input v-model="phone" placeholder="请输入电话" />
    </view>
    <view class="input-box">
      <uni-list>
          <uni-list-item showArrow  title="地址" right-text="点击获取地址" :to="'receive-get'"  @click="getAddressList" />
    </uni-list>
      <input v-model="detail" placeholder="请输入地址" />
    </view>
    <button @click="saveAddress">保存</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      index: null,
      name: '',
      phone: '',
      detail: ''
    };
  },
  onLoad(options) {
    if (options.index !== undefined) {
      this.index = parseInt(options.index);
      this.name = decodeURIComponent(options.name);
      this.phone = decodeURIComponent(options.phone);
      this.detail = decodeURIComponent(options.detail);
    }
  },
  methods: {
    saveAddress() {
      const updatedAddress = {
        name: this.name,
        phone: this.phone,
        detail: this.detail
      };
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.emit('updateAddress', { index: this.index, address: updatedAddress });
      uni.navigateBack();
    },
        getAddressList(){
                wx.chooseAddress({
                  success:(res)=> {
                      this.name=res.userName;
                      this.phone=res.telNumber;
                      this.detail=res.provinceName+res.cityName+res.countyName+res.detailInfo
                  }
            })
        }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  background-color: #fff;
}
.input-box {
  margin-bottom: 10px;
}
label {
  font-weight: bold;
}
input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
}
</style>
