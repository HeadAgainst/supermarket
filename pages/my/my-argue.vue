<template>
    <view class="container">
        <view class="comment-detail">
            <text class="nickname">{{ nickname }}</text>
        </view>
        <view class="comment" v-for="(comment, index) in comments" :key="index" @click="navigateToCamera(comment)">
            <button type="primary">拍照上传</button>
            <image :src="comment.photo" mode="aspectFill" class="top-centered-image"></image>
        </view>
        <view class="input-box">
            <textarea v-model="newComment" placeholder="请输入您的评论"></textarea>
            <button @click="submitComment">提交评论</button>
        </view>
    </view>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            nickname: '',
            content: '',
            src: '',
            newComment: '',
            comments: [
                {
                    photo: '',
                }
            ]
        };
    },
    onLoad(options) {
        if (options.src) {
            this.src = decodeURIComponent(options.src);
        }
        if (options.nickname && options.content) {
            this.nickname = decodeURIComponent(options.nickname);
            this.content = decodeURIComponent(options.content);
            console.log('Received nickname:', this.nickname);
            console.log('Received content:', this.content);
            // 将评论数据保存到本地存储
            uni.setStorageSync('commentData', { nickname: this.nickname, content: this.content });
        } else {
            // 从本地存储获取评论数据
            const commentData = uni.getStorageSync('commentData');
            if (commentData) {
                this.nickname = commentData.nickname;
                this.content = commentData.content;
            } else {
                console.log('No nickname or content parameter received');
            }
        }
    },
    methods: {
        submitComment() {
            if (this.newComment.trim() !== '') {
                // 获取最新的 comment.photo 值
                const latestPhoto = this.comments.length > 0 ? this.comments[this.comments.length - 1].photo : '';

                uni.navigateBack({
                    delta: 1,
                    success: () => {
                        const eventChannel = this.getOpenerEventChannel();
                        eventChannel.emit('acceptComment', { comment: this.newComment, src: latestPhoto });
                    }
                });
            }
        },
        navigateToCamera(comment) {
            const self = this;
            uni.navigateTo({
                url: `/pages/my/my-camera`,
                events: {
                    acceptCamera(data) {
                        comment.photo = data.src;
                        console.log('Photo taken, path:', comment.photo);
                        setTimeout(() => {
                            /*uni.navigateTo({
                                url: "/pages/my/my-argue?src=" + encodeURIComponent(this.src)
                            });*/
                        }, 1000);
                    }
                },
                fail(err) {
                    console.error('Navigation failed:', err);
                }
            });
        },
        error(e) {
            console.log(e.detail);
        }
    }
});
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* 内容在顶部对齐 */
    align-items: center;
    height: 100vh; /* 使容器全屏高度 */
    background-color: #f0f0f0; /* 可选，添加背景颜色 */
    position: relative;
}

.comment {
    width: 90%; /* 调整宽度 */
    margin: 10px 0; /* 上下边距为 10px */
    padding: 10px; /* 内边距为 10px */
    background-color: #fff; /* 背景颜色为白色 */
    border-radius: 8px; /* 边框圆角半径 */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 阴影效果 */
    cursor: pointer; /* 手形光标 */
}

.comment-detail {
    width: 90%;
    margin: 10px 0;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nickname {
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

.top-centered-image {
    width: 100%; /* 缩放到原始大小的一半 */
    height: 200px; /* 固定高度 */
    object-fit: contain; /* 确保图片按原始比例缩放 */
    justify-content: center; /* 内容在顶部对齐 */
    align-items: center;
    margin-top: 20px;
}

.input-box {
    width: 90%;
    position: absolute; /* 绝对定位 */
    bottom: 5%; /* 与底部对齐 */
    padding: 10px 0;
    background-color: #fff;
    box-shadow: 0 -2px 4px rgba(0,0,0,0.1); /* 添加阴影 */
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
