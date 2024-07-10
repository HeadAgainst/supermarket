<template>
	<view id="settle">
		<view class="address" @click="getLocation">
			<uni-row>
				<uni-col :span="2">
					<image src="../../static/didian.png" mode="" class="recipient-pos"></image>
				</uni-col>
				<uni-col :span="20">
					<view class="recipient-info">
						<view class="address-name">
							{{addressInfo.detail}}
						</view>
						<view class="user">
							{{addressInfo.name}} {{addressInfo.phone}}
						</view>
					</view>
				</uni-col>
				<uni-col :span="2">
					<uni-icons type="right"></uni-icons>
				</uni-col>
			</uni-row>
		</view>
		<view class="cart">
			<template v-for="(item, index) in actualCart" :key="index">
				<view class="good">
					<view class="left-good">
						<image :src="item.imageSrc" mode="" class="goods-pic"></image>
					</view>
					<view class="right-good">
						<view class="goods-name">
							{{item.text}}
						</view>
						<view class="goods-info-box">
							<view class="goods-price">
								￥{{item.price}}
							</view>
							<uni-number-box :min="1" :value="item.num"
								@change="numberChangeHandler($event, index)"></uni-number-box>
						</view>
					</view>
				</view>
			</template>
		</view>
		<view class="confirm-button">
			<uni-row>
				<uni-col :span="12">
					<view class="order-price">
						总金额￥{{totalPrice}}元
					</view>
				</uni-col>
				<uni-col :span="12">
					<button @click="submit">提交订单</button>
				</uni-col>
			</uni-row>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				customButtonGroup1: [{
					text: '立即购买',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}],
				options: [{
					icon: 'chat',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				addressInfo: {
					name: "",
					phone: "",
					detail: "",
					address_id:""
				},
			}
		},
		computed: {
			...mapGetters(['totalPrice']),
			...mapState(['cart']),
			actualCart(){
				let newCart = this.cart.filter(item => item.state == true);
				return newCart;
			}
		},
		methods: {
			...mapMutations(['changeCartState', 'emptyCart']),
			getLocation() {
				wx.chooseAddress({
					success: (res) => {
						this.addressInfo.name = res.userName;
						this.addressInfo.phone = res.telNumber;
						this.addressInfo.detail = res.provinceName + res.cityName + res.countyName + res.detailInfo
					}
				})
			},
			numberChangeHandler(e, index) {
				this.changeCartState({
					index,
					key: 'num',
					value: e
				})
			},
			submit() {
				if(this.addressInfo == ""){
					uni.showToast({
						title:"请选择地址",
						icon:"error"
					})
				}else{
					uni.redirectTo({
						url: "/pages/cart/SetttleSuccess"
					})
					const submitCart = [];
					console.log(this.cart);
					for(let i = 0; i < this.cart.length; i++){
						submitCart.push({
							product_id:this.cart[i].id,
							quantity:this.cart[i].num
						});
					}
					const submitBody = {
						user_id:"1",
						address_id:this.addressInfo.address_id,
						total:this.totalPrice,
						items:submitCart
					};
					console.log(submitCart);
					this.$api.order.submitOrder(submitBody)
					.then(res=>{
						if(res.statusCode == 200){
							uni.showToast({
								title:"支付成功"
							})
						}
					});
					this.emptyCart();
				}
				
			}
		},
		onLoad(){
			this.$api.order.getAdress()
			.then(res=>{
				this.addressInfo.name = res.data[0].name;
				this.addressInfo.phone = res.data[0].phone;
				this.addressInfo.detail = res.data[0].address_line1+" "+res.data[0].address_line2;
				this.addressInfo.address_id = res.data[0].address_id
			})
		},
	}
</script>

<style lang="scss" scoped>
	#settle {
		.address {
			height: 90px;
			line-height: 90px;
			background-color: #fff;
			padding-left: 20upx;

			.recipient-pos {
				height: 40upx;
				width: 40upx;
			}

			.recipient-info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding-top: 40upx;

				.address-name {
					height: 50upx;
					line-height: 50upx;
					font-size: 30upx;
					font-weight: bold;
				}

				.user {
					height: 50upx;
					line-height: 50upx;
					color: #8b8b8b;
					font-size: 25upx;
				}
			}
		}

		.cart {
			.good {
				width: 750rpx;
				box-sizing: border-box;
				display: flex;
				padding: 10px 5px;
				border-bottom: 1px solid #f0f0f0;
				background-color: #fff;

				.left-good {
					margin-right: 5px;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.goods-pic {
						width: 100px;
						height: 100px;
						display: block;
					}
				}

				.right-good {
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-between;

					.goods-name {
						font-size: 16px;
						margin-top: 10upx;
					}

					.goods-info-box {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 22upx;

						.goods-price {
							color: #c00000;
							font-size: 16px
						}
					}
				}
			}
		}
	}

	.confirm-button {
		position: fixed;
		width: 100%;
		bottom: 10upx;
		background-color: #fff;
		line-height: 74upx;

		button {
			color: #fff;
			background-color: #c00000;
			height: 74upx;
			line-height: 74upx;
			margin: 0 10upx;
			border-radius: 35upx;
		}

		.order-price {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>