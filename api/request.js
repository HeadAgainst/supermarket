// 封装请求体
const http = {
	baseUrl : "https://hdu.frei.fun",
	request(config){
		config = beforeRequest(config);
		config.url = this.baseUrl+config.url;
		return new Promise((resolve, reject)=>{
			uni.request(config)
			.then(res=>{
				const response = beforeResponse(config, res);
				if(config.url == "https://hdu.frei.fun/products" || config.url.includes("category")){
					resolve(response);
				}else{
					resolve(res);
				}
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
	// post(url, data, auth){
	// 	return this.request({
	// 		url:url,
	// 		data:data,
	// 		auth:auth,
	// 		method:"PUT"
	// 	})
	// },
} 
// 请求拦截器
const beforeRequest = (config) => {
	return config;
}
// 添加响应拦截器
const beforeResponse = (config, res) => {
	let finalRes = [];
	const regex = /^https:\/\/hdu\.frei\.fun\/products\/\d+$/;
	if(config.url == "https://hdu.frei.fun/products"){
		for(let i = 0; i < res.data.length; i++){
			finalRes.push({
				id:res.data[i].product_id,
				text:res.data[i].name,
				remaining:res.data[i].stock,
				price:res.data[i].price,
				category:res.data[i].category,
				size:res.data[i].unit,
				brand:res.data[i].brand,
				serve:res.data[i].service,
				imageSrc:"../../static/pic_empty.png"
			})
		}
		return finalRes;
	}
	else if(config.url.includes("category")){
		for(let i = 0; i < res.data.results.length; i++){
			finalRes.push({
				id:res.data.results[i].product_id,
				text:res.data.results[i].name,
				remaining:res.data.results[i].stock,
				price:res.data.results[i].price,
				category:res.data.results[i].category,
				size:res.data.results[i].unit,
				brand:res.data.results[i].brand,
				serve:res.data.results[i].service,
				imageSrc:"../../static/pic_empty.png"
			})
		}
		return finalRes;
	}
	else if(regex.test(config.url)){
		const product = res.data.product;
		const finalProdcut = {
			id:product.product_id,
			imageSrc:"../../static/pic_empty.png",
			text:product.name,
			remaining:product.stock,
			price:product.price,
			size:product.unit,
			brand:product.brand,
			serve:product.serve,
			category:product.category
		}
	}
	return config;
}

// 添加异常处理器
const errorHandle = (error)=>{
	console.log("网络请求异常", error);
}

export default http;