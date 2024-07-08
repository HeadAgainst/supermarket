<template>
    <view class="container">
        <view class="comment" v-for="(comment, index) in comments" :key="index" @click="navigateToDetail(comment)">
            <image :src="comment.src" class="avatar"></image>
            <view class="comment-body">
                <view class="comment-header">
                    <text class="nickname">{{ comment.nickname }}</text>
                    <text class="time">{{ comment.time }}</text>
                </view>
                <view class="comment-content">
                    <text>{{ comment.content }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            comments: [
                {
                    src: 'https://example.com/avatar1.jpg',
                    nickname: 'goods1',
                    time: '2024-07-06',
                    content: 'Great product, highly recommended!'
                }
            ]
        };
    },
    methods: {
        navigateToDetail(comment) {
            const self = this;
            uni.navigateTo({
                url: `/pages/my/my-argue?nickname=${encodeURIComponent(comment.nickname)}&content=${encodeURIComponent(comment.content)}&src=${encodeURIComponent(comment.src)}`,
                events: {
                    acceptComment(data) {
                        comment.content = data.comment;
						comment.src=data.src;
                    }
                },
                fail(err) {
                    console.error('Navigation failed:', err);
                }
            });
        }
    }
};
</script>

<style>
.container {
    padding: 10px;
    background-color: #f8f8f8;
}

.comment {
    display: flex;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer; /* 添加手形光标 */
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 10px;
}

.comment-body {
    flex: 1;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.nickname {
    font-weight: bold;
    color: #333;
}

.time {
    color: #999;
    font-size: 12px;
}

.comment-content {
    color: #666;
}
</style>
