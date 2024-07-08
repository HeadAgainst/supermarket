<template>
	<view id="sort">
		<uni-row>
			<uni-col :span="8">
				<view class="nav">
					<scroll-view scroll-y="true">
						<uni-list>
							<template v-for="(item, index) in sortageList" :key="index">
								<uni-list-item :clickable="true" @click="choose(index)">
									<template v-slot:header>
										<view v-if="groupId!=index" class="title">{{item}}</view>
										<view v-else class="title active">{{item}}
										</view>
									</template>
								</uni-list-item>
							</template>
						</uni-list>
					</scroll-view>
				</view>
				<view class="navfalse">

				</view>
			</uni-col>
			<uni-col :span="16">
				<view class="display">
					<view class="goods">
						<template v-for="(sort, i) in sortageList" :key="i">
							<view class="sortName" :id="'sortName'+i">{{sort}}</view>
							<template v-for="(item, index) in goods" :key="index">
								<view class="good" v-if="sort == item.sort">
									<uni-row>
										<uni-col :span="10">
											<view @click="gotoGoodDetail(item.id)" style="line-height: 250upx;">
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
										<uni-col :span="6">
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
						</template>
					</view>
				</view>
			</uni-col>
		</uni-row>
		<bottom v-show="bottomView == true"></bottom>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import bottom from "../../components/bottom"
	export default {
		components:{
			bottom
		},
		data() {
			return {
				bottomView: true,
				groupId: 0,
				sortageList: ["水果蔬菜", "肉禽蛋品", "海鲜水产", "酒水饮料", "休闲零食", "烘焙面点", "粮油调味", "鲜活水产"],
				goods: [{
						imageSrc: "../../static/goodsImage/pingguo.jpg",
						text: "苹果",
						remaining: 10,
						price: 10,
						id: "1",
						sort: "水果蔬菜"
					},
					{
						imageSrc: "../../static/goodsImage/chengzi.jpg",
						text: "橙子",
						remaining: "100",
						price: 20,
						id: "2",
						sort: "肉禽蛋品"
					},
					{
						imageSrc: "../../static/goodsImage/xiangjiao.jpg",
						text: "香蕉",
						remaining: "100",
						price: 20,
						id: "3",
						sort: "水果蔬菜"
					},
					{
						imageSrc: "../../static/goodsImage/mianbao.jpg",
						text: "面包",
						remaining: "20",
						price: 10,
						id: "4",
						sort: "休闲零食"
					}
				]
			}
		},
		methods: {
			...mapMutations(['addOneGood', 'subtractOneGood', 'changSortCurrent']),
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			choose(index) {
				this.groupId = index;
				const query = uni.createSelectorQuery().in(this);
				query.select(`#sortName${index}`).boundingClientRect(data => {
					uni.pageScrollTo({
						scrollTop: data.top
					})
				}).exec();
			},
			gotoGoodDetail(goodId) {
				const url = `/pages/goods/detail?id=${goodId}`
				uni.navigateTo({
					url: url,
				})
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
		},
		onLoad(options) {
			// console.log(options);
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			this.bottomView = false;
		},
		computed: {
			...mapState(['sortCurrent', 'mapGoodNum'])
		},
		onShow() {
			this.groupId = this.sortCurrent;
			this.choose(this.groupId);
		},
	}
</script>

<style lang="scss" scoped>
	#sort {

		.navfalse,
		.nav {
			display: flex;
			text-align: center;
			background-color: #fff;
			height: 100vh;
			width: 250upx;

			.title {
				margin-left: 15upx;
				text-align: center;
				padding-left: 10upx;
			}

			.active {
				color: #c00000;
				font-weight: bold;
				border-left: solid 5px #c00000;
				border-radius: 10upx;
			}
		}

		.nav {
			position: fixed;
		}

		.display {
			.goods {
				.good {
					margin-left: 15upx;
					margin-top: 2upx;
					height: 250upx;
					background-color: #fff;
					text-align: center;

					image {
						height: 200upx;
						width: 200upx;
					}

					.cart {
						height: 250upx;
						line-height: 250upx;
					}

					.info {
						.g-title {
							margin-top: 20upx;
							font-size: 25upx;
						}

						.g-desc {
							margin-top: 30upx;
							font-size: 20upx;
							color: #8b8b8b;
						}

						.g-price {
							font-weight: bold;
							color: #ff5500;
							font-size: 20upx;
							margin-top: 30upx;
						}
					}
				}

				.sortName {
					margin-left: 15upx;
					clear: both;
				}
			}
		}
	}
</style>