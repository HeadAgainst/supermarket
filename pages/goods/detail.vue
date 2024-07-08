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
					{{good.text}}
				</view>
				<view class="g-desc">
					剩余数量：{{good.remaining}}
				</view>
				<view class="g-price">
					单价：{{good.price}}元
				</view>
			</view>
			<view class="select">
				<uni-icons type="minus" color="#ffaa00" @click="addOrMinus(false)"></uni-icons>
				<text space> 1 </text>
				<uni-icons type="plus" color="#ffaa00" @click="addOrMinus(true)"></uni-icons>
				<uni-icons type="star" size="30" v-if="isCollect==false" @click="love"></uni-icons>
				<uni-icons type="star-filled" size="30" color="#ffaa00" v-if="isCollect" @click="love"></uni-icons>
			</view>
		</view>
		<view class="">
			<uni-list border-full>
				<uni-list-item>
					<template v-slot:header>
						<text>规格：{{good.size}}</text>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<text>品牌：{{good.brand}}</text>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<text>服务：{{good.serve}}</text>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="good-review">
			<view class="title">
				用户评价
			</view>
			<uni-list>
				<template v-for="(item, index) in comments" :key="index">
					<uni-list-item title="列表左侧带略缩图" note="列表描述信息" :thumb="item.image" thumb-size="lg">
						<template v-slot:body>
							<view class="name">
								{{item.userName}}
							</view>
							<view class="date">{{item.time}}</view>
							<view class="review-text">
								{{isExpands[index] == 1? item.review.slice(0, 30)+"..." : item.review}}
								<text class="toggle" @click="toggle(index)">
									{{isExpands[index] == 1 ? "展开" : isExpands[index]  == 2 ? "折叠" : ""}}
								</text>
							</view>
							<view class="reivew-pic">
								<image src="../../static/goodsImage/pingguo.jpg" mode="widthFix"></image>
							</view>
						</template>
					</uni-list-item>
				</template>
			</uni-list>
			<view style="text-align: center; margin-top: 20px;">
				滑倒底了呀~~
			</view>
		</view>
		<bottom v-show="true"></bottom>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
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
				isCollect: false,
				currentId: 0,
				good: {
					imageSrc: "../../static/goodsImage/pingguo.jpg", // 商品图片列表
					text: "苹果", // 商品名称
					remaining: "10", // 剩余量
					price: 10, // 商品价格
					id: "1", // 商品id
					size: "斤", // 规格
					brand: "花果山", // 品牌
					serve: "快速配货", // 服务
					category: "水果蔬菜",
				},
				comments: [{
					userName: "xx", // 用户名
					time: "2021年04月1日14时33分", // 时间
					review: "很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃", // 评论
					image: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png", // 头像
				}, {
					userName: "xx", // 用户名
					time: "2021年04月1日14时33分", // 时间
					review: "很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃", // 评论
					image: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png", // 头像
				}, {
					userName: "xx", // 用户名
					time: "2021年04月1日14时33分", // 时间
					review: "很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃", // 评论
					image: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png", // 头像
				}],
				isExpands: []
			}
		},
		methods: {
			...mapMutations(['addOneGood', 'subtractOneGood', 'selectColletion']),
			swiperChange(e) {
				this.current = e.detail.current;
			},
			addOrMinus(flag) {
				// console.log(this.currentId);
				if (flag == true) {
					this.addOneGood({
						id: this.currentId,
						num: 1,
						price: 10,
						imageSrc: "../../static/goodsImage/pingguo.jpg",
						text: "苹果",
					});
				} else {
					this.subtractOneGood({
						id: this.currentId,
						num: 1
					});
				}
			},
			toggle(index) {
				if (this.isExpands[index] == 1) {
					this.isExpands[index] = 2;
				} else if (this.isExpands[index] == 2) {
					this.isExpands[index] = 1;
				}
			},
			love() {
				this.isCollect = !this.isCollect;
				this.selectColletion({
					id: this.good.id,
					num: 1,
					price: this.good.price,
					imageSrc: this.good.imageSrc,
					text: this.good.text
				});
			}
		},
		onLoad(options) {
			this.currentId = options.id;
			for (let i = 0; i < this.comments.length; i++) {
				this.isExpands.push(this.comments[i].review.length > 30 ? 1 : 0);
				// 0表示小于30，1表示大于30，2表示已经展开了
			}
			const good = this.collectionBag.filter(item => item.id == this.currentId)
			if(good.length == 0){
				this.isCollect = false;
			}else{
				this.isCollect = true;
			}
			// console.log(typeof this.currentId);
		},
		computed: {
			...mapState(['goods', 'collectionBag'])
		}
	}
</script>

<style lang="scss" scoped>
	#detail {
		padding-bottom: 150upx;

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

			.select {
				display: flex;
				align-items: center;
				margin-right: 50upx;
			}
		}

		.good-review {
			.title {
				background-color: #fff;
				margin-top: 20upx;
				font-size: 35upx;
				padding-left: 30upx;
			}

			.name {
				color: #00aaff;
			}

			.date {
				color: #8b8b8b;
				font-size: 20upx;
			}

			.review-text {
				font-size: 25upx;
			}

			.toggle {
				color: #00aaff;
			}

			.reivew-pic {
				image {
					width: 100px;
				}
			}
		}
	}
</style>