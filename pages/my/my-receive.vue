<template>
  <view class="container">
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
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
        { name: '', phone: '', detail: '', address_id: '' }
      ],
      selectedIndex: null,
      errorMessage: '',
      showErrorMessage: false // 新增字段 showErrorMessage
    }
  },
  methods: {
    fetchAddresses() {
      this.$api.user.getSpecialAddress('1').then(res => {
        // 假设 res.data 是一个包含地址数据的数组
        if (res.data && Array.isArray(res.data)) {
          this.addresses = res.data.map(item => {
            let detail = item.address_line1;
            if (item.address_line2) {
              detail += ' ' + item.address_line2;
            }
            return {
              name: item.name,
              phone: item.phone,
              detail: detail,
              address_id: item.address_id,
            };
          });
        }
      }).catch(error => {
        console.error('Error fetching addresses:', error);
        this.errorMessage = '无法获取地址数据';
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 2000);
      });
    },
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
            const address_id = self.addresses[index].address_id;
            self.$api.user.delete(address_id).then(() => {
              // 成功后从数组中删除并刷新地址列表
              self.addresses.splice(index, 1);
              self.selectedIndex = null;
              setTimeout(() => {
                self.fetchAddresses();
              }, 2000);
            }).catch(error => {
              console.error('Error deleting address:', error);
              uni.showToast({
                title: '此地址在用',
                icon: 'error'
              });
            });
            self.$set(self.addresses, data.index, data.address);
          }
        }
      });
      this.selectedIndex = null;
    },
    deleteAddress(index) {
		
      const address_id = this.addresses[index].address_id;
	  console.log(address_id);
      this.$api.user.delete(address_id).then(() => {
        // 成功后刷新地址列表
		this.addresses.splice(index, 1);
		this.selectedIndex = null;
		setTimeout(() => {
		      this.fetchAddresses();
		    }, 2000);
      }).catch(error => {
        console.error('Error deleting address:', error);
        uni.showToast({
          title: '此地址在用',
          icon: 'error'
        });
      });
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
      this.addresses.push({ name: '', phone: '', detail: '', address_id: '' });
      this.selectedIndex = this.addresses.length - 1;
    }
  },
  created() {
    this.fetchAddresses(); // 在组件创建时获取地址列表
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
.error-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.label {
  width: 50px;
  font-weight: bold;
}
.action-button {
  width: 10px;
  height: 10px;
  background-color: #ff0000;
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
