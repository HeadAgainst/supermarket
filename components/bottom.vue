<template>
	<view class="cart-status">
		<uni-row>
			<uni-col :span="4">
				<view class="" @click="gotoCart">
					<view class="cart-icon" @click="gotoCart">
						<uni-icons type="cart-filled" color="#fff" size="30"></uni-icons>
					</view>
					<view class="corner-mark" style="width: 30upx;" @click="gotoCart">
						{{totalNum}}
					</view>
				</view>
			</uni-col>
			<uni-col :span="12">
				<view style="text-align: right;">
					<text style="font-size: 25upx;">总计{{totalPrice}}元,{{totalNum}}件</text>
				</view>
			</uni-col>
			<uni-col :span="8">
				<view class="select-button" @click="gotoCart">
					选好了
				</view>
			</uni-col>
		</uni-row>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			...mapMutations(['addOneGood']),
			gotoCart(){
				uni.switchTab({
					url:"/pages/cart/cart",
				})
			},
		},
		computed:{
			...mapState(['cart']),
			totalNum(){
				return this.cart.length;
			},
			totalPrice(){
				let total = 0;
				for(let i = 0; i < this.cart.length; i++){
					total += this.cart[i].num*this.cart[i].price;
				}
				return total;
			},
			dynamicWidth(){
				let i = 30+(String(this.totalNum).length-1)*15;
				console.log(i+"upx");
				return i+'upx';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart-status{
		position: fixed;
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		background-color: #fff;
		clear: both;
		position: fixed;
		bottom: 0upx;
		font-size: 28upx;
		.cart-icon{
			z-index: 1;
			display: flex;
			align-items: center;
			position: relative;
			bottom: 50upx;
			left: 50upx;
			height: 100upx;
			width: 100upx;
			background-color: #c00000;
			border-radius: 50upx;
			justify-content: center;
		}
		.corner-mark{
			position: fixed;
			z-index: 1;
			left: 130upx;
			bottom: 80upx;
			height: 30upx;
			width: 30upx;
			text-align: center;
			line-height: 30upx;
			border-radius: 20upx;
			color: #fff;
			background-color: #ff0000;
		}
		.select-button{
			height: 100%;
			width: 100%;
			background-color: #c00000;
			color: #fff;
			text-align: center;
			margin-left: 20upx;
			font-size: 30upx;
		}
	}
</style>