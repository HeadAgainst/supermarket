<template>
	<view id="detail">
		<view class="good-image">
			<uni-swiper-dot class="uni-swiper-dot-box" :info="swiperInfo" :current="current" mode="dot">
				<swiper class="swiper-box" @change="swiperChange">
					<swiper-item v-for="(item, index) in swiperInfo" :key="index">
						<image :src="item" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="good-info">
			<view class="">
				<view class="g-title">
					苹果
				</view>
				<view class="g-desc">
					剩余数量
				</view>
				<view class="g-price">
					单价
				</view>
			</view>
			<view class="select">
				<uni-icons type="minus" color="#ffaa00" @click="addOrMinus(false)"></uni-icons>
				<text space>  1  </text>
				<uni-icons type="plus" color="#ffaa00" @click="addOrMinus(true)"></uni-icons>
			</view>
		</view>
		<view class="">
			<uni-list border-full>
				<uni-list-item>
					<template v-slot:header>
						<text>规格</text>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<text>品牌</text>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<text>服务</text>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="good-review">
			<view class="title">
				用户评价
			</view>
			<uni-list>
				<uni-list-item title="列表左侧带略缩图" note="列表描述信息" thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				 	 thumb-size="lg">
					 <template v-slot:body>
						 <view class="name">
						 	xx
						 </view>
					 	<view class="date">2021年04月1日14时33分</view>
						<view class="review-text">
							很好吃
						</view>
					 </template>
					 </uni-list-item>
			</uni-list>
		</view>
		<bottom v-show="true"></bottom>
	</view>
</template>

<script>
	import {mapMutations, mapState} from 'vuex'
	import bottom from "../../components/bottom"
	export default {
		components: {
			bottom
		},
		data() {
			return {
				current: 0,
				swiperInfo: ["../../static/goodsImage/pingguodetail/pingguo.jpg",
					"../../static/goodsImage/pingguodetail/pingguo2.jpg"
				],
				currentId:0
			}
		},
		methods: {
			...mapMutations(['addOneGood', 'subtractOneGood']),
			swiperChange(e) {
				this.current = e.detail.current;
			},
			addOrMinus(flag){
				// console.log(this.currentId);
				if(flag == true){
					this.addOneGood({
						id:this.currentId,
						num:1,
						price:10,
						imageSrc:"../../static/goodsImage/pingguo.jpg",
						text:"苹果",
						});
				}else{
					this.subtractOneGood({
						id:this.currentId,
						num:1});
				}
			}
		},
		onLoad(options) {
			this.currentId = options.id;
			// console.log(typeof this.currentId);
		},
		computed:{
			...mapState(['goods'])
		}
	}
</script>

<style lang="scss" scoped>
	#detail {
		.good-image {
			.swiper-box {
				height: 400upx;

				image {
					height: 100%;
					width: 100%;
				}
			}
		}

		.good-info {
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			margin-top: 20upx;
			padding: 20upx 20upx 20upx 30upx;
			.g-title {
				margin-top: 20upx;
				font-size: 35upx;
				font-weight: bold;
			}

			.g-desc {
				color: #8b8b8b;
				font-size: 25upx;
				line-height: 50upx;
			}

			.g-price {
				color: #ff5500;
				font-size: 30upx;
				line-height: 60upx;
			}
			.select{
				display: flex;
				align-items: center;
				margin-right: 50upx;
			}
		}
		.good-review{
			.title{
				background-color: #fff;
				margin-top: 20upx;
				font-size: 35upx;
				padding-left: 30upx;
			}
			.name{
				color: #00aaff;
			}
			.date{
				color: #8b8b8b;
				font-size: 20upx;
			}
			.review-text{
				font-size: 25upx;
			}
		}
	}
</style>