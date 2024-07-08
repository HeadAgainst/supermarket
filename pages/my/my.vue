<template>
	<view>
		我的{{$store.state.username}}
	</view>
</template>

<script>
	import {mapMutations, mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['changeIsFromSettleSuccess'])
		},
		computed:{
			...mapState(['isFromSettleSuccess']),
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

<style>

</style>
