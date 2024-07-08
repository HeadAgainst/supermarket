<template>
	<view class="container">
		<view class="top_box">
			<view class="top_back" :style="{backgroundColor:boxColor}" @click="searchFocus">
				<uni-search-bar :model="searchInfo" cancelButton="none" placeholder="请输入查找商品名称" :focus="false"
					style="background: transparent; position: fixed; top: 20upx; width: 100%; z-index: 4;"> </uni-search-bar>
			</view>
			<view class="banner">
				<uni-swiper-dot class="uni-swiper-dot-box" :info="info" :current="current" mode="round">
					<swiper class="swiper-box" @change="swiperChange">
						<swiper-item v-for="(item, index) in info" :key="index">
							<image :src="item" mode="aspectFit"></image>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<view id="nav">
				<uni-grid :column="4" :highlight="true" @change="change" :showBorder="false">
					<uni-grid-item v-for="(item, index) in navList" :index="index" :key="index">
						<view class="grid-item-box" style="background-color: #fff;">
							<image :src="item.imageSrc" mode=""></image>
							<view>{{item.text}}</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
			<view id="recommend">
				<view class="title">
					<uni-icons type="fire-filled" size="30" color="#ff557f"></uni-icons>
					推荐商品
				</view>
				<view class="goods">
					<template v-for="(item, index) in goods" :key="index">
						<view class="good">
							<uni-row>
								<uni-col :span="12">
									<view @click="gotoGoodDetail(item.id)">
										<image :src="item.imageSrc" mode="aspectFit"></image>
									</view>
								</uni-col>
								<uni-col :span="8">
									<view class="info" @click="gotoGoodDetail(item.id)">
										<view class="g-title">{{item.text}}</view>
										<view class="g-desc">剩余：{{item.remaining}}</view>
										<view class="g-price">￥{{item.price}}</view>
									</view>
								</uni-col>
								<uni-col :span="4">
									<view class="cart">
										<uni-icons type="minus" color="#ffaa00"
											@click="addOrMinus(false, index)"></uni-icons>
										<text space> {{mapGoodNum[item.id] ? mapGoodNum[item.id].num : 0}} </text>
										<uni-icons type="plus" color="#ffaa00"
											@click="addOrMinus(true, index)"></uni-icons>
									</view>
								</uni-col>
							</uni-row>
						</view>
					</template>
				</view>
			</view>
		</view>
		<bottom v-show="bottomView == true"></bottom>
	</view>
</template>

<script>
	import bottom from "../../components/bottom"
	import {
		mapMutations,
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		components: {
			bottom
		},
		data() {
			return {
				bottomView: true,
				boxColor: "#395287",
				boxColorLs: ["#395287", "#99ceee",
					"#fff3ec", "#dcb9b7"
				],
				info: ["../../static/swiperImage/1.png", "../../static/swiperImage/2.png",
					"../../static/swiperImage/3.png", "../../static/swiperImage/4.png"
				],
				current: 0,
				searchInfo: "",
				navList: [{
						"imageSrc": "../../static/navImage/shuiguo.png",
						"text": "水果蔬菜"
					}, {
						"imageSrc": "../../static/navImage/xianrou.png",
						"text": "肉禽蛋品"
					},
					{
						"imageSrc": "../../static/navImage/haixian.png",
						"text": "海鲜水产"
					},
					{
						"imageSrc": "../../static/navImage/yinliao.png",
						"text": "酒水饮料"
					},
					{
						"imageSrc": "../../static/navImage/lingshi.png",
						"text": "休闲零食"
					},
					{
						"imageSrc": "../../static/navImage/miandian.png",
						"text": "烘焙面点"
					},
					{
						"imageSrc": "../../static/navImage/tiaowei.png",
						"text": "粮油调味"
					},
					{
						"imageSrc": "../../static/navImage/shuichan.png",
						"text": "鲜活水产"
					}
				],
			}
		},
		computed: {
			...mapState(['cart', 'mapGoodNum', 'goods', 'isFromSettleSuccess']),
			...mapGetters(['totalNum'])
		},
		methods: {
			...mapMutations(['addOneGood', 'subtractOneGood', 
			'changSortCurrent','changeIsFromSettleSuccess']),
			searchFocus(e) {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			swiperChange(e) {
				this.current = e.detail.current;
				this.boxColor = this.boxColorLs[this.current];
			},
			addOrMinus(add, index) {
				this.bottomView = true;
				if (add == true) {
					this.addOneGood({
						id: this.goods[index].id,
						num: 1,
						price: this.goods[index].price,
						imageSrc: this.goods[index].imageSrc,
						text: this.goods[index].text
					});
				} else {
					this.subtractOneGood({
						id: this.goods[index].id,
						num: 1
					});
				}
			},
			change(e) {
				let {
					index
				} = e.detail
				this.changSortCurrent(index);
				uni.switchTab({
					url: "/pages/cate/cate",

				})
			},
			inputInfo(e) {
				// console.log(e);
			},
			gotoGoodDetail(goodId) {
				const url = `/pages/goods/detail?id=${goodId}`
				uni.navigateTo({
					url: url,
				})
			},
			setCartBadge(count) {
				if (count > 0) {
					uni.setTabBarBadge({
						index: 2, // 购物车 Tab 的索引，按照 pages.json 中的顺序，从 0 开始
						text: String(count)
					});
				}
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			this.bottomView = false;
		},
		mounted() {
			this.setCartBadge(this.totalNum)
		},
		watch: {
			totalNum(newCount) {
				this.setCartBadge(newCount);
			}
		},
		onShow(){
			if(this.isFromSettleSuccess){
				uni.removeTabBarBadge({
					index:2
				})
			}
			this.changeIsFromSettleSuccess(false);	
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		font-size: 14px;
		line-height: 24px;
	}

	.top_box {
		.top_back {
			height: 400upx;
			width: 100%;
			background-color: $uni-primary;
		}

		.banner {
			text-align: center;
			margin-top: -300upx;

			image {
				width: 90%;
				height: 90%;
			}
		}
	}

	#nav {
		margin-top: 30upx;

		.grid-item-box {
			flex: 1;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			text-align: center;
			padding: 20upx 0 0 0;

			image {
				width: 40%;
				height: 40%;
			}
		}
	}

	#recommend {
		.title {
			height: 100upx;
			display: flex;
			align-items: center;

			image {
				height: 40%;
				width: 20%;
			}

			font-size: 30upx;
			font-weight: bold;
			color: #ff557f;
		}

		.goods {
			.good {
				margin: 15upx;
				height: 250upx;
				background-color: #fff;
				border-radius: 10upx;

				image {
					height: 250upx;
					width: 250upx;
				}

				.cart {
					height: 250upx;
					line-height: 250upx;
				}

				.info {
					.g-title {
						margin-top: 20upx;
						font-size: 30upx;
					}

					.g-desc {
						margin-top: 20upx;
						color: #8b8b8b;
					}

					.g-price {
						font-weight: bold;
						color: #ff5500;
					}
				}
			}
		}
	}
</style>