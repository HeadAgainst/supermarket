<template>
	<view id="cart">
		<view class="address">
			<button size="mini" type="primary">收获地址</button>
		</view>
		<view class="address-border">
			<image src="/static/cart_border@2x.png" class="address-border"></image>
		</view>
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<uni-swipe-action>
			<view class="">
				<template v-for="(item, index) in cart" :key="index">
					<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(index)">
						<view class="good">
							<view class="left-good">
								<radio color="#C00000" :checked="item.state" @click="radioClickHandler(index)"></radio>
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
					</uni-swipe-action-item>
				</template>
			</view>
		</uni-swipe-action>
		<view class="empty-cart" v-if="totalNum == 0">
			<image src="/static/cart_empty@2x.png" class="empty-img"></image>
			<text>空空如也</text>
		</view>
		<view class="my-settle-container">
			<label class="radio" @click="changeAllState">
				<radio color="#c00000" :checked="selectAll" /><text>全选</text>
			</label>
			<view class="amount-box">
				合计: <text class="amount">￥{{totalPrice}}元</text>
			</view>
			<view class="btn-settle" @click="settlement">
				结算
			</view>
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
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				selectAll: false,
				value: 1,
			}
		},
		computed: {
			...mapState(['cart']),
			...mapGetters(['totalPrice', 'totalNum'])
		},
		methods: {
			...mapMutations(['changeCartState', 'deleteOneGood', 'addOneGood']),
			swipeItemClickHandler(index) {
				this.deleteOneGood(index);
				if(this.totalNum == 0){
					uni.removeTabBarBadge({
						index:2
					})
				}
			},
			radioClickHandler(index) {
				this.changeCartState({
					index,
					key: 'state',
					value: !this.cart[index].state
				});
			},
			numberChangeHandler(e, index) {
				this.addOneGood({
					id: this.cart[index].id,
					num: 1,
					price: this.cart[index].price,
					imageSrc:this.cart[index].imageSrc,
					text:this.cart[index].text
				})
			},
			changeAllState() {
				this.selectAll = !this.selectAll;
				for(let i = 0; i < this.cart.length; i++){
					this.changeCartState({
						index:i,
						key:"state",
						value:this.selectAll
					})
				}
			},
			settlement() {
				if(this.cart.length == 0){
					uni.showToast({
						title:"购物车为空哦~",
						icon:"error"
					})
				}else{
					uni.navigateTo({
						url:"/pages/cart/settle"
					})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	#cart {
		.address {
			height: 90px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
		}

		.address-border {
			width: 100%;
			height: 5px;
		}

		.cart-title {
			padding-top: 20upx;
			height: 40px;
			display: flex;
			align-items: center;
			padding-left: 5px;
			border-bottom: 1px solid #efefef;

			.cart-title-text {
				font-size: 14px;
				margin-left: 10px;
			}
		}

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

		.my-settle-container {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 70upx;
			// 将背景色从 cyan 改为 white
			background-color: white;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 5px;
			font-size: 14px;

			.amount-box {}

			.btn-settle {
				height: 70upx;
				min-width: 100px;
				background-color: #c00000;
				color: white;
				line-height: 70upx;
				text-align: center;
				padding: 0 10px;
				font-size: 30upx;
			}
		}
		.empty-cart {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 150px;
		
			.empty-img {
				width: 90px;
				height: 90px;
			}
		}
	}
</style>