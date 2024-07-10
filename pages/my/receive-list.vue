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
        <uni-list-item showArrow title="地址" right-text="点击获取地址" :to="'receive-get'" @click="getAddressList" />
      </uni-list>
      <input v-model="address_line1" placeholder="请输入地址" />
    </view>
    <button @click="saveAddress">保存</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      index: null,
      user_id: '1', // 假设用户ID是1
      name: '',
      phone: '',
      address_line1: '',
      address_line2: '' // 新增字段 address_line2
    };
  },
  onLoad(options) {
    if (options.index !== undefined) {
      this.index = parseInt(options.index);
      this.name = decodeURIComponent(options.name);
      this.phone = decodeURIComponent(options.phone);
      this.address_line1 = decodeURIComponent(options.detail);
    }
  },
  methods: {
    saveAddress() {
      const updatedAddress = {
		name:this.name,
        phone: this.phone,
        detail: this.address_line1
      };
	  const data={
		  name:this.name,
		  user_id:this.user_id,
		  phone:this.phone,
		  address_line1:this.address_line1,
		  address_line2:null
	  }
      this.$api.user.post(data).then(res => {
		console.log(data);
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit('updateAddress', { index: this.index, address: updatedAddress });
		setTimeout(() => {
		      uni.navigateBack();
		    }, 2000);
        
      }).catch(error => {
        console.error('Error saving address:', error);
        // 这里可以添加用户友好的错误提示
      });
    },
    getAddressList() {
      wx.chooseAddress({
        success: (res) => {
          this.name = res.userName;
          this.phone = res.telNumber;
          this.address_line1 = res.provinceName + res.cityName + res.countyName + res.detailInfo;
        }
      });
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
