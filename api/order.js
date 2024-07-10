// 封装所有后端请求
import http from "./request.js";

export default {
	submitOrder(data) {
		return http.post("/orders", data);
	},
	getAdress(){
		return http.get("/users/1/addresses");
	},
	createAddress(data){
		return http.post("/addresses", data);
	}
}