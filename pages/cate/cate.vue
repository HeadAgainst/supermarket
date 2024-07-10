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
						<template v-for="(category, i) in sortageList" :key="i">
							<!-- <view class="sortName" :id="'sortName'+i">{{category}}</view> -->
							<template v-for="(item, index) in goods" :key="index">
								<view class="good" v-if="category == item.category">
									<uni-row>
										<uni-col :span="10">
											<view @click="gotoGoodDetail(item)" style="line-height: 250upx;">
												<image :src="item.imageSrc" mode="aspectFit"></image>
											</view>
										</uni-col>
										<uni-col :span="8">
											<view class="info" @click="gotoGoodDetail(item)">
												<view class="g-title">{{item.text}}</view>
												<view class="g-desc">剩余：{{item.remaining}}</view>
												<view class="g-price">￥{{item.price}}</view>
											</view>
										</uni-col>
										<uni-col :span="6">
											<view class="cart">
												<uni-icons type="minus" color="#ffaa00"
													@click="addOrMinus(false, index)"></uni-icons>
												<text space> {{mapGoodNum[item.id] ? mapGoodNum[item.id].num : 0}}
												</text>
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
		mapMutations,
	} from 'vuex'
	import bottom from "../../components/bottom"
	export default {
		components: {
			bottom
		},
		data() {
			return {
				bottomView: true,
				groupId: 0,
				sortageList: ["水果蔬菜", "肉禽蛋品", "海鲜水产", "酒水饮料", "休闲零食", "烘焙面点", "粮油调味", "鲜活水产"],
				goods: [],
				readyGoods: [],
				getReady: [0, 0, 0, 0, 0, 0, 0, 0],
				loading: false, // 加载标识符，
				page: 1,
				cancelToken:false// 取消异步加载工作
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
			loadMoreGoods() {
				if (this.loading) return; // 防止重复加载
				this.loading = true;
				if (this.page * 10 < this.readyGoods.length) {
					const extraGoods = this.readyGoods.slice((this.page) * 10, (this.page + 1) * 10);
					this.goods.push(...extraGoods);
					extraGoods.forEach(good => {
						this.fetchGoodImage(good.id); // 更新新加载的商品的图片信息
					});
					this.loading = false;
				}
				this.loading = false;
			},
			async fetchGoodImage(productId) {
				try {
					if(this.cancelToken == true){
						return;
					}
					await this.$api.goods.getGoodImageLs(productId)
						.then(res => {
							if (res.data.img_urls.length > 0) {
								const code = res.data.img_urls[0].url;
								const goodIndex = this.goods.findIndex(good => good.id == productId);
								if (goodIndex != -1) {
									this.$set(this.goods[goodIndex], "imageSrc",
										`https://hdu.frei.fun/products_img/${productId}/${code}`);
								}
							}
						})
				} catch (error) {
					console.error('获取商品图片失败', error);
				}

			},
			choose(index) {
				this.cancelToken = true;
				this.groupId = index;
				this.page = 1;
				this.$api.goods.getCategoryGood(this.sortageList[index])
					.then(res => {
						this.cancelToken = false;
						this.readyGoods = res;
						this.goods = res.slice((this.page - 1) * 10, 10);
						this.goods.forEach(good => {
							this.fetchGoodImage(good.id);
						})
					})
			},
			gotoGoodDetail(good) {
				const goodStr = encodeURIComponent(JSON.stringify(good));
				const url = `/pages/goods/detail?good=${goodStr}`
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
			if (e.scrollTop > this.page * 646) {
				this.page += 1;
				this.loadMoreGoods();
			}
			this.bottomView = false;
		},
		computed: {
			...mapState(['sortCurrent', 'mapGoodNum']),
			// computedGoods() {
			// 	return this.goods.map(good => ({
			// 		...good,
			// 		imageSrc: good.imageSrc || ''
			// 	}))
			// }
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
					height: 300upx;
					background-color: #fff;
					text-align: center;

					image {
						height: 200upx;
						width: 200upx;
					}

					.cart {
						height: 300upx;
						line-height: 300upx;
					}

					.info {
						.g-title {
							margin-top: 20upx;
							font-size: 25upx;
						}

						.g-desc {
							margin-top: 10upx;
							font-size: 20upx;
							color: #8b8b8b;
						}

						.g-price {
							font-weight: bold;
							color: #ff5500;
							font-size: 20upx;
							margin-top: 10upx;
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