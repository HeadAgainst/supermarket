// 封装所有后端请求
import http from "./request.js";

export default{
	getGoods(){
		return http.get("/products");
	},
	getGoodImageLs(product_id){
		return http.get(`/products_img/${product_id}`)
	},
	getGoodImage(product_id, code){
		return http.get(`/products_img/${product_id}/${code}`)
	},
	getCategoryGood(category){
		return http.get(`/products/category/${category}`)
	},
	getOneGood(productId){
		return http.get(`/products/${productId}`);
	}
}