<template>
	<view>
	<!--顶部区域-->
		<view class='top_bj'>
			<!--用户头像显示-->
			<view class="user-pic">
				<image v-if="isAuth" :src="userInfo.image"></image> 
				<uni-icons v-else type="person-filled" size="50"></uni-icons>
			</view>
			<!--用户信息 -->
			<view class="user-info" v-if='mapState'>
				<view v-if='isAuth'>
					<view>用户名</view>
				</view>
				<text>用户名：{{userInfo.name}}</text>
			</view>
			<view class="user-info">hjw</view>
		</view>
		<!--用户信息管理-->
		<view class='menu_box'>
			<uni-list>
				<uni-list-item :show-extra-icon="true" showArrow :extra-icon="Icon1" title="我的订单" :to="'my-bagage'" @click="onClick" />
				<uni-list-item :show-extra-icon="true" showArrow :extra-icon="Icon2" title="我的地址" :to="'my-receive'" @click="onClick"/>
				<uni-list-item :show-extra-icon="true" showArrow :extra-icon="Icon3" title="我的收藏" :to="'my-love'" @click="onClick" />
				<uni-list-item :show-extra-icon="true" showArrow :extra-icon="Icon4" title="反馈评价" :to="'argue-list'" @click="onClick" />
				<uni-list-item :show-extra-icon="true" showArrow :extra-icon="Icon5" title="个人信息" :to="'my-setting'" @click="onClick" />
			</uni-list>
		</view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		data(){
			return{
				Icon1: {
					color: '#26b3ff',
					size: '22',
					type: 'shop-filled'
				},
				Icon2: {
					color: '#383838',
					size: '22',
					type: 'location-filled'
				},
				Icon3: {
					color: '#ffec17',
					size: '22',
					type: 'star-filled'
				},
				Icon4: {
					color: '#43d9af',
					size: '22',
					type: 'phone-filled'
				},
				Icon5: {
					color: '#be0000',
					size: '22',
					type: 'person-filled'
				}
			}
		},
		computed:{
			...mapState(['isAuth','userInfo'])
		},
		methods:{
			navTo(url){
				if(this.isAuth){
					uni.navigateTo({url:url})
				}else{
					uni.navigateTo('/pages/info/login')
				}
				
			},
			
			onClick(e) {
				console.log('执行click事件', e.data)
						uni.showToast({
							title: '点击成功'
						});
			}
		}
	}
	
</script>

<style scoped lang="scss">
	.top_bj{
	

		height: 400rpx;
		background-color: #c00000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.user-pic{
			width: 150upx;
			height: 150upx;
			border-radius: 50%;
			background: #aaa4a3;
			margin:0 50upx;
			line-height: 150upx;
			text-align: center;
		}
		.user-info{
			flex: 1;
			color: #fff;
			font-size: 35upx;
		}
	}
	//下方显示操作菜单的列表
	.menu_box{
		background:#fff;
		
	}
</style>