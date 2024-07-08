// 封装所有后端请求
import http from "./request.js";

export default {
	login(params){
		return http.get("/users")
	}
}