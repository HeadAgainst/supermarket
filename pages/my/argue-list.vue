<template>
    <view class="container">
        <view class="review" v-for="(review, index) in reviews" :key="index" @click="navigateToDetail(review)">
            <image :src="review.src" class="avatar"></image>
            <view class="review-body">
                <view class="review-header">
                    <text class="order_id">订单号：{{ review.order_id }}</text>
                    <text class="review_date">{{ review.review_date }}</text>
                </view>
                <view class="review-comment">
                    <text>评价：{{ review.comment }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            user_id: '1',
            reviews: []
        };
    },
    created() {
        this.loadReviews();
    },
    methods: {
        async loadReviews() {
            const user_id = this.user_id;
            try {
                const response = await this.$api.user.getOrders(user_id);
                console.log('API response:', response);
                const orders = response.data || response;
                if (Array.isArray(orders)) {
                    const submittedOrders = orders.filter(order => order.status === '已提交');
                    const reviewPromises = submittedOrders.map(async order => {
                        if (order.review_id) {
                            const imgResponse = await this.$api.user.getReviewimgURl(order.review_id);
                            if (imgResponse && Array.isArray(imgResponse.data.img_urls)&&imgResponse.data.img_urls.length > 0) {
                                const imgCode = imgResponse.data.img_urls[0].url;
                                order.src =`http://hdu.frei.fun/reviews_img/${order.review_id}/${imgCode}`|| '';
                                /*const actualImgResponse = await this.$api.user.getgetReviewimg(order.review_id, imgCode);
                                console.log('actualImgResponse',actualImgResponse);
                                order.src = actualImgResponse.url || ''; // 假设实际图片响应包含 `url`*/
                            } else {
                                order.src = '';
                            }
                        } else {
                            order.src = '';
                        }
                        return order;
                    });

                    const reviews = await Promise.all(reviewPromises);
                    this.reviews = reviews;
                } else {
                    throw new Error('Invalid API response format');
                }
            } catch (error) {
                console.error('Error loading reviews:', error);
            }
        },
        navigateToDetail(review) {
            console.log('review',this.review);
			uni.navigateTo({
                url: `/pages/my/my-argue?order_id=${encodeURIComponent(review.order_id)}&comment=${encodeURIComponent(review.comment)}&src=${encodeURIComponent(review.src)}&review_id=${encodeURIComponent(review.review_id)}`,
                events: {
                    acceptreview(data) {
                        review.comment = data.review;
                        review.src = data.src;
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

.review {
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

.review-body {
    flex: 1;
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.order_id {
    font-weight: bold;
    color: #333;
}

.review_date {
    color: #999;
    font-size: 12px;
}

.review-comment {
    color: #666;
}
</style>