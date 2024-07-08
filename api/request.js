// 封装请求体
const http = {
	baseUrl : "http://127.0.0.1:8080",
	request(config){
		config = beforeRequest(config);
		config.url = this.baseUrl+config.url;
		return new Promise((resolve, reject)=>{
			uni.request(config)
			.then(res=>{
				const response = beforeResponse(config);
				resolve(res);
			})
			.catch(err => {
				errorHandle(err);
				reject(err);
			})
		})
	},
	get(url, data, auth){
		return this.request({
			url:url,
			data:data,
			auth:auth,
			method:"GET"
		})
	},
	post(url, data, auth){
		return this.request({
			url:url,
			data:data,
			auth:auth,
			method:"POST"
		})
	},
	delete(url, auth){
		return this.request({
			url:url,
			auth:auth,
			method:"DELETE"
		})
	},
	post(url, data, auth){
		return this.request({
			url:url,
			data:data,
			auth:auth,
			method:"PUT"
		})
	},
} 
// 请求拦截器
const beforeRequest = (config) => {
	console.log("请求拦截")
	return config;
}

// 添加响应拦截器
const beforeResponse = (config) => {
	console.log("响应拦截");
	return config;
}

// 添加异常处理器
const errorHandle = (error)=>{
	console.log("网络请求异常", error);
}

export default http;