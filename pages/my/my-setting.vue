<template>
	<view>
		<uni-list>
			<!--用户头像-->
			<uni-list-item showArrow thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" thumb-size="lg" rightText="点击更改头像" />
			<uni-list-item showArrow title="昵称" rightText="未设置"/>
			<uni-list-item showArrow title="手机" rightText="1785799xxxx" />
		</uni-list>
		<view class='m-t-10'>
			<uni-list>
				<uni-list-item title="版本" rightText="V1.0.0" />
			</uni-list>
		</view>
		<!--退出登录-->
		<view class='m-t-10 logout'>
			<button type="default" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
<<<<<<< HEAD
	import {
	  mapState,
	  mapMutations
	} from 'vuex'
	export default {
	  name: "my-userinfo",
	  computed: {
	    // 将 m_user 模块中的 userinfo 映射到当前页面中使用
	    ...mapState('m_user', ['userinfo']),
	  },
	  data() {
	    return {}
	  },
	  methods: {
	    ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
	    // 退出登录
	    async logout() {
	      // 询问用户是否退出登录
	      const [err, succ] = await uni.showModal({
	        title: '提示',
	        content: '确认退出登录吗？'
	      }).catch(err => err)
	
	      if (succ && succ.confirm) {
	        // 用户确认了退出登录的操作
	        // 需要清空 vuex 中的 userinfo、token 和 address
	        this.updateUserInfo({})
	        this.updateToken('')
	        this.updateAddress({})
	      }
		  uni.switchTab({
		  	url:"/pages/index/index"
		  })
	    }
	  },
	  }
=======
import { mapState, mapMutations } from 'vuex';

export default {
	name: "my-userinfo",
	computed: {
		// 将 m_user 模块中的 userinfo 映射到当前页面中使用
		...mapState('m_user', ['userinfo']),
	},
	data() {
		return {};
	},
	methods: {
		...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
		// 退出登录
		async logout() {
			try {
				const result = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				});

				if (result.confirm) {
					// 用户确认了退出登录的操作
					// 需要清空 vuex 中的 userinfo、token 和 address
					this.updateUserInfo({});
					this.updateToken('');
					this.updateAddress({});
					uni.switchTab({
						url: "/pages/index/index"
					});
				}
			} catch (error) {
				console.error('Error during logout:', error);
			}
		}
	},
};
>>>>>>> 05e20481692dc9cf1246dc3ec1e8e4d24a9a1944
</script>

<style scoped lang="scss">
	.m-t-10 {
		margin-top: 20upx;
	}
	.logout {
		background-color: #fff;
		button {
			color: #55aa00;
			background-color: #fff;
		}
	}
</style>
