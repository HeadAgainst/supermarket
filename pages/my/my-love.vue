<template>
	<view id="love">
		<view v-show="isNoCollectoin">
			<image src="../../static/no-collection.png" mode=""></image>
			<view style="text-align: center;">
				收藏为空~，快去首页看看吧
			</view>
			<navigator url="/pages/index/index" open-type="switchTab">
				<button style="width: 100%; border-radius: 20px; background-color: #c00000;
				 margin-top: 10px; color: #fff;">回到首页</button>
			</navigator>
		</view>
		<view class="goods">
			<template v-for="(item, index) in collectionBag" :key="index">
				<view class="good">
					<uni-row>
						<uni-col :span="12">
							<view @click="gotoGoodDetail(item.id)">
								<image :src="item.imageSrc" mode="aspectFit"></image>
							</view>
						</uni-col>
						<uni-col :span="12">
							<view class="info" @click="gotoGoodDetail(item.id)">
								<view class="g-title">{{item.text}}</view>
								<view class="g-desc">剩余：{{item.remaining}}</view>
								<view class="g-price">￥{{item.price}}</view>
							</view>
						</uni-col>
					</uni-row>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		computed:{
			...mapState(['collectionBag'])
		},
		data(){
			return{
				isNoCollectoin:true
			}
		},
		methods:{
			gotoGoodDetail(goodId) {
				const url = `/pages/goods/detail?id=${goodId}`
				uni.navigateTo({
					url: url,
				})
			},
		},
		onLoad(){
			this.isNoCollectoin = this.collectionBag.length == 0 ? true : false;
		}
	}
</script>

<style scoped lang="scss">
	#love {
		.goods {
			.good {
				margin: 15upx;
				height: 300upx;
				background-color: #fff;
				border-radius: 10upx;
				image {
					height: 250upx;
					width: 250upx;
				}
				.info {
					.g-title {
						margin-top: 20upx;
						font-size: 30upx;
					}
		
					.g-desc {
						margin-top: 10upx;
						color: #8b8b8b;
					}
		
					.g-price {
						margin-top: 10upx;
						font-weight: bold;
						color: #ff5500;
					}
				}
			}
		}
	}
</style>