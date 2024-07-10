// 封装所有后端请求
import http from "./request.js";

export default {
	//登录接口
	login(params){
		return http.get('/users')
	},
	//获取所有用户（get /users)
	//注册新用户(post /users)
	//删除用户(delete /users/:user_id)
	//获取特定用户的地址(get /users/:user_id/addresses)
	getSpecialAddress(user_id){
		return http.get(`/users/${user_id}/addresses`);
	},
	//获取所有地址(get /addresses)
	//创建新地址(post /addresses)
	post(data){
		return http.post(`/addresses`,data);
	},
	//删除地址(post /addresses/:address_id)
	delete(address_id){
		return http.delete(`/addresses/${address_id}`)
	},
	//获取所有评论(get /reviews)
	//创建新评论(post /reviews)
	
	//删除评论(delete /reviews/:reviews_id)
	//获取全部订单及其评论(get /orders/:user_id)
	getOrders(user_id){
		return http.get(`/users/${user_id}/orders`);
		
	},
	//获取特定订单(get /orders/:order_id)
	getSpecialOreder(order_id){
		
	},
	//更新订单状态(put orders/:order_id)
	updateOrders(order_id){
		
	}
}