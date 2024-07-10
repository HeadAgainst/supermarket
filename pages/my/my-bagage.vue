<template>
  <view class="container">
    <!-- 顶部导航选项 -->
    <view class="tab-bar">
      <text :class="{ active: activeTab === 'pending' }" @click="switchTab('pending')">待收货</text>
      <text :class="{ active: activeTab === 'completed' }" @click="switchTab('completed')">已提交</text>
    </view>

    <!-- 待收货页面 -->
    <view v-if="activeTab === 'pending'" class="orders">
      <view v-for="(order, index) in pendingOrders" :key="index" class="order-box">
        <view>订单编号: {{ order.order_id }}</view>
        <view>商品名称: {{ getItemsDescription(order.items) }}</view>
        <view>总价: {{ order.total }}</view>
        <view>收货地址: {{ order.address }}</view>
        <view>下单时间: {{ order.order_date }}</view>
        <button @click="confirmReceipt(index, order.order_id)">确认收货</button>
      </view>
    </view>

    <!-- 已提交页面 -->
    <view v-if="activeTab === 'completed'" class="orders">
      <view v-for="(order, index) in completedOrders" :key="index" class="order-box">
        <view>订单编号: {{ order.order_id }}</view>
        <view>商品名称: {{ getItemsDescription(order.items) }}</view>
        <view>总价: {{ order.total }}</view>
        <view>收货地址: {{ order.address }}</view>
        <view>签收时间: {{ order.order_date }}</view>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  data() {
    return {
      activeTab: 'pending',
      pendingOrders: [],
      completedOrders: []
    }
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
    },
    async confirmReceipt(index, orderId) {
      try {
        await this.$api.user.updateOrders(orderId,'已提交');
        const order = this.pendingOrders.splice(index, 1)[0];
        order.receiptTime = this.getCurrentTime();
        this.completedOrders.push(order);
      } catch (error) {
        console.error('Error confirming receipt:', error);
        uni.showToast({
          title: '确认收货失败',
          icon: 'error'
        });
      }
    },
    getCurrentTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    async fetchOrders() {
      try {
        const res = await this.$api.user.getOrders('1');
        const orders = res.data;
        this.pendingOrders = await Promise.all(orders.filter(order => order.status !== '已提交').map(this.processOrder));
        this.completedOrders = await Promise.all(orders.filter(order => order.status === '已提交').map(this.processOrder));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    async processOrder(order) {
      try {
        const orderDetails = await this.$api.user.getSpecialOreder(order.order_id);
        const items = await Promise.all(orderDetails.data.items.map(async item => {
          const productDetails = await this.$api.user.getProductdetail(item.product_id);
          console.log('Product details:', productDetails);
    
          // 访问产品详细信息中的 `product` 属性
          const productInfo = productDetails.data.product;
    
          console.log('Product name:', productInfo.name);
          return {
            ...item,
            ...productInfo,
            description: `${productInfo.name} x ${item.quantity}`
          };
        }));
    
        console.log('Order address_id:', order.address_id);
        const address = await this.fetchAddress(order.address_id);
        console.log('Fetched address:', address);
    
        return {
          ...order,
          items,
          address
        };
      } catch (error) {
        console.error('Error processing order:', error);
        return order;
      }
    }

,
    async fetchAddress(address_id) {
      try {
        const res = await this.$api.user.getAddress(address_id);
        console.log('Fetched address response:', res);
    
        // 确认res.data是否为数组并且长度大于0
        if (Array.isArray(res.data) && res.data.length > 0) {
          const addressData = res.data[0];
          console.log('Address data:', addressData);
    
          let detail = addressData.address_line1 || '';
          if (addressData.address_line2) {
            detail += ' ' + addressData.address_line2;
          }
    
          console.log('Formatted address:', detail);
          return detail; // 确保返回地址作为字符串
        } else {
          console.error('Address data is missing or empty in response');
          return '';
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        return '';
      }
    }
,
    getItemsDescription(items) {
      return items.map(item => item.description).join(', ');
    }
  },
  onLoad() {
    this.fetchOrders();
  }
}
</script>


<style>
.container {
  padding: 20px;
}
.tab-bar {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
.tab-bar text {
  padding: 10px;
  cursor: pointer;
}
.tab-bar text.active {
  font-weight: bold;
  border-bottom: 2px solid #000;
}
.orders {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.order-box {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  margin-top: 10px;
  padding: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
