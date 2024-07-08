<template>
  <view class="container">
    <view v-for="(address, index) in addresses" :key="index" class="address-box">
      <view class="address-line">
        <text class="label">姓名：</text>
        <text>{{ address.name }}</text>
      </view>
      <view class="address-line">
        <text class="label">电话：</text>
        <text>{{ address.phone }}</text>
      </view>
      <view class="address-line">
        <text class="label">地址：</text>
        <text>{{ address.detail }}</text>
      </view>
      <button class="action-button" @click="showOptions(index)"></button>
    </view>

    <view v-if="selectedIndex !== null" class="options">
      <button @click="editAddress(selectedIndex)">编辑</button>
      <button @click="deleteAddress(selectedIndex)">删除</button>
      <button @click="copyAddress(selectedIndex)">复制</button>
      <button @click="cancelOptions">取消</button>
    </view>
    <button class="add-button" @click="addAddress">+</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      addresses: [
        { name: '张三', phone: '1234567890', detail: '地址1' },
        { name: '李四', phone: '0987654321', detail: '地址2' }
      ],
      selectedIndex: null
    }
  },
  methods: {
    showOptions(index) {
      this.selectedIndex = index;
    },
     editAddress(index) {
          const address = this.addresses[index];
          const self = this;
          uni.navigateTo({
            url: `/pages/my/receive-list?index=${index}&name=${encodeURIComponent(address.name)}&phone=${encodeURIComponent(address.phone)}&detail=${encodeURIComponent(address.detail)}`,
            events: {
              updateAddress(data) {
                self.$set(self.addresses, data.index, data.address);
              }
            }
          });
          this.selectedIndex = null;
        },
    deleteAddress(index) {
      this.addresses.splice(index, 1);
      this.selectedIndex = null;
    },
    copyAddress(index) {
      const address = this.addresses[index];
      const text = `姓名: ${address.name}, 电话: ${address.phone}, 地址: ${address.detail}`;
      uni.setClipboardData({
        data: text,
        success() {
          uni.showToast({
            title: '已复制到剪切板',
            icon: 'success'
          });
        }
      });
      this.selectedIndex = null;
    },
    cancelOptions() {
      this.selectedIndex = null;
    },
    addAddress() {
      this.addresses.push({ name: '', phone: '', detail: '' });
      this.selectedIndex = this.addresses.length - 1;
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}
.address-box {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
.address-line {
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}
.label {
  width: 50px;
  font-weight: bold;
}
.action-button {
  width: 10px;
  height:10px;
  background-color:#ff0000;
  margin-top: 1px;
}
.options {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  display: block;
  border-radius: 10px;
  justify-content: space-around;
  border-top: 1px solid #fff;
  padding: 10px 0;
}
.add-button {
  width: 20%;
  padding: 2px;
  text-align: center;
  font-size: 25px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>
