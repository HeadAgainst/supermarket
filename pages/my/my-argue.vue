<template>
	<view class="container">
		<view class="comment-detail">
			<text class="nickname">{{ order_id }}</text>
		</view>
		<view class="comment" v-for="(comment, index) in comments" :key="index">
			<button type="primary" @click="navigateToCamera(comment)">拍照上传</button>
			<image v-if="comment.photo" :src="comment.photo" mode="aspectFill" class="top-centered-image"></image>
		</view>
		<view class="input-box">
			<textarea v-model="newComment" placeholder="请输入您的评论"></textarea>
			<button @click="submitComment">提交评论</button>
		</view>
	</view>
</template>

<script>
	import {
		defineComponent
	} from 'vue';

	export default defineComponent({
		data() {
			return {
				order_id: '',
				comment: '',
				src: '',
				newComment: '',
				review_id: '',
				comments: [{
					photo: ''
				}] // 确保这里是一个空数组，而不是null
			};
		},
		onLoad(options) {
			if (options.src) {
				this.src = decodeURIComponent(options.src);
			}
			if (options.order_id && options.comment && options.review_id) {
				this.order_id = decodeURIComponent(options.order_id);
				this.comment = decodeURIComponent(options.comment);
				this.review_id = decodeURIComponent(options.review_id);
				console.log('Received order_id:', this.order_id);
				console.log('Received comment:', this.comment);
				console.log('Received review_id:', this.review_id);
				// 将评论数据保存到本地存储
				uni.setStorageSync('commentData', {
					order_id: this.order_id,
					comment: this.comment,
					review_id: this.review_id
				});
			} else {
				// 从本地存储获取评论数据
				const commentData = uni.getStorageSync('commentData');
				if (commentData) {
					this.order_id = commentData.order_id;
					this.comment = commentData.comment;
					this.review_id = commentData.review_id;
				} else {
					console.log('No order_id or comment parameter received');
				}
			}
			// 确保 comments 数组被正确初始化
			if (!this.comments || this.comments.length === 0) {
				this.comments = [{
					photo: ''
				}];
			}
		},
		methods: {
			navigateToCamera(comment) {
				uni.navigateTo({
					url: "/pages/my/my-camera",
					events: {
						acceptCamera: (data) => {
							comment.photo = data.src;
							console.log('Photo taken, path:', comment.photo);
							setTimeout(() => {
								// 这里保留注释的navigateTo代码，如果将来需要恢复可以使用
								// uni.navigateTo({
								//     url: "/pages/my/my-argue?src=" + encodeURIComponent(comment.photo)
								// });
							}, 1000);
						}
					}
				});
			},
			async submitComment() {
				if (this.newComment.trim() !== '') {
					try {
						// 先删除原来的评论
						if (this.review_id) {
							await this.$api.user.deleteReview(this.review_id);
							console.log('Review deleted successfully');
						}

						// 发送新评论到后端
						const response = await this.$api.user.postreview({
							order_id: this.order_id,
							comment: this.newComment
						});

						console.log('Comment submitted successfully:', response);

						this.review_id = response.data.review_id; // 获取新的 review_id

						// 提交评论后上传照片
						for (let comment of this.comments) {
							if (comment.photo) {
								console.log('comment.photo', comment.photo);
								await this.convertToBase64AndSubmit(comment.photo, this.review_id);
							}
						}

						uni.navigateBack({
							delta: 1,
							success: () => {
								const eventChannel = this.getOpenerEventChannel();
								eventChannel.emit('acceptreview', {
									review: this.newComment,
									src: this.comments.length > 0 ? this.comments[this
										.comments.length - 1].photo : '',
									review_id: this.review_id
								});
							}
						});
					} catch (error) {
						console.error('Error submitting comment:', error);
					}
				}
			},
			async convertToBase64AndSubmit(filePath, reviewid) {
				const review_id = reviewid;

				// 下载文件到本地
				wx.downloadFile({
					url: filePath,
					success: (res) => {
						if (res.statusCode === 200) {
							// 本地路径
							const localFilePath = res.tempFilePath;

							//                   // 上传文件到服务器
							//                   wx.uploadFile({
							//                       url: `https://hdu.frei.fun/reviews_img/${review_id}`,
							//                       filePath: localFilePath,
							//                       name: 'file', // 确保字段名与后端期望的一致
							//                       header: {
							//                           'Content-Type': 'image/jpeg' // 根据文件类型设置合适的Content-Type
							//                       },
							//                       success: (uploadFileRes) => {
							// 		console.log(uploadFileRes);
							//                       },
							//                       fail: (err) => {
							//                           console.error('上传失败:', err);
							//                       }
							//                   });
							wx.chooseMedia({
								count: 9,
								mediaType: ['image', 'video'],
								sourceType: ['album', 'camera'],
								maxDuration: 30,
								camera: 'back',
								success(res) {
									const tempFilePath = res.tempFiles[0].tempFilePath;
									console.log(res.tempFiles[0].tempFilePath)
									console.log(res.tempFiles[0].size);
									// this.convertToBase64AndUpload(tempFilePath);
									uni.uploadFile({
										url: 'https://hdu.frei.fun/reviews_img/28', // 替换为你的服务器 URL
										filePath: tempFilePath,
										name: 'file', // 与服务器端接收的字段名一致
										header: {
											'Content-Type': 'multipart/form-data'
										},
										success: (res) => {
											console.log('上传成功:', res);
											uni.hideLoading();
											// 处理上传成功后的逻辑
										},
										fail: (err) => {
											console.error('上传失败:', err);
											uni.hideLoading();
											// 处理上传失败后的逻辑
										}
									});
								}
							})
						}
					},
					fail: (err) => {
						console.error('下载失败:', err);
					}
				});
			}
		}
	});
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		/* 内容在顶部对齐 */
		align-items: center;
		height: 100vh;
		/* 使容器全屏高度 */
		background-color: #f0f0f0;
		/* 可选，添加背景颜色 */
		position: relative;
	}

	.comment {
		width: 90%;
		/* 调整宽度 */
		margin: 10px 0;
		/* 上下边距为 10px */
		padding: 10px;
		/* 内边距为 10px */
		background-color: #fff;
		/* 背景颜色为白色 */
		border-radius: 8px;
		/* 边框圆角半径 */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		/* 阴影效果 */
		cursor: pointer;
		/* 手形光标 */
	}

	.comment-detail {
		width: 90%;
		margin: 10px 0;
		padding: 10px;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.nickname {
		font-weight: bold;
		color: #333;
		margin-bottom: 5px;
	}

	.top-centered-image {
		width: 100%;
		/* 缩放到原始大小的一半 */
		height: 200px;
		/* 固定高度 */
		object-fit: contain;
		/* 确保图片按原始比例缩放 */
		justify-content: center;
		/* 内容在顶部对齐 */
		align-items: center;
		margin-top: 20px;
	}

	.input-box {
		width: 90%;
		position: absolute;
		/* 绝对定位 */
		bottom: 5%;
		/* 与底部对齐 */
		padding: 10px 0;
		background-color: #fff;
		box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
		/* 添加阴影 */
	}

	textarea {
		width: 100%;
		height: 50px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-bottom: 10px;
		resize: none;
	}

	button {
		width: 100%;
		padding: 10px;
		background-color: #007bff;
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		text-align: center;
	}
</style>