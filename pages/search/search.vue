<template>
	<view id="search">
		<view class="">
			<uni-search-bar @confirm="search" :focus="true" 
			v-model="searchValue" placeholder="请输入商品"
			@cancel="cancel" @clear="cancel"
			@input="input">
			</uni-search-bar>
		</view>
		<view class="">
			<uni-list :border="true">
				<template v-for="(item, index) in searchRes" :key="index">
					<uni-list-item @click="gotoGoodDetail(item)" :clickable="true">
						<template v-slot:header>
							<image class="slot-image" :src="item.imageSrc" mode=""></image>
						</template>
						<template v-slot:body>
							<view class="info">
								<view class="g-title">{{item.text}}</view>
								<view class="g-desc">
									剩余{{item.remaining}}
								</view>
								<view class="g-price">
									{{item.price}}元
								</view>
							</view>
						</template>
					</uni-list-item>
				</template>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				searchValue: "",
				searchRes: []
			}
		},
		methods: {
			input(res){
				this.searchRes = [];
				for (let i = 0; i < this.goods.length; i++) {
					if (this.goods[i].text.includes(res)) {
						this.searchRes.push(this.goods[i]);
					}
				}
			},
			search(res) {
				this.searchRes = [];
				for (let i = 0; i < this.goods.length; i++) {
					if (this.goods[i].text.includes(res.value)) {
						this.searchRes.push(this.goods[i]);
					}
				}
			},
			cancel(){
				this.searchRes = this.goods;
			},
			gotoGoodDetail(good) {
				const goodStr = encodeURIComponent(JSON.stringify(good));
				const url = `/pages/goods/detail?good=${goodStr}`
				uni.navigateTo({
					url: url,
				})
			}
		},
		onLoad(){
			this.searchRes = this.goods;
		},
		computed: {
			...mapState(['goods'])
		}
	}
</script>

<style lang="scss" scoped>
	#search{
		.slot-image{
			height: 100upx;
			width: 100upx;
		}
		.info{
			margin-left: 20upx;
			.g-title {
				font-size: 30upx;
			}
			.g-desc {
				font-size: 25upx;
				color: #8b8b8b;
			}
			.g-price {
				font-weight: bold;
				font-size: 28upx;
				color: #ff5500;
			}
		}
	}
</style>