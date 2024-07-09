<template>
  <view class="container">
    <!-- 顶部导航选项 -->
    <view class="tab-bar">
      <text :class="{ active: activeTab === 'pending' }" @click="switchTab('pending')">待收货</text>
      <text :class="{ active: activeTab === 'completed' }" @click="switchTab('completed')">已完成</text>
    </view>

    <!-- 待收货页面 -->
    <view v-if="activeTab === 'pending'" class="orders">
      <view v-for="(order, index) in pendingOrders" :key="index" class="order-box">
        <view>订单编号: {{ order.id }}</view>
        <view>商品名称: {{ order.items }}</view>
        <view>总价: {{ order.total }}</view>
        <view>收获地址: {{ order.address }}</view>
        <view>下单时间: {{ order.orderTime }}</view>
        <button @click="confirmReceipt(index)">确认收货</button>
      </view>
    </view>

    <!-- 已完成页面 -->
    <view v-if="activeTab === 'completed'" class="orders">
      <view v-for="(order, index) in completedOrders" :key="index" class="order-box">
        <view>订单编号: {{ order.id }}</view>
        <view>商品名称和数量: {{ order.items }}</view>
        <view>总价: {{ order.total }}</view>
        <view>收获地址: {{ order.address }}</view>
        <view>签收时间: {{ order.receiptTime }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'pending',
      pendingOrders: [
        {
          id: '001',
          items: '商品A x 2, 商品B x 1',
          total: '￥300',
          address: '地址1',
          orderTime: '2024-07-07 12:00',
        },
        {
          id: '002',
          items: '商品C x 1, 商品D x 3',
          total: '￥450',
          address: '地址2',
          orderTime: '2024-07-06 15:30',
        },
        {
          id: '003',
          items: '商品E x 4',
          total: '￥200',
          address: '地址3',
          orderTime: '2024-07-05 09:20',
        },
        {
          id: '004',
          items: '商品F x 1, 商品G x 2',
          total: '￥500',
          address: '地址4',
          orderTime: '2024-07-04 18:45',
        },
        {
          id: '005',
          items: '商品H x 2',
          total: '￥250',
          address: '地址5',
          orderTime: '2024-07-03 14:10',
        },
      ],
      completedOrders: []
    }
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
    },
    confirmReceipt(index) {
      const order = this.pendingOrders.splice(index, 1)[0];
      order.receiptTime = this.getCurrentTime();
      this.completedOrders.push(order);
    },
    getCurrentTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  },
  onLoad(){
  	this.$api.user.getOrders('1').then(res=>{
  		console.log('Response received',res);
  	})
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
