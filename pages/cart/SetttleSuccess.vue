<template>
	<view id="success-pay">
		<image src="../../static/success-pay.png" mode=""></image>
		<view class="buttons" @click="goback">
		 	<navigator url="/pages/index/index" open-type="switchTab"><button>回到首页</button></navigator>
			<navigator url="/pages/my/my" open-type="switchTab"><button>查看订单</button></navigator>
		</view>
	</view>
</template>

<script>
	import {mapMutations, mapState} from 'vuex'
	export default{
		computed:{
			...mapState(['isFromSettleSuccess'])
		},
		methods:{
			...mapMutations(['changeIsFromSettleSuccess']),
			goback(){
				this.changeIsFromSettleSuccess(true);
			}
		}
	}
</script>

<style lang="scss" scoped>
	#success-pay{
		.buttons{
			button{
				width: 100%;
				border-radius: 20px;
				background-color: #c00000;
				color: #fff;
				margin-top: 20upx;
			}
		}
	}
</style>