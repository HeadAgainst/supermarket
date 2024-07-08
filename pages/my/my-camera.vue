
<template>
    <view>
        <camera device-position="back" flash="off" @error="error" style="width: 100%; height: 640px;"></camera>
        <button type="primary" @click="takePhoto">拍照</button>
		<button type="warn" @click="submitCamera">上传</button>
    </view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
	    data() {
	        return {
	            src: ""
	        }
	    },
	    methods: {
	         takePhoto(e) {
	                 const ctx = uni.createCameraContext();
	                 ctx.takePhoto({
	                     quality: 'high',
	                     success: (res) => {
	                         this.src = res.tempImagePath;
							 console.log('执行click事件', e.data)
							 		uni.showToast({
							 			title: '拍摄成功'
							 		});
	                          // 调试输出
	                         
                             // 延迟一秒导航以确保路径获取成功
                             setTimeout(() => {
                                /*uni.navigateTo({
                                    url: "/pages/my/my-argue?src=" + encodeURIComponent(this.src)
                                });*/
                             }, 1000);
	                     }
	                 });
	             },
			submitCamera() {
			        uni.navigateBack({
			            delta: 1,
			            success: () => {
			                const eventChannel = this.getOpenerEventChannel();
			                eventChannel.emit('acceptCamera', { src:this.src });
							console.log('Photo taken, path:', this.src);
			            }
			        });
			},
	        error(e) {
	            console.log(e.detail);
	        }
	    }
	}
</script>